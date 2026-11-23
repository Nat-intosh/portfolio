<script setup lang="ts">
import type { ProjectContentBlock } from '~/composables/useProjectCategories'

useSeoMeta({
  title: 'Web — Nell Vandaele',
  description: "Je peux développer votre idée et la rendre visible en l'hébergeant",
})

const { data: categories } = await useProjectCategories()
const mediaUrl = useStrapiMedia()

// ─── Category ("Technique") ────────────────────────────────────────────────
const category = computed(
  () => categories.value.find((item) => strapiSlug(item.title) === 'web') ?? null,
)

const page = computed(() => ({
  title: category.value?.title ?? 'web',
  intro:
    category.value?.page_description ??
    'Réalisations de vidéos promotionelles, de supports de communications, de captations de spectacle, de courts métrages, d’intros en motion design, de mixages sons.',
  heroCredit: category.value?.image_credit
    ? `Photo ${category.value.image_credit}`
    : '',
  featuredTitle: 'Projets mis en avant',
}))

const heroImage = computed(() => mediaUrl(category.value?.image, 'large'))

interface ProjectView {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  excerpt: string
  date: string
  credit?: string
  cover: string
  content: ProjectContentBlock[]
}

// Strapi has no slug field yet, so the URL identifier is derived from the
// project name ("Les voix du matrimoine" -> "les-voix-du-matrimoine").
const projects = computed<ProjectView[]>(() =>
  (category.value?.projects ?? []).map((project) => ({
    slug: strapiSlug(project.name) || project.documentId,
    title: project.client ?? project.name ?? '',
    subtitle: project.name ?? '',
    tags: (project.tags ?? []).map((tag) => tag.name),
    excerpt: project.description ?? '',
    date: formatStrapiDate(project.date),
    credit: project.cover_credit ? `Image de couverture : ${project.cover_credit}` : undefined,
    cover: mediaUrl(project.cover, 'large'),
    content: project.content_zone ?? [],
  })),
)

const cta = {
  title: 'Une idée de projet ?',
  text: 'Un événement à éclairer, une vidéo à monter, un site à imaginer ? Racontez-moi votre projet, on trouvera ensemble comment le faire briller.',
  label: 'Contactez-moi',
  to: '/contact',
}

// ─── Opened project, driven by the URL: /technique?projet=<slug> ───────────
// Using the query string means the project is linkable, and the browser's
// back button closes it.
const route = useRoute()
const router = useRouter()

const current = computed(() => projects.value.find((p) => p.slug === route.query.projet) ?? null)

function closeProject() {
  router.replace({ query: {} })
}

// Shared with <AppNavbar>: on desktop the navbar shrinks to the left half
// while the side panel is open. Same key must be used in both files.
const panelOpen = useState<boolean>('project-panel-open', () => false)
watchEffect(() => {
  panelOpen.value = current.value !== null
})

// Mobile: the panel is a full-screen modal, so lock the page scroll behind it.
// Desktop (≥ md): it's a side panel, the page keeps scrolling.
watch(
  current,
  (project) => {
    if (!import.meta.client) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    document.body.style.overflow = project && isMobile ? 'hidden' : ''
  },
  { immediate: true },
)

// Back to the top of the panel when switching from one project to another
const panel = ref<HTMLElement | null>(null)
watch(
  () => current.value?.slug,
  async () => {
    await nextTick()
    panel.value?.scrollTo({ top: 0 })
  },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && current.value) closeProject()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  panelOpen.value = false
})
</script>

<!--
  Requirements: same as the home (Tailwind, @nuxt/icon + lucide, font-porpora / font-mattone).
  The navbar is fixed (h-16, see AppNavbar.vue) so this page reserves its own top space (pt-16).
