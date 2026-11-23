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
      link: [{ rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }],
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:site_name', content: 'Nell Vandaele' },
        {
          property: 'og:image',
          content: 'https://nellvand.fr/og-image.png',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://nellvand.fr/og-image.png',
        },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content:
            'Nell Vandaele — technicien·ne son & lumière, vidéo, design et web à Bordeaux',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://nellvand.fr/og-image.png' },
        {
          name: 'twitter:image:alt',
          content:
            'Nell Vandaele — technicien·ne son & lumière, vidéo, design et web à Bordeaux',
        },
      ],
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
