<script setup lang="ts">
import type { ProjectContentBlock } from '~/composables/useProjectCategories'

defineProps<{
  blocks: ProjectContentBlock[]
}>()

const mediaUrl = useStrapiMedia()
</script>

<template>
  <div class="">
  <div class="mt-5 space-y-8 text-sm leading-snug">
    <template v-for="block in blocks" :key="`${block.__component}-${block.id}`">
      <!-- Text: heading / paragraph / button -->
      <template v-if="block.__component === 'project.text'">
        <h3 v-if="block.type === 'heading' && block.text" class="font-mattone text-xl">
          {{ block.text }}
        </h3>
        <p v-else-if="block.type === 'paragraph' && block.text" class="whitespace-pre-line">
          {{ block.text }}
        </p>
        <a
          v-else-if="block.type === 'button' && block.text"
          :href="block.link || '#'"
          target="_blank"
          rel="noopener"
          class="block underline whitespace-pre-line underline-offset-2"
        >
          {{ block.text }}
        </a>
      </template>

      <!-- One image / video / audio / file -->
      <MediaFile
        v-else-if="block.__component === 'project.single-media' && block.media"
        class="max-h-screen"
        :media="block.media"
      />

      <!-- Media gallery -->
      <div
        v-else-if="block.__component === 'project.multiple-medias' && block.medias?.length"
        class="space-y-4"
      >
        <MediaFile v-for="media in block.medias" :key="media.id" :media="media" />
      </div>

      <!-- Downloadable attachments -->
      <div
        v-else-if="block.__component === 'project.attached-files' && block.attached_media?.length"
      >
        <p v-if="block.attached_name" class="font-mattone text-base">
          {{ block.attached_name }}
        </p>
        <ul class="mt-2 space-y-1">
          <li v-for="media in block.attached_media" :key="media.id">
            <a
              :href="mediaUrl(media)"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 underline underline-offset-2"
            >
              <Icon name="lucide:paperclip" class="size-4 shrink-0" />
              {{ media.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Raw embed (iframe, script, …) authored in Strapi -->
      <div
        v-else-if="block.__component === 'project.embed' && block.code"
        class="overflow-hidden [&_iframe]:max-w-full"
        v-html="block.code"
      />
    </template>
  </div>
  </div>
</template>
