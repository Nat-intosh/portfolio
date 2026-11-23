<script setup lang="ts">
import type { AnimationItem } from 'lottie-web'
// Run `npm run fix:lottie` after each Cavalry export to normalize the JSON.
import heroAnimationUrl from '~/assets/lottie/hero.json?url'

const siteUrl = 'https://nellvand.fr'
const localTitle = 'Technicien·ne son & lumière, vidéo, design et web à Bordeaux'
const localDescription = `${localTitle}. Je fais briller vos scènes, vos écrans et votre image.`

useSeoMeta({
  title: `Nell Vandaele — ${localTitle}`,
  description: localDescription,
  keywords:
    'technicien son lumière Bordeaux, vidéo Bordeaux, design Bordeaux, web Bordeaux, régie évènementielle, audiovisuel, Nell Vandaele',
  robots: 'index, follow',
  ogTitle: `Nell Vandaele — ${localTitle}`,
  ogDescription: localDescription,
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogSiteName: 'Nell Vandaele',
  twitterCard: 'summary_large_image',
})

// Structured data makes the profession and the city explicit for search
// engines, beyond the visible title and meta description.
useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nell Vandaele',
        url: siteUrl,
        jobTitle: localTitle,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bordeaux',
          addressCountry: 'FR',
        },
      }),
    },
  ],
})
definePageMeta({ navbar: false })

const { data: categories } = await useProjectCategories()
const mediaUrl = useStrapiMedia()

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
const HERO_START_FRAME = 470

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

// ─── Static copy ───────────────────────────────────────────────────────────
const profile = {
  name: 'Nell Vandaele',
  tagline: 'Là pour faire briller vos scènes, vos écrans et votre image.',
  status: 'Ouvert·e à de nouveaux projets',
  banner: '/images/banner.jpg',
  avatar: '../images/pp.jpg',
}

const portfolio = {
  title: 'Portfolio',
  intro: 'Des compétences diverses disponibles pour répondre à vos besoins',
}

// Project categories come from Strapi. A category without its own image falls
// back to the cover of its first project.
const CATEGORY_ORDER = ['technique', 'audiovisuel', 'design', 'web']

const normalize = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase()

const categoryRank = (title: string) => {
  const i = CATEGORY_ORDER.indexOf(normalize(title))
  return i === -1 ? CATEGORY_ORDER.length : i
}

const portfolioItems = computed(() =>
  [...(categories.value ?? [])]
    .sort((a, b) => categoryRank(a.title) - categoryRank(b.title))
    .map((category) => ({
      title: category.title,
      subtitle: category.subtitle ?? '',
      to: `/${strapiSlug(category.title)}`,
      image: mediaUrl(
        category.image ?? category.projects?.[0]?.cover ?? null,
        'large',
      ),
    })),
)

const skills = {
  title: 'Compétences',
  items: [
    {
      icon: 'lucide:sun',
      title: 'Lumière',
      description: 'Plans, visualisations, choix et installation du matériel, pupitrage et distribution',
      tools: 'GrandMA3, GrandMA2, Dot2, Capture SE',
    },
    {
      icon: 'lucide:volume-2',
      title: 'Son',
      description: 'Choix et installation du matériel, distribution, captation et mixage',
      tools: 'Yamaha, Midas, Behringer, Protools, Ableton',
    },
    {
      icon: 'lucide:aperture',
      title: 'Audiovisuel',
      description: 'Réalisation, captation, montage, motion design, réseaux sociaux',
      tools: 'Davinci Resolve, Premiere Pro, After effects, Cavalry',
    },
    {
      icon: 'lucide:pipette',
      title: 'Design',
      description: 'Ux/Ui, communication, identités graphiques',
      tools: 'Figma, Illustrator, Indesign',
    },
    {
      icon: 'lucide:code-xml',
      title: 'Web',
      description: 'Développement, automatisations, hébergement, serveurs',
      tools: 'NuxtJS, Ruby on Rails, NodeJS, Tailwindcss, Docker, Linux',
    },
  ],
}

