import type { MenuItemConstructorOptions } from 'electron'

/**
 * The application menu, localised to Chinese.
 *
 * Electron installs an English default menu ("File / Edit / View / Window") when
 * the app never calls `Menu.setApplicationMenu`, which is what shipped before
 * this module. Building the template here keeps the labels in one testable
 * place; every item still uses a built-in `role`, so accelerators, enabled state
 * and platform behaviour stay with Electron rather than being reimplemented.
 *
 * Roles are intentionally left untranslated: Electron derives a role item's
 * label from the role, so only items that carry an explicit label (or need a
 * Chinese one on a platform where the role has no label) are spelled out.
 */
export function buildApplicationMenuTemplate(
  platform: NodeJS.Platform = process.platform,
): MenuItemConstructorOptions[] {
  const isMac = platform === 'darwin'

  const template: MenuItemConstructorOptions[] = []

  // macOS puts an application menu first; its items come from roles.
  if (isMac) {
    template.push({
      label: 'XiaoJin Agent',
      submenu: [
        { role: 'about', label: '关于 XiaoJin Agent' },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: '隐藏 XiaoJin Agent' },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '全部显示' },
        { type: 'separator' },
        { role: 'quit', label: '退出 XiaoJin Agent' },
      ],
    })
  }

  template.push({
    label: '文件',
    submenu: [{ role: 'quit', label: isMac ? '关闭窗口' : '退出' }],
  })

  template.push({
    label: '编辑',
    submenu: [
      { role: 'undo', label: '撤销' },
      { role: 'redo', label: '重做' },
      { type: 'separator' },
      { role: 'cut', label: '剪切' },
      { role: 'copy', label: '复制' },
      { role: 'paste', label: '粘贴' },
      { role: 'selectAll', label: '全选' },
    ],
  })

  template.push({
    label: '视图',
    submenu: [
      { role: 'reload', label: '重新加载' },
      { role: 'forceReload', label: '强制重新加载' },
      { role: 'toggleDevTools', label: '开发者工具' },
      { type: 'separator' },
      { role: 'resetZoom', label: '实际大小' },
      { role: 'zoomIn', label: '放大' },
      { role: 'zoomOut', label: '缩小' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: '切换全屏' },
    ],
  })

  const windowSubmenu: MenuItemConstructorOptions[] = isMac
    ? [
        { role: 'minimize', label: '最小化' },
        { role: 'zoom', label: '缩放' },
        { type: 'separator' },
        { role: 'front', label: '前置全部窗口' },
      ]
    : [
        { role: 'minimize', label: '最小化' },
        { role: 'close', label: '关闭' },
      ]

  template.push({ label: '窗口', submenu: windowSubmenu })

  return template
}

/** Installs the localised application menu. Call once, during startup. */
export async function installApplicationMenu(
  platform: NodeJS.Platform = process.platform,
): Promise<void> {
  // Imported lazily so the template builder stays importable in plain Node
  // (unit tests) without pulling in the Electron runtime.
  const { Menu } = await import('electron')
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(buildApplicationMenuTemplate(platform)),
  )
}
