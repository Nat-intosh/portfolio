<script setup lang="ts">
const route = useRoute()

// Project categories drive the pages and the footer links, so fetch them once
// for the whole app. Pages reuse the same `useAsyncData` key, which means no
// duplicate request and a single SSR payload.
await useProjectCategories()
</script>

<template>
  <Navbar v-if="route.meta.navbar !== false" />
  <NuxtPage />

  <Footer />
</template>
