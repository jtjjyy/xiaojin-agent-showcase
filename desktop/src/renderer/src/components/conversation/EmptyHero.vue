<script setup lang="ts">
/**
 * EmptyHero — NEW SESSION hero chrome: the whale-girl mascot and headline
 * centered above the composer card, with an accent backdrop glow behind the
 * card. The card itself is the shared ComposerCard rendered by ConversationView
 * in the same seat (no remount between phases).
 *
 * The mascot is the brand mark at hero scale, so it stays theme-aware and
 * carries the fin-pink accent into the largest surface in the app.
 */
import BrandMark from '../brand/BrandMark.vue'

defineProps<{ projectName?: string }>()
</script>

<template>
  <div class="empty-hero">
    <div class="glow" aria-hidden="true" />
    <div class="mascot" aria-hidden="true">
      <BrandMark :size="72" />
    </div>
    <h1 class="headline">
      <span class="headline-text">今天想推进什么？</span>
    </h1>
    <p v-if="projectName" class="project">
      项目 · <strong>{{ projectName }}</strong>
    </p>
  </div>
</template>

<style scoped>
.empty-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}

/* The mascot floats in place with the same compositor-only discipline as the
   rest of the app (transform + opacity); a11y.css collapses the duration. */
.mascot {
  position: relative;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-1);
  animation: hero-float 7s var(--ease-in-out) infinite;
}

.mascot::after {
  position: absolute;
  inset: -22%;
  content: '';
  border-radius: 999px;
  background: radial-gradient(
    closest-side,
    rgb(var(--fin) / 0.22),
    transparent 72%
  );
  pointer-events: none;
}

.headline {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2-5);
  margin: 0;
  color: rgb(var(--label-primary));
  font-size: 26px;
  line-height: var(--space-8);
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* A whisper of depth on the largest type in the app: the headline resolves
   from near-white into the whale-blue accent instead of sitting flat. */
.headline-text {
  background: linear-gradient(
    100deg,
    rgb(var(--label-primary)) 0%,
    rgb(var(--label-primary)) 42%,
    rgb(var(--accent-strong)) 100%
  );
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mark {
  flex: none;
}

.project {
  position: relative;
  margin: 0;
  font-size: var(--fs-xs);
  line-height: var(--lh-xs);
  color: rgb(var(--label-tertiary));
}

.project strong {
  color: rgb(var(--label-secondary));
  font-weight: 500;
}

.glow {
  position: absolute;
  top: 100%;
  left: 50%;
  width: min(1060px, 135vw);
  aspect-ratio: 1051 / 468;
  background: radial-gradient(
    closest-side,
    rgb(var(--accent-fill) / 0.16),
    rgb(var(--accent-fill) / 0.06) 55%,
    transparent
  );
  transform: translate(-50%, -30%);
  pointer-events: none;
}

@keyframes hero-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}
</style>
