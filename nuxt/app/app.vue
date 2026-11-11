<script setup lang="ts">
const config = useRuntimeConfig()

const { data: strapiStatus } = await useFetch<{ status: string }>('/_health', {
  baseURL: config.public.strapiUrl,
  server: false,
  lazy: true,
  retry: 0,
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <span class="text-lg font-semibold tracking-tight">Portfolio</span>
      <span
        class="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400"
      >
        <span
          class="h-2 w-2 rounded-full"
          :class="strapiStatus ? 'bg-emerald-400' : 'bg-rose-500'"
        />
        Strapi {{ strapiStatus ? 'online' : 'offline' }}
      </span>
    </header>

    <main class="mx-auto flex max-w-5xl flex-col gap-12 px-6 pb-24 pt-16">
      <section class="flex flex-col gap-6">
        <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Nuxt 4, Strapi 5 &amp; Tailwind CSS 4
        </h1>
        <p class="max-w-2xl text-lg text-slate-400">
          A clean starting point for your portfolio: a Nuxt frontend, a Strapi
          headless CMS and Tailwind for styling.
        </p>
      </section>

      <section class="grid gap-4 sm:grid-cols-3">
        <article class="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 class="font-semibold">Nuxt</h2>
          <p class="mt-2 text-sm text-slate-400">
            Vue framework with file-based routing, auto-imports and server
            rendering.
          </p>
          <a
            class="mt-4 inline-block text-sm text-emerald-400 hover:underline"
            href="https://nuxt.com/docs"
            target="_blank"
            rel="noreferrer"
          >Documentation →</a>
        </article>

        <article class="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 class="font-semibold">Strapi</h2>
          <p class="mt-2 text-sm text-slate-400">
            Headless CMS running on port 1337 with an admin panel and REST API.
          </p>
          <a
            class="mt-4 inline-block text-sm text-emerald-400 hover:underline"
            :href="`${config.public.strapiUrl}/admin`"
            target="_blank"
            rel="noreferrer"
          >Open admin →</a>
        </article>

        <article class="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 class="font-semibold">Tailwind CSS</h2>
          <p class="mt-2 text-sm text-slate-400">
            Utility-first CSS wired through the official Vite plugin.
          </p>
          <a
            class="mt-4 inline-block text-sm text-emerald-400 hover:underline"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noreferrer"
          >Documentation →</a>
        </article>
      </section>
    </main>
  </div>
</template>
