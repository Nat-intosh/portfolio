<script setup lang="ts">
import type { StrapiMedia } from '~/composables/useProjectCategories'

const props = defineProps<{
  media: StrapiMedia
  alt?: string
}>()

const mediaUrl = useStrapiMedia()
const kind = computed(() => strapiMediaKind(props.media.mime))
</script>

<template>
  <img
    v-if="kind === 'image'"
    :src="mediaUrl(media, 'large')"
    :alt="alt || media.name"
    loading="lazy"
    class="w-full bg-neutral-900 object-cover"
  />
  <video
    v-else-if="kind === 'video'"
    :src="mediaUrl(media)"
    controls
    class="w-full bg-black"
  />
  <audio
    v-else-if="kind === 'audio'"
    :src="mediaUrl(media)"
    controls
    class="w-full"
  />
  <a
    v-else
    :href="mediaUrl(media)"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center gap-2 underline underline-offset-2"
  >
    <Icon name="lucide:paperclip" class="size-4 shrink-0" />
    {{ media.name }}
  </a>
</template>
