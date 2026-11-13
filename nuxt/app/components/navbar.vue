<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

// Set by pages/technique.vue while a project is open. On desktop the project
// takes the right half of the screen, so the bar shrinks to the left half.
const projectPanelOpen = useState<boolean>('project-panel-open', () => false)

const { data: categories } = useProjectCategories()

// Project categories are managed in Strapi; the other entries stay static.
const links = computed(() => [
  { label: 'Accueil', to: '/' },
  ...categories.value.map((category) => ({
    label: category.title,
    to: `/${strapiSlug(category.title)}`,
  })),
  { label: 'Outils', to: '/outils/fiche-tech-builder' },
  { label: 'Contact', to: '/contact' },
])

// Close the menu on navigation (including opening / closing a project)
watch(() => route.fullPath, () => (menuOpen.value = false))
</script>

<template>
  <header
  class="fixed left-0 top-0 z-40 w-full bg-white font-porpora text-black transition-[width] duration-300"
  :class="projectPanelOpen ? 'md:w-1/2' : ''"
>
  <div
    class="flex h-16 items-center justify-between px-5 md:px-8"
    :class="!projectPanelOpen ? 'mx-auto max-w-6xl' : ''"
  >
    <NuxtLink to="/" class="flex items-center gap-4">
      <!-- Added explicit width so the background SVG renders -->
      <div
        class="h-6 w-6 shrink-0 overflow-hidden bg-[url('../images/logo.svg')] fill-black bg-contain bg-center bg-no-repeat md:h-8 md:w-8"
      ></div>
      <h1 class="font-mattone text-xl font-bold">Nell Vandaele</h1>
    </NuxtLink>

    <button
      type="button"
      class="grid size-9 place-items-center"
      :aria-expanded="menuOpen"
      aria-controls="main-menu"
      :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      @click="menuOpen = !menuOpen"
    >
      <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="size-6 fill-black" />
    </button>
  </div>

  <nav
    v-if="menuOpen"
    id="main-menu"
    class="border-t border-black/10 px-5 pb-5 pt-3 md:px-8"
    :class="!projectPanelOpen ? 'mx-auto max-w-6xl' : ''"
  >
    <ul class="space-y-2">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="block py-1 text-lg hover:underline"
          active-class="font-bold underline"
          exact-active-class="font-bold underline"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</header>
</template>