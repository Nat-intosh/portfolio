<script setup lang="ts">
const { data: categories } = useProjectCategories()

interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const footerColumns = computed<FooterColumn[]>(() => [
  {
    title: 'Accueil',
    links: [
        { label: "Page d'accueil", to: '/' },
      // Project categories are managed in Strapi.
      ...categories.value.map((category) => ({
        label: category.title,
        to: `/${strapiSlug(category.title)}`,
      })),
    ],
  },
  {
    title: 'Outils',
    links: [
      { label: 'Fiche tech builder', to: '/outils/fiche-tech-builder' },
      { label: 'Documents techniques', to: '/outils/documents-techniques' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contactez-moi', to: '/contact' },
    ],
  },
  {
    title: 'Informations légales',
    links: [
      { label: 'Politique de confidentialité', to: '/confidentiality' },
      { label: 'Mentions légales', to: '/legal' },
    ],
  },
])

const nameBox = ref<HTMLElement | null>(null)  // the <p>, as wide as the white container
const nameText = ref<HTMLElement | null>(null) // the <span>, as wide as the text
let resizeObserver: ResizeObserver | null = null

function fitName() {
  const box = nameBox.value
  const text = nameText.value
  if (!box || !text) return

  // Measure at a known size, then scale linearly
  const REF = 100
  text.style.fontSize = `${REF}px`
  const textWidthPerPx = text.getBoundingClientRect().width / REF
  text.style.fontSize = `${box.clientWidth / textWidthPerPx}px`
}

onMounted(() => {
  fitName()
  document.fonts.ready.then(fitName) // re-fit once Mattone has loaded
  resizeObserver = new ResizeObserver(fitName)
  if (nameBox.value) resizeObserver.observe(nameBox.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>
<template>
    <footer class="overflow-hidden text-[#0E0E10] font-porpora bg-white">
            <div class="max-w-6xl mx-auto bg-white md:rounded-tl-xl md:rounded-tr-xl mask-clip-padding">
                <p ref="nameBox" class="select-none" aria-hidden="true">
                    <span
                    ref="nameText"
                    class="block w-fit -mt-2 md:-mt-3 whitespace-nowrap font-mattone text-[12vw] font-bold leading-[0.9] tracking-tight"
                    >
                    Nell Vandaele
                    </span>
                </p>

                <div class="mx-auto w-full max-w-6xl px-5 pb-8 pt-10 md:px-2 ">
                <nav class="grid grid-cols-2 gap-8 md:max-w-6xl md:grid-cols-4 md:gap-12">
                    <div v-for="col in footerColumns" :key="col.title">
                    <h2 class="text-[14px] font-medium uppercase tracking-wide">{{ col.title }}</h2>
                    <ul class="mt-2 space-y-1 text-[13px]">
                        <li v-for="link in col.links" :key="link.label">
                        <NuxtLink
                            :to="link.to"
                            :external="link.external"
                            :target="link.external ? '_blank' : undefined"
                            :rel="link.external ? 'noopener' : undefined"
                            class="hover:underline"
                        >
                            {{ link.label }}
                        </NuxtLink>
                        </li>
                    </ul>
                    </div>
                </nav>

                
                <div
                    class="mx-auto mt-8 h-[32px] md:h-[64px] bg-no-repeat overflow-hidden bg-[url('../images/logo.svg')] bg-center bg-contain md:mx-0 md:rounded-lg"
                >
                </div>
            </div>
        </div>
    </footer>
</template>