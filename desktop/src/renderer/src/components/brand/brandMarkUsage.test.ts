import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const rendererRoot = resolve(__dirname, '..', '..')

function readRenderer(path: string): string {
  return readFileSync(resolve(rendererRoot, path), 'utf8')
}

describe('brand mark usage', () => {
  it('does not expose the lucide hexagon as a reusable brand icon', () => {
    const icons = readRenderer('icons.ts')

    expect(icons).not.toContain('Hexagon')
    expect(icons).not.toContain('brandIcon')
  })

  it('draws the gold-ingot mark inline from theme tokens', () => {
    const brandMark = readRenderer('components/brand/BrandMark.vue')

    // Inline SVG rather than a raster asset: it must stay theme-aware, so no
    // baked-in colour values and no PNG dependency.
    expect(brandMark).toContain('<svg')
    expect(brandMark).not.toMatch(/\.png/)
    expect(brandMark).not.toMatch(/#[0-9a-fA-F]{3,8}\b/)
    // Pixel art on the artwork's own 16x12 grid.
    expect(brandMark).toContain('viewBox="0 2 16 12"')
    // Every one of the sprite's seven tones is painted from a token.
    for (let tone = 1; tone <= 7; tone += 1) {
      expect(brandMark, `tone ${tone}`).toContain(
        `rgb(var(--ingot-${tone}))`,
      )
    }
  })

  it('defines the full ingot palette identically in both themes', () => {
    const dark = readRenderer('theme/dark.css')
    const light = readRenderer('theme/light.css')
    const tones = [1, 2, 3, 4, 5, 6, 7].map((n) => `--ingot-${n}`)

    for (const css of [dark, light]) {
      for (const key of tones) {
        // Solid colours must stay RGB triplets so `rgb(var(--x) / <alpha>)` works.
        expect(css, key).toMatch(
          new RegExp(`${key}:\\s*\\d+ \\d+ \\d+\\s*;`),
        )
      }
    }
    // The two tables must not merely both define the palette: they must stay the
    // same key set overall (also enforced by theme/tokens.test.ts).
    const keys = (css: string) =>
      [...css.matchAll(/(--[\w-]+)(?=\s*:)/g)].map((m) => m[1])
    expect(keys(dark).sort()).toEqual(keys(light).sort())
  })

  it('keeps key brand surfaces on project logo assets instead of brandIcon', () => {
    const files = [
      'components/sidebar/SidebarBrandRow.vue',
      'components/sidebar/SidebarRail.vue',
    ]

    for (const file of files) {
      const source = readRenderer(file)
      expect(source, file).toContain('BrandMark')
      expect(source, file).not.toContain('brandIcon')
    }

    const setupDialog = readRenderer(
      'components/onboarding/ModelSetupRequiredDialog.vue',
    )
    // The setup dialog draws the same mark inline and labels it in text, rather
    // than relying on a raster wordmark asset.
    expect(setupDialog).toContain('BrandMark')
    expect(setupDialog).not.toContain('brandIcon')
  })
})
