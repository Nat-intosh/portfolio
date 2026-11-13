<script setup lang="ts">
defineProps<{
  title: string
  description: string
  updated: string
}>()
</script>

<template>
  <div class="min-h-screen bg-[#0E0E10] font-porpora text-white">
    <main class="mx-auto w-full max-w-4xl px-5 pb-24 pt-16 md:px-8">

      <header class="mt-8 border-b border-white/15 pb-8 md:mt-12">
        <p class="text-s text-white/80">Informations légales</p>
        <h1 class="mt-3 font-mattone text-4xl leading-tight md:text-5xl">{{ title }}</h1>
        <p class="mt-4 max-w-2xl text-lg leading-snug text-white/80">{{ description }}</p>
        <p class="mt-6 text-sm text-white/50">Dernière mise à jour : {{ updated }}</p>
      </header>

      <article class="legal-content mt-10">
        <slot />
      </article>

      <footer class="mt-16 border-t border-white/15 pt-6 text-sm text-white/60">
        <NuxtLink to="/legal" class="underline underline-offset-2 transition hover:text-white">
          Mentions légales
        </NuxtLink>
        <span class="mx-2" aria-hidden="true">·</span>
        <NuxtLink to="/confidentiality" class="underline underline-offset-2 transition hover:text-white">
          Politique de confidentialité
        </NuxtLink>
        <span class="mx-2" aria-hidden="true">·</span>
        <NuxtLink to="/contact" class="underline underline-offset-2 transition hover:text-white">
          Contact
        </NuxtLink>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.legal-content :deep(h2) {
  margin-top: 2.5rem;
  font-family: var(--font-mattone);
  font-size: 1.5rem;
  line-height: 1.2;
  color: white;
}

.legal-content :deep(h2:first-child) {
  margin-top: 0;
}

.legal-content :deep(h3) {
  margin-top: 1.75rem;
  font-family: var(--font-mattone);
  font-size: 1.125rem;
  line-height: 1.3;
  color: white;
}

.legal-content :deep(p) {
  margin-top: 0.75rem;
  line-height: 1.7;
}

.legal-content :deep(ul) {
  margin-top: 0.75rem;
  padding-left: 1.25rem;
  list-style: disc;
}

.legal-content :deep(li) {
  margin-top: 0.35rem;
  line-height: 1.6;
}

.legal-content :deep(a) {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.legal-content :deep(strong) {
  color: white;
  font-weight: 600;
}

.legal-content :deep(table) {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.legal-content :deep(th),
.legal-content :deep(td) {
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.15);
  text-align: left;
  vertical-align: top;
}

.legal-content :deep(th) {
  color: white;
  font-weight: 600;
}

.legal-content :deep(code) {
  font-size: 0.85em;
  word-break: break-word;
}
</style>
