<script setup lang="ts">
/**
 * WhaleGirlScene — the first-run welcome illustration.
 *
 * Inline SVG on the theme tokens rather than a raster render: the old panel was
 * a gold machine render that fought the whale-blue palette, and a raster cannot
 * follow the theme or the contrast/degraded-transparency preferences. Purely
 * decorative, so it is aria-hidden.
 */
</script>

<template>
  <svg
    class="whale-scene"
    viewBox="0 0 420 560"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="whale-scene-water" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="0"
          stop-color="rgb(var(--accent-fill))"
          stop-opacity="0.34"
        />
        <stop
          offset="0.55"
          stop-color="rgb(var(--accent-fill))"
          stop-opacity="0.12"
        />
        <stop
          offset="1"
          stop-color="rgb(var(--bg-base))"
          stop-opacity="0"
        />
      </linearGradient>
      <linearGradient id="whale-scene-ray" x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="0"
          stop-color="rgb(var(--accent-glare))"
          stop-opacity="0.3"
        />
        <stop
          offset="1"
          stop-color="rgb(var(--accent-glare))"
          stop-opacity="0"
        />
      </linearGradient>
    </defs>

    <rect width="420" height="560" fill="url(#whale-scene-water)" />

    <!-- light shafts from the surface -->
    <g class="scene-rays">
      <path d="M96 0 L58 560 L150 560 L138 0 Z" fill="url(#whale-scene-ray)" />
      <path d="M236 0 L206 560 L266 560 L262 0 Z" fill="url(#whale-scene-ray)" />
      <path d="M330 0 L318 560 L352 560 L352 0 Z" fill="url(#whale-scene-ray)" />
    </g>

    <!-- drifting bubbles -->
    <g class="scene-bubbles" fill="rgb(var(--label-primary))">
      <circle cx="72" cy="500" r="6" opacity="0.18" />
      <circle cx="96" cy="452" r="4" opacity="0.14" />
      <circle cx="58" cy="410" r="8" opacity="0.12" />
      <circle cx="128" cy="330" r="5" opacity="0.16" />
      <circle cx="348" cy="470" r="7" opacity="0.14" />
      <circle cx="368" cy="404" r="4" opacity="0.18" />
      <circle cx="322" cy="272" r="6" opacity="0.12" />
      <circle cx="180" cy="206" r="4" opacity="0.16" />
      <circle cx="250" cy="132" r="5" opacity="0.14" />
    </g>

    <!-- the whale girl -->
    <g class="scene-whale">
      <!-- tail fluke -->
      <path
        class="scene-tail"
        d="M266 300 C296 268 312 236 312 236 C312 288 302 320 282 324 C272 326 266 316 266 300 Z"
      />
      <path
        class="scene-tail"
        d="M266 348 C296 380 312 412 312 412 C312 360 302 328 282 324 C272 322 266 332 266 348 Z"
      />
      <!-- body -->
      <path
        class="scene-body"
        d="M150 254 C210 254 274 292 278 336 C282 384 228 430 168 428 C112 426 74 386 74 342 C74 296 104 254 150 254 Z"
      />
      <!-- pectoral fin -->
      <ellipse
        class="scene-fin"
        cx="182"
        cy="394"
        rx="52"
        ry="28"
        transform="rotate(-14 182 394)"
      />
      <!-- blowhole spout -->
      <path
        class="scene-spout"
        d="M172 244 C168 214 158 196 150 184"
        fill="none"
        stroke-width="5"
        stroke-linecap="round"
      />
      <!-- eye -->
      <circle class="scene-eye" cx="140" cy="322" r="11" />
      <!-- blush -->
      <ellipse
        class="scene-blush"
        cx="112"
        cy="356"
        rx="16"
        ry="9"
        opacity="0.5"
      />
      <!-- smart mouth -->
      <path
        class="scene-mouth"
        d="M136 366 q14 12 28 0"
        fill="none"
        stroke-width="5"
        stroke-linecap="round"
      />
      <!-- maid headband -->
      <path
        class="scene-ribbon"
        d="M116 276 Q158 230 214 264"
        fill="none"
        stroke-width="13"
        stroke-linecap="round"
      />
      <circle class="scene-ribbon" cx="112" cy="274" r="19" />
      <circle class="scene-ribbon" cx="216" cy="264" r="15" />
    </g>

    <!-- seabed kelp -->
    <g class="scene-kelp" stroke-linecap="round" fill="none">
      <path
        d="M40 560 C28 508 58 486 44 434"
        stroke="rgb(var(--avatar-2))"
        stroke-width="9"
        opacity="0.3"
      />
      <path
        d="M74 560 C62 520 90 500 78 458"
        stroke="rgb(var(--avatar-2))"
        stroke-width="7"
        opacity="0.22"
      />
      <path
        d="M386 560 C374 512 402 490 390 446"
        stroke="rgb(var(--avatar-2))"
        stroke-width="8"
        opacity="0.26"
      />
    </g>
  </svg>
</template>

<style scoped>
.whale-scene {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 430px;
}

.scene-body {
  fill: rgb(var(--accent-fill));
}

.scene-tail,
.scene-fin {
  fill: rgb(var(--accent-hover));
}

.scene-eye {
  fill: rgb(var(--bg-base));
}

.scene-blush {
  fill: rgb(var(--fin));
}

.scene-mouth {
  stroke: rgb(var(--bg-base) / 0.7);
}

.scene-ribbon {
  fill: rgb(var(--fin));
  stroke: rgb(var(--fin));
}

.scene-spout {
  stroke: rgb(var(--accent-glare) / 0.6);
}

.scene-whale {
  transform-origin: 176px 336px;
  animation: whale-bob 6s var(--ease-in-out) infinite;
}

.scene-bubbles {
  animation: bubble-drift 9s var(--ease-in-out) infinite;
}

@keyframes whale-bob {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-14px) rotate(-1.5deg);
  }
}

@keyframes bubble-drift {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px);
  }
}
</style>
