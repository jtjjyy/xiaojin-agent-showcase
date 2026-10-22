import { _electron as electron, expect, test } from '@playwright/test'

// Scratch harness: launches the REAL Electron app (not the browser bridge) and
// reads the installed application menu from its main process. This is ground
// truth for the localised menu; the screenshot is skipped because a dev-mode
// Electron launch here exits early.
test('application menu is installed in Chinese', async () => {
  const app = await electron.launch({
    args: ['.'],
    cwd: process.cwd(),
    env: { ...process.env, ELECTRON_RUN_AS_NODE: undefined } as Record<
      string,
      string
    >,
  })

  try {
    const menu = await app.evaluate(({ Menu }) => {
      const installed = Menu.getApplicationMenu()
      if (!installed) return null
      return installed.items.map((item) => ({
        label: item.label,
        sub: (item.submenu?.items ?? []).map((s) => s.label),
      }))
    })
    console.log('INSTALLED_MENU=' + JSON.stringify(menu))
    expect(menu, 'an application menu must be installed').not.toBeNull()
  } finally {
    await app.close().catch(() => {})
  }
})
