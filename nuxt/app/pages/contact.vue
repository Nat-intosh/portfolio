<script setup lang="ts">
import type { AnimationItem } from 'lottie-web'
// Run `npm run fix:lottie` after each Cavalry export to normalize the JSON.
import heroAnimationUrl from '~/assets/lottie/hero.json?url'

useSeoMeta({
  title: 'Nell Vandaele — Contact',
  description: 'Là pour faire briller vos scènes, vos écrans et votre image.',
})

// ─── Hero animation (Lottie exported from Cavalry) ─────────────────────────
// The lightweight SVG is rendered immediately. The Lottie JSON is only loaded
// once the page is idle, rendered over the SVG, then faded in.
//
// The segment is expressed in animation frames, so it does not depend on the
// playback speed or the visual scale. Tweak these values freely without
// recalculating the segment.
const HERO_SEGMENT: [number, number] = [260, 505]
const HERO_SPEED = 0.2 // 1 = Cavalry speed, 0.5 = half speed, 2 = double speed
// Frame where the first playback starts. Must stay inside HERO_SEGMENT.
// The loop itself still starts at HERO_SEGMENT[0].
const HERO_START_FRAME = 260

// 1 = fill the hero, >1 = zoom in, <1 = zoom out.
// The base value is mobile; `md:` (Tailwind, 768px) uses the laptop value.
const HERO_SCALE_MOBILE = 1.4
const HERO_SCALE_LAPTOP = 1.2
const heroScaleStyle = {
  '--hero-scale-mobile': HERO_SCALE_MOBILE,
  '--hero-scale-laptop': HERO_SCALE_LAPTOP,
}

const lottieContainer = ref<HTMLElement | null>(null)
const lottieRequested = ref(false)
const lottieReady = ref(false)
const lottieFailed = ref(false)

let lottieAnimation: AnimationItem | null = null

onMounted(() => {
  // Keep the lightweight SVG for users who asked for less motion or data.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
  ).connection

  if (
    connection?.saveData ||
    /(^|-)2g$/.test(connection?.effectiveType ?? '')
  ) {
    return
  }

  // Wait for the first paint / main-thread idle before loading the JSON.
  const requestLottie = () => {
    lottieRequested.value = true
    nextTick(() => {
      void loadLottie()
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(requestLottie, { timeout: 2000 })
  } else {
    window.setTimeout(requestLottie, 300)
  }
})

async function loadLottie() {
  if (!lottieContainer.value || lottieAnimation) return

  try {
    const { default: lottie } = await import('lottie-web')

    lottieAnimation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: heroAnimationUrl,
      // Only play the loop portion of the Cavalry timeline.
      initialSegment: HERO_SEGMENT,
      rendererSettings: {
        // Fill the hero and crop instead of letterboxing, like object-cover.
        preserveAspectRatio: 'xMidYMid slice',
      },
    })

    // Playback speed never changes the frame range.
    lottieAnimation.setSpeed(HERO_SPEED)

    lottieAnimation.addEventListener('DOMLoaded', () => {
      // With initialSegment, lottie-web expects a frame relative to the
      // segment start. This seeks to HERO_START_FRAME without changing the
      // loop range or the playback speed.
      lottieAnimation?.goToAndPlay(HERO_START_FRAME - HERO_SEGMENT[0], true)
      lottieReady.value = true
    })
    lottieAnimation.addEventListener('data_failed', () => {
      lottieFailed.value = true
    })
  } catch {
    lottieFailed.value = true
  }
}

onBeforeUnmount(() => {
  lottieAnimation?.destroy()
  lottieAnimation = null
})

// ─── Static copy (sample data from the design) ─────────────────────────────
const page = {
  title: 'Contactez-moi',
  intro: 'Et discutons ensemble de votre prochain projet !',
  status: 'Ouvert·e à de nouveaux projets',
  heroCredit: '',
  methodsTitle: 'Multiples façons d’échanger',
  methodsIntro: 'Merci d’avance pour votre confiance',
}

const backLink = {
  label: 'Retour à l’accueil',
  to: '/',
}

// ─── Contact methods ───────────────────────────────────────────────────────
const EMAIL = 'contact@nellvand.fr'
const INSTAGRAM = 'nellvand'
const WHATSAPP = 'nellvand'

// The phone number is kept in pieces and only assembled on click, so it is
// never in the rendered HTML (keeps it away from scrapers).
const phoneParts = ['+33', '7', '67', '87', '06', '96']
const phoneRevealed = ref(false)
const phoneDisplay = computed(() => phoneParts.join(' '))
const phoneHref = computed(() => `tel:${phoneParts.join('')}`)

interface ContactItem {
  key: string
  title: string
  detail: string
  href?: string
  external?: boolean
  onClick?: () => void
}

const contactItems = computed<ContactItem[]>(() => [
  {
    key: 'mail',
    title: 'Par mail',
    detail: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    key: 'phone',
    title: 'Par téléphone',
    detail: phoneRevealed.value ? phoneDisplay.value : 'Cliquez pour révéler',
    // Button until revealed, then a real tel: link
    href: phoneRevealed.value ? phoneHref.value : undefined,
    onClick: phoneRevealed.value ? undefined : () => (phoneRevealed.value = true),
  },
  {
    key: 'instagram',
    title: 'Via instagram',
    detail: `@${INSTAGRAM}`,
    href: `https://www.instagram.com/${INSTAGRAM}`,
    external: true,
  },
  {
    key: 'whatsapp',
    title: 'Via whatsapp',
    detail: `@${WHATSAPP}`,
    // wa.me expects a phone number: swap for the real one, e.g. https://wa.me/33612345678
    href: `https://wa.me/${phoneParts.join('').replace('+', '')}`,
    external: true,
  },
])
</script>

<!--
  Requirements: @nuxtjs/tailwindcss, lottie-web, font-porpora / font-mattone.
  Colors: ink #0E0E10 · brand #6A4CF6 · brand-deep #4A2FC4 · lilac #C47CF7 · lime #EDF77C
-->
<template>
  <div class="min-h-screen bg-[#0E0E10] font-porpora text-white">
    <main class="mx-auto w-full max-w-6xl px-5 md:px-8">
      <!-- Hero -->
      <section class="md:pt-16">
        <div
          class="relative -mx-5 h-[64vh] overflow-hidden bg-[#0E0E10] md:mx-0 md:rounded-lg md:mt-6"
        >
          <!-- The SVG fallback and the Lottie animation are scaled together. -->
          <div
            class="absolute inset-0 origin-center scale-[var(--hero-scale-mobile)] md:scale-[var(--hero-scale-laptop)]"
            :style="heroScaleStyle"
          >
            <!-- Lightweight SVG: visible immediately, also the Lottie fallback -->
            <div
              class="absolute inset-0 bg-[url('../images/herologo.svg')] bg-center bg-cover bg-no-repeat"
              aria-hidden="true"
            />

            <!-- Cavalry Lottie animation, loaded after the first paint -->
            <div
              v-if="lottieRequested && !lottieFailed"
              ref="lottieContainer"
              class="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
              :class="lottieReady ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            />
          </div>

          <!-- Photo credit, outside the scaled layer so it stays put -->
          <p class="absolute bottom-2 right-3 z-10 text-[10px] text-white/80">
            {{ page.heroCredit }}
          </p>
        </div>

        <div class="mt-8">
          <h1 class="font-mattone text-4xl font-extrabold md:text-5xl">{{ page.title }}</h1>
          <p class="mt-3 max-w-xs text-lg leading-snug md:max-w-sm md:text-xl">{{ page.intro }}</p>
          <span class="mt-4 inline-block rounded bg-[#EDF77C] px-2 py-1 text-s font-medium text-[#0E0E10]">
            {{ page.status }}
          </span>
        </div>
      </section>

      <!-- Contact methods -->
      <section id="contact" class="mt-32 md:mt-20">
        <h2 class="font-mattone text-2xl md:text-3xl">{{ page.methodsTitle }}</h2>
        <p class="mt-2 text-lg text-white md:max-w-xs">{{ page.methodsIntro }}</p>

        <ul class="mt-6 grid grid-cols-2 gap-3 md:gap-4">
          <li v-for="item in contactItems" :key="item.key">
            <!-- <a> when there is a link, <button> for the "click to reveal" phone -->
            <component
              :is="item.href ? 'a' : 'button'"
              :href="item.href"
              :type="item.href ? undefined : 'button'"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener' : undefined"
              class="block h-full w-full rounded-md bg-gradient-to-b from-[#6A4CF6] to-[#4A2FC4] px-3 py-6 text-left transition hover:brightness-110"
              @click="item.onClick?.()"
            >
              <h3 class="font-mattone text-sm md:text-base">{{ item.title }}</h3>
              <p class="mt-1 truncate text-xs text-white">{{ item.detail }}</p>
            </component>
          </li>
        </ul>
      </section>

      <!-- Back to home -->
      <section class="py-20 text-center md:py-28">
        <NuxtLink
          :to="backLink.to"
          class="inline-block font-mattone rounded bg-[#C47CF7] px-4 py-1.5 text-md text-[#0E0E10] transition hover:bg-[#F59BD3]"
        >
          {{ backLink.label }}
        </NuxtLink>
      </section>
    </main>
  </div>
</template>