import { describe, expect, it } from 'vitest'
import type { MenuItemConstructorOptions } from 'electron'
import { buildApplicationMenuTemplate } from './app-menu'

function topLabels(platform: NodeJS.Platform): string[] {
  return buildApplicationMenuTemplate(platform).map((item) => item.label ?? '')
}

function submenuOf(
  platform: NodeJS.Platform,
  label: string,
): MenuItemConstructorOptions[] {
  const item = buildApplicationMenuTemplate(platform).find(
    (entry) => entry.label === label,
  )
  if (!item) throw new Error(`no top-level menu labelled ${label}`)
  return (item.submenu ?? []) as MenuItemConstructorOptions[]
}

describe('application menu localisation', () => {
  it('uses Chinese top-level labels instead of Electron’s English default', () => {
    for (const platform of ['darwin', 'win32', 'linux'] as const) {
      const labels = topLabels(platform)
      // The exact thing the user saw before this menu existed.
      for (const english of ['File', 'Edit', 'View', 'Window', 'Help']) {
        expect(labels, platform).not.toContain(english)
      }
      expect(labels, platform).toContain('文件')
      expect(labels, platform).toContain('编辑')
      expect(labels, platform).toContain('视图')
      expect(labels, platform).toContain('窗口')
    }
  })

  it('keeps every leaf on a built-in role, so accelerators stay with Electron', () => {
    const leaves = (items: MenuItemConstructorOptions[]): MenuItemConstructorOptions[] =>
      items.flatMap((item) =>
        item.submenu
          ? leaves(item.submenu as MenuItemConstructorOptions[])
          : [item],
      )

    for (const platform of ['darwin', 'win32', 'linux'] as const) {
      for (const menu of buildApplicationMenuTemplate(platform)) {
        for (const leaf of leaves((menu.submenu ?? []) as MenuItemConstructorOptions[])) {
          if (leaf.type === 'separator') continue
          // A hand-rolled `click` handler would lose the platform accelerator
          // and the enabled/disabled semantics Electron maintains for roles.
          expect(leaf.role, `${platform} / ${String(leaf.label)}`).toBeTruthy()
          expect(leaf.click, `${platform} / ${String(leaf.label)}`).toBeUndefined()
        }
      }
    }
  })

  it('gives macOS the standard application menu and other platforms none', () => {
    const mac = topLabels('darwin')
    expect(mac[0]).toBe('XiaoJin Agent')
    const appMenu = submenuOf('darwin', 'XiaoJin Agent')
    expect(appMenu.map((item) => item.role)).toEqual([
      'about',
      undefined,
      'services',
      undefined,
      'hide',
      'hideOthers',
      'unhide',
      undefined,
      'quit',
    ])

    for (const platform of ['win32', 'linux'] as const) {
      const labels = topLabels(platform)
      expect(labels[0], platform).toBe('文件')
      expect(labels, platform).not.toContain('XiaoJin Agent')
    }
  })

  it('translates the items inside each menu', () => {
    expect(submenuOf('win32', '文件').map((i) => i.label)).toEqual(['退出'])
    expect(submenuOf('win32', '编辑').map((i) => i.label)).toEqual([
      '撤销',
      '重做',
      undefined,
      '剪切',
      '复制',
      '粘贴',
      '全选',
    ])
    expect(submenuOf('win32', '视图').map((i) => i.label)).toEqual([
      '重新加载',
      '强制重新加载',
      '开发者工具',
      undefined,
      '实际大小',
      '放大',
      '缩小',
      undefined,
      '切换全屏',
    ])
    expect(submenuOf('win32', '窗口').map((i) => i.label)).toEqual([
      '最小化',
      '关闭',
    ])
  })
})
