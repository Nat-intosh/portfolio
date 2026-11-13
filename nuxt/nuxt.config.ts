// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    mode: 'svg',
    serverBundle: {
      collections: ['lucide'],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    // Server-side URL: in Docker this can be the internal service name,
    // e.g. NUXT_STRAPI_URL=http://strapi:1337
    strapiUrl: 'http://localhost:1337',
    public: {
      // URL used by the browser (API calls + uploaded media), so it must be
      // reachable from outside the Docker network.
      strapiUrl: 'http://localhost:1337',
    },
  },
})
