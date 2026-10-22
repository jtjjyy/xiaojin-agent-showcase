<script setup lang="ts">
/**
 * BrandMark — the XiaoJin Agent mark: the Minecraft gold-ingot sprite.
 *
 * This is a pixel-for-pixel reproduction of the 16x16 ingot sprite: each rect is
 * one source pixel (horizontally adjacent same-colour pixels are merged into a
 * single rect, which is visually identical), painted from the sprite's own
 * seven-tone palette. The palette lives in the theme tables as `--ingot-1..7`,
 * so the mark stays theme-aware and carries no baked-in colour values.
 *
 * The viewBox is the artwork's tight bounds (16x12) — the sprite's 4:3 shape is
 * the mark's own aspect ratio. `alt` is opt-in: decorative by default.
 */
const props = withDefaults(
  defineProps<{
    size?: number | string
    alt?: string
  }>(),
  {
    size: 24,
    alt: '',
  },
)

const dimension =
  typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <svg
    class="brand-mark"
    viewBox="0 2 16 12"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ width: dimension, height: dimension }"
    :role="props.alt ? 'img' : undefined"
    :aria-label="props.alt || undefined"
    :aria-hidden="props.alt ? undefined : 'true'"
  >
    <rect class="px1" x="10" y="2" width="2" height="1" />
    <rect class="px1" x="7" y="3" width="3" height="1" />
    <rect class="px2" x="10" y="3" width="2" height="1" />
    <rect class="px1" x="12" y="3" width="1" height="1" />
    <rect class="px1" x="4" y="4" width="3" height="1" />
    <rect class="px3" x="7" y="4" width="6" height="1" />
    <rect class="px1" x="13" y="4" width="1" height="1" />
    <rect class="px1" x="1" y="5" width="3" height="1" />
    <rect class="px2" x="4" y="5" width="1" height="1" />
    <rect class="px3" x="5" y="5" width="8" height="1" />
    <rect class="px2" x="13" y="5" width="1" height="1" />
    <rect class="px4" x="14" y="5" width="1" height="1" />
    <rect class="px1" x="0" y="6" width="1" height="1" />
    <rect class="px5" x="1" y="6" width="1" height="1" />
    <rect class="px3" x="2" y="6" width="10" height="1" />
    <rect class="px5" x="12" y="6" width="2" height="1" />
    <rect class="px3" x="14" y="6" width="1" height="1" />
    <rect class="px4" x="15" y="6" width="1" height="1" />
    <rect class="px1" x="0" y="7" width="1" height="1" />
    <rect class="px2" x="1" y="7" width="1" height="1" />
    <rect class="px5" x="2" y="7" width="1" height="1" />
    <rect class="px3" x="3" y="7" width="6" height="1" />
    <rect class="px5" x="9" y="7" width="3" height="1" />
    <rect class="px3" x="12" y="7" width="1" height="1" />
    <rect class="px6" x="13" y="7" width="1" height="1" />
    <rect class="px2" x="14" y="7" width="1" height="1" />
    <rect class="px4" x="15" y="7" width="1" height="1" />
    <rect class="px1" x="0" y="8" width="1" height="1" />
    <rect class="px2" x="1" y="8" width="1" height="1" />
    <rect class="px3" x="2" y="8" width="1" height="1" />
    <rect class="px5" x="3" y="8" width="1" height="1" />
    <rect class="px3" x="4" y="8" width="2" height="1" />
    <rect class="px5" x="6" y="8" width="3" height="1" />
    <rect class="px3" x="9" y="8" width="1" height="1" />
    <rect class="px7" x="10" y="8" width="1" height="1" />
    <rect class="px6" x="11" y="8" width="3" height="1" />
    <rect class="px2" x="14" y="8" width="1" height="1" />
    <rect class="px4" x="15" y="8" width="1" height="1" />
    <rect class="px1" x="0" y="9" width="1" height="1" />
    <rect class="px2" x="1" y="9" width="1" height="1" />
    <rect class="px3" x="2" y="9" width="1" height="1" />
    <rect class="px2" x="3" y="9" width="1" height="1" />
    <rect class="px5" x="5" y="9" width="1" height="1" />
    <rect class="px3" x="6" y="9" width="1" height="1" />
    <rect class="px7" x="7" y="9" width="1" height="1" />
    <rect class="px6" x="8" y="9" width="4" height="1" />
    <rect class="px7" x="12" y="9" width="1" height="1" />
    <rect class="px2" x="13" y="9" width="2" height="1" />
    <rect class="px4" x="15" y="9" width="1" height="1" />
    <rect class="px1" x="0" y="10" width="1" height="1" />
    <rect class="px7" x="1" y="10" width="1" height="1" />
    <rect class="px3" x="2" y="10" width="1" height="1" />
    <rect class="px2" x="3" y="10" width="1" height="1" />
    <rect class="px3" x="4" y="10" width="1" height="1" />
    <rect class="px7" x="5" y="10" width="1" height="1" />
    <rect class="px6" x="6" y="10" width="4" height="1" />
    <rect class="px7" x="10" y="10" width="1" height="1" />
    <rect class="px2" x="11" y="10" width="2" height="1" />
    <rect class="px4" x="13" y="10" width="2" height="1" />
    <rect class="px1" x="1" y="11" width="1" height="1" />
    <rect class="px7" x="2" y="11" width="1" height="1" />
    <rect class="px2" x="3" y="11" width="1" height="1" />
    <rect class="px3" x="4" y="11" width="1" height="1" />
    <rect class="px7" x="5" y="11" width="1" height="1" />
    <rect class="px6" x="6" y="11" width="2" height="1" />
    <rect class="px7" x="8" y="11" width="2" height="1" />
    <rect class="px4" x="10" y="11" width="3" height="1" />
    <rect class="px1" x="2" y="12" width="1" height="1" />
    <rect class="px7" x="3" y="12" width="1" height="1" />
    <rect class="px2" x="4" y="12" width="1" height="1" />
    <rect class="px7" x="5" y="12" width="2" height="1" />
    <rect class="px4" x="7" y="12" width="3" height="1" />
    <rect class="px1" x="3" y="13" width="2" height="1" />
    <rect class="px4" x="5" y="13" width="2" height="1" />
  </svg>
</template>

<style scoped>
.brand-mark {
  display: block;
  flex: none;
  /* Pixel art: snap cell edges so adjacent pixels never show an antialiased
     seam between them. */
  shape-rendering: crispEdges;
}

/* Every pixel cell keeps the sprite's own colour. */
.px1 {
  fill: rgb(var(--ingot-1));
}

.px2 {
  fill: rgb(var(--ingot-2));
}

.px3 {
  fill: rgb(var(--ingot-3));
}

.px4 {
  fill: rgb(var(--ingot-4));
}

.px5 {
  fill: rgb(var(--ingot-5));
}

.px6 {
  fill: rgb(var(--ingot-6));
}

.px7 {
  fill: rgb(var(--ingot-7));
}
</style>