-->
<template>
  <div class="bg-[#0E0E10] font-porpora text-white" :class="current ? 'md:flex md:items-start' : ''">
    <!-- ─── List ─────────────────────────────────────────────────────────── -->
    <div
      class="min-w-0 px-5 pt-16 md:px-8"
      :class="current ? 'md:w-1/2' : 'mx-auto w-full max-w-6xl'"
    >
      <!-- Hero (mobile only) -->
      <div
        class="-mx-5 relative h-[64vh] overflow-hidden bg-neutral-800 md:mx-0 md:rounded-lg md:mt-6"
      >
        <img
          v-if="heroImage"
          :src="heroImage"
          alt=""
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="h-full w-full bg-[url('../images/herologo.svg')] bg-center bg-cover bg-no-repeat"
          aria-hidden="true"
        />
        <p v-if="page.heroCredit" class="absolute bottom-2 right-3 text-[12px] text-white/80">{{ page.heroCredit }}</p>
      </div>

      <header class="pt-12 md:pt-14">
        <h1 class="font-mattone text-4xl md:text-5xl">{{ page.title }}</h1>
        <p class="mt-4 max-w-xs text-lg leading-snug md:max-w-sm md:text-xl">{{ page.intro }}</p>
      </header>

      <section class="mt-14 md:mt-28">
        <h2 class="font-mattone text-2xl md:text-3xl">{{ page.featuredTitle }}</h2>

        <ul class="mt-6 grid grid-cols-1 gap-6 md:gap-8" :class="current ? '' : 'md:grid-cols-2'">
          <li v-for="project in projects" :key="project.slug">
            <article class="group overflow-hidden rounded-md">
              <NuxtLink
                :to="{ query: { projet: project.slug } }"
                class="block bg-neutral-800"
                :aria-label="`${project.title} — ${project.subtitle}`"
              >
                <div class="aspect-[16/10] overflow-hidden md:aspect-[7/3]">
                  <img
                    v-if="project.cover"
                    :src="project.cover"
                    alt=""
                    loading="lazy"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div
                    v-else
                    class="h-full w-full bg-gradient-to-br from-[#6A4CF6] to-[#3F2D85]"
                    aria-hidden="true"
                  />
                </div>
              </NuxtLink>

              <!-- Tags straddle the image / body boundary -->
                <ul class="relative -top-3.5 z-20 flex h-0 items-start gap-2 px-4">
                    <li
                        v-for="tag in project.tags"
                        :key="tag"
                        class="whitespace-nowrap rounded-lg bg-[#EDF77C] px-2 py-1.5 text-sm leading-none text-[#0E0E10]"
                    >
                        {{ tag }}
                    </li>
                </ul>

              <div class="bg-gradient-to-b from-[#6A4CF6] to-[#3F2D85] px-4 py-10">
                <h3 class="font-mattone text-xl md:text-2xl">{{ project.title }}</h3>
                <p class="mt-1 font-mattone text-lg">{{ project.subtitle }}</p>
                <p class="mt-4 line-clamp-3 text-sm leading-snug">{{ project.excerpt }}</p>
                <p class="mt-4 text-sm leading-snug">
                  {{ project.date }}
                  <template v-if="project.credit"><br />{{ project.credit }}</template>
                </p>
                <NuxtLink
                  :to="{ query: { projet: project.slug } }"
                  class="mt-6 inline-block text-sm underline underline-offset-2"
                >
                  Voir le projet
                </NuxtLink>
              </div>
            </article>
          </li>
        </ul>
      </section>

      <!-- Contact CTA -->
      <section
        id="contact"
        class="relative -mx-5 overflow-hidden bg-[#0E0E10] px-5 py-20 text-center md:-mx-8 md:px-8 md:py-28"
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
            class="mt-5 inline-block rounded bg-[#C47CF7] px-4 py-1.5 text-md font-mattone text-[#0E0E10] transition hover:bg-[#F59BD3]"
          >
            {{ cta.label }}
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- ─── Opened project ────────────────────────────────────────────────
         Mobile : full-screen modal (fixed, covers the navbar)
         Desktop: sticky half-width panel on the right, full height -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-full md:translate-y-0 md:translate-x-full"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="translate-y-full md:translate-y-0 md:translate-x-full"
    >
      <aside
        v-if="current"
        ref="panel"
        role="dialog"
        :aria-label="`${current.title} — ${current.subtitle}`"
        class="fixed inset-0 z-50 overflow-y-auto bg-[#151517] md:sticky md:inset-auto md:top-0 md:z-30 md:h-screen md:w-1/2 md:shrink-0"
      >
        <!-- Close button: stays visible while the panel scrolls -->
        <div class="sticky top-0 z-20 h-0">
          <button
            type="button"
            class="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-black"
            aria-label="Fermer le projet"
            @click="closeProject"
          >
            <Icon name="lucide:x" class="size-5" />
          </button>
        </div>

        <div class="aspect-[4/3] overflow-hidden bg-neutral-800 md:aspect-[13/10]">
          <img
            v-if="current.cover"
            :src="current.cover"
            :alt="`${current.title} — ${current.subtitle}`"
            class="h-full w-full object-cover"
          />
          <div
            v-else
            class="h-full w-full bg-gradient-to-br from-[#6A4CF6] to-[#3F2D85]"
            aria-hidden="true"
          />
        </div>

        <ul class="relative -top-3.5 z-20 flex h-0 items-start gap-2 px-4">
          <li
            v-for="tag in current.tags"
            :key="tag"
            class="whitespace-nowrap rounded bg-[#EDF77C] px-2 py-1.5 text-sm leading-none text-[#0E0E10]"
          >
            {{ tag }}
          </li>
        </ul>

        <div class="px-4 pb-10 pt-10">
          <h2 class="font-mattone text-2xl">{{ current.title }}</h2>
          <p class="mt-1 font-mattone text-lg">{{ current.subtitle }}</p>
            <p class="mt-4 text-sm leading-snug">{{ current.excerpt }}</p>
          
          <p class="mt-5 text-sm leading-snug">
              {{ current.date }}
              <template v-if="current.credit"><br />{{ current.credit }}</template>
            </p>

            
        </div>
        <ProjectContent v-if="current.content.length" :blocks="current.content" class="px-4 py-6 bg-black"/>
        <p v-else-if="current.excerpt" class="mt-5 text-sm leading-snug">{{ current.excerpt }}</p>
      </aside>
    </Transition>
  </div>
</template>