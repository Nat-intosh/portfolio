<script setup lang="ts">
import type { NuxtError } from '#app'
import errorImage from '~/assets/images/error.png'

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error.statusCode || 500)
const is404 = computed(() => statusCode.value === 404)

const title = computed(() =>
  is404.value
    ? 'Mes projets commencent souvent avec une feuille et un crayon'
    : 'Mes projets commencent souvent avec une feuille et un crayon',
)

const message = computed(() =>
  is404.value
    ? "Cette page est probablement écrite dans un carnet quelque part, mais elle n'est pas encore ici."
    : "Cette page est probablement écrite dans un carnet quelque part, mais elle n'est pas encore ici.",
)

useSeoMeta({
  title: () => `Erreur ${statusCode.value} — Nell Vandaele`,
  robots: 'noindex',
})

function goHome() {
  clearError({ redirect: '/' })
}

function goToContact() {
  clearError({ redirect: '/contact' })
}
</script>

<template>
  <div class="grid min-h-screen bg-[#0E0E10] font-porpora text-white md:grid-cols-2">
    <!-- Photo: on top on mobile, on the right on desktop -->
    <div class="relative h-[38vh] md:order-2 md:h-auto">
      <img
        :src="errorImage"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <!-- Text -->
    <main class="flex items-center px-5 py-14 md:order-1 md:px-[6%] md:py-0">
      <div class="max-w-md">
        
        <h1 class="mt-4 font-mattone text-2xl leading-snug md:text-3xl md:leading-snug">
          {{ title }}
        </h1>
        
        <p class="mt-8 text-lg leading-snug text-white md:text-xl md:leading-snug">
          {{ message }}
        </p>
        <p class="mt-8 text-lg leading-snug text-white md:text-xl md:leading-snug">Erreur {{ statusCode }}</p>

        <p class="mt-8 text-lg leading-snug md:text-xl md:leading-snug">
          Votre futur projet passera forcément par un de mes carnets !
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-block rounded bg-[#C47CF7] px-4 py-2 font-mattone text-sm text-[#0E0E10] transition hover:bg-[#F59BD3]"
            @click="goHome"
          >
            Retour à l’accueil
          </button>

          <button
            type="button"
            class="inline-block rounded border border-white/30 px-4 py-2 font-mattone text-sm text-white transition hover:border-white/60 hover:bg-white/10"
            @click="goToContact"
          >
            Me contacter
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