const journey = {
  title: 'Parcours',
  items: [
    { title: 'Bac général avec mention', detail: 'Maths, physique, SI, maths expertes', place: 'Lille, 2022' },
    { title: 'BUT Métiers du Multimédia et de l’Internet', detail: 'Parcours stratégie de communication', place: 'IUT Bordeaux Montaigne, 2023-2026' },
    { title: 'Création auto-entreprise', detail: "D'abord pour de la technique évènementielle", place: "Bordeaux, 2024" },
    { title: 'Stages de 3 mois au Girofard', detail: 'Deux stages de trois mois, en 2025 et 2026 pour faire de la communication, un site web et de la technique évènementielle au sein du Girofard, centre LGBTQIAP+ de Bordeaux.', place: 'Bordeaux, 2025 et 2026' },
    { title: '100% en auto-entreprise', detail: "Pour faire de la technique, de l'Audiovisuel, des sites web et du design", place: 'Bordeaux, 2026' },
  ],
}

const tools = {
  title: 'Outils',
  items: [
    {
      title: 'Fiche tech builder',
      description: 'Un petit outil fait maison pour vous aider à faire des fiches techniques complètes et utilisables pour tout le monde.',
      label: 'Disponible prochainement',
      to: '/outils/fiche-tech-builder',
    },
    {
      title: 'Recommandations techniques',
      description: 'Des documents en lien avec la technique évènementielle. Note d’accessibilité, qualité des sons, exemple de fiche technique...',
      label: 'S’y rendre',
      to: 'https://techfiles.nellvand.fr',
    },
  ]
}

const cta = {
  title: 'Une idée de projet ?',
  text: 'Un événement à éclairer, une vidéo à monter, un site à imaginer ? Racontez-moi votre projet, on trouvera ensemble comment le faire briller.',
  label: 'Contactez-moi',
  to: '/contact',
}
</script>

<!--
  Requirements: @nuxtjs/tailwindcss, @nuxt/icon (+ @iconify-json/lucide),
  and Google Fonts "Syne" + "Outfit" loaded in nuxt.config.ts (app.head.link).
  Colors: ink #0E0E10 · brand #6A4CF6 · brand-deep #4A2FC4 · lilac #C47CF7 · lime #EDF77C
-->
<template>
  <div class="min-h-screen bg-[#0E0E10] font-porpora text-white">
    <main class="mx-auto w-full max-w-6xl px-5 md:px-8">
      <!-- Hero -->
      <section class="md:pt-8">
        <div
          class="relative -mx-5 h-[64vh] overflow-hidden bg-[#0E0E10] md:mx-0 md:rounded-lg"
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
        </div>

        <div class="mt-8 flex items-center justify-between gap-6">
          <div>
            <h1 class="font-mattone text-4xl font-extrabold md:text-5xl">
              {{ profile.name }}<span class="sr-only"> — {{ localTitle }}</span>
            </h1>
            <p class="mt-3 max-w-xs text-lg leading-snug md:max-w-sm md:text-xl">{{ profile.tagline }}</p>
            <span class="mt-4 inline-block rounded bg-[#EDF77C] px-2 py-1 text-s font-medium text-[#0E0E10]">
              {{ profile.status }}
            </span>
          </div>

          <div
            class="hidden h-32 aspect-square shrink-0 rounded-full bg-[url('../images/pp.jpg')] bg-cover md:block"
          />
        </div>
      </section>

      <!-- Portfolio -->
      <section id="portfolio" class="mt-32 md:mt-20">
        <h2 class="font-mattone text-2xl md:text-3xl">{{ portfolio.title }}</h2>
        <p class="mt-2 text-lg text-white md:max-w-xs">{{ portfolio.intro }}</p>

        <ul class="mt-6 grid grid-cols-2 gap-3 md:gap-4">
          <li v-for="item in portfolioItems" :key="item.to">
            <NuxtLink :to="item.to" class="group block overflow-hidden rounded-md">
              <div class="aspect-[16/10] overflow-hidden bg-neutral-800">
                <img
                  v-if="item.image"
                  :src="item.image"
                  alt=""
                  loading="lazy"
                  class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div
                  v-else
                  class="h-full w-full bg-gradient-to-br from-[#6A4CF6] to-[#4A2FC4]"
                  aria-hidden="true"
                />
              </div>
              <div class="bg-gradient-to-b from-[#6A4CF6] to-[#4A2FC4] px-3 py-6">
                <div class="flex items-center justify-between">
                  <h3 class="font-mattone text-sm md:text-base">{{ item.title }}</h3>
                  <Icon name="lucide:arrow-right" class="size-4 transition group-hover:translate-x-0.5" />
                </div>
                <p class="mt-0.5 text-xs text-white truncate">{{ item.subtitle }}</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <!-- Compétences -->
      <section id="competences" class="mt-16 md:mt-20">
        <h2 class="font-mattone text-2xl md:text-3xl">{{ skills.title }}</h2>

        <ul
          class="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-5 md:gap-x-5 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0"
        >
          <li
            v-for="skill in skills.items"
            :key="skill.title"
            class="w-40 shrink-0 snap-start md:w-auto md:shrink"
          >
              <Icon :name="skill.icon" class="size-9 text-[#6A4CF6]" />
              <h3 class="mt-3 font-mattone text-base">{{ skill.title }}</h3>
              <p class="mt-2 text-sm leading-snug text-white">{{ skill.description }}</p>
              <p class="mt-3 text-xs leading-snug text-white/80">{{ skill.tools }}</p>

          </li>
        </ul>
      </section>

      <!-- Parcours + Outils -->
      <div class="mt-16 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-12">
        <section id="parcours">
          <h2 class="font-mattone text-2xl md:text-3xl">{{ journey.title }}</h2>

          <ol class="relative ml-2 mt-6 space-y-5 pl-6">
            <li
              v-for="(step, i) in journey.items"
              :key="step.title"
              class="relative"
            >
              <!-- connector: from this dot's center to the next dot's center -->
              <span
                v-if="i < journey.items.length - 1"
                class="absolute -left-[26px] top-3 h-[calc(100%+1.25rem)] w-0.5 bg-[#6A4CF6]"
                aria-hidden="true"
              />

              <span
                class="absolute -left-[33px] top-1 size-4 rounded-full border-2 border-[#6A4CF6] bg-[#0E0E10]"
                aria-hidden="true"
              />

              <h3 class="font-mattone text-base leading-tight">{{ step.title }}</h3>
              <p class="mt-1 text-xs leading-snug text-white/90">
                {{ step.detail }}<br />{{ step.place }}
              </p>
            </li>
          </ol>
        </section>

        <section id="outils">
          <h2 class="font-mattone text-2xl md:text-3xl">{{ tools.title }}</h2>

          <ul class="mt-6 grid grid-cols-2 gap-4">
            <li v-for="tool in tools.items" :key="tool.title">
              <h3
                class="inline-block rounded bg-[#EDF77C] px-2 py-1 font-mattone text-sm  leading-tight text-[#0E0E10]"
              >
                {{ tool.title }}
              </h3>
              <p class="mt-3 text-xs leading-snug text-white/90 md:text-sm">{{ tool.description }}</p>
              <NuxtLink :to="tool.to" class="mt-3 inline-block text-sm font-mattone hover:underline underline-offset-2">
                {{ tool.label }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>

      <!-- Contact CTA -->
    </main>
    <section
      id="contact"
      class="relative overflow-hidden bg-[#0E0E10] px-5 py-20 text-center md:px-8 md:py-28"
    >
      <!-- 1. Circle, centered on the bottom edge (only the top half is visible) -->
     <!-- Glow: blurred circle centered on the bottom edge -->
        <div
          class="pointer-events-none absolute bottom-0 left-1/2 aspect-16/9 w-[60%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#6e4af1] md:opacity-70 blur-[150px] md:w-[40%]"
          aria-hidden="true"
        />
      <!-- 3. Content -->
      <div class="relative z-10 mx-auto max-w-6xl">
        <h2 class="font-mattone text-2xl md:text-4xl">{{ cta.title }}</h2>
        <p class="mx-auto mt-3 max-w-xl text-lg md:text-xl">{{ cta.text }}</p>
        <NuxtLink
          :to="cta.to"
          class="mt-5 inline-block font-mattone rounded bg-[#C47CF7] px-4 py-1.5 text-md text-[#0E0E10] transition hover:bg-[#F59BD3]"
        >
          {{ cta.label }}
        </NuxtLink>
      </div>
    </section>
    </div>
    </template>
  

