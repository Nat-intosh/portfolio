export interface StrapiMediaFormat {
  url: string
  width?: number
  height?: number
}

export interface StrapiMedia {
  id: number
  name: string
  url: string
  mime: string
  width?: number | null
  height?: number | null
  formats?: Record<string, StrapiMediaFormat> | null
}

export interface StrapiTag {
  id: number
  name: string
}

/**
 * A Strapi dynamic-zone block (`content_zone`). Fields are optional because
 * each `__component` only fills its own subset.
 */
export interface ProjectContentBlock {
  id: number
  __component:
    | 'project.text'
    | 'project.single-media'
    | 'project.multiple-medias'
    | 'project.attached-files'
    | 'project.embed'
  text?: string | null
  type?: 'heading' | 'paragraph' | 'button' | null
  link?: string | null
  media?: StrapiMedia | null
  medias?: StrapiMedia[] | null
  attached_media?: StrapiMedia[] | null
  attached_name?: string | null
  code?: string | null
}

export interface StrapiProject {
  id: number
  documentId: string
  name: string | null
  client: string | null
  description: string | null
  date: string | null
  cover: StrapiMedia | null
  cover_credit: string | null
  tags?: StrapiTag[]
  content_zone?: ProjectContentBlock[]
}

export interface ProjectCategory {
  id: number
  documentId: string
  title: string
  subtitle: string | null
  image: StrapiMedia | null
  image_credit: string | null
  projects?: StrapiProject[]
}

interface StrapiCollection<T> {
  data: T[]
}

/**
 * Fetch the project categories, with their projects and the full content of
 * each project (cover, tags and dynamic-zone media).
 *
 * The same key is used everywhere so Nuxt dedupes the request and shares the
 * SSR payload between the pages, the footer and client-side navigations.
 */
export function useProjectCategories() {
  const config = useRuntimeConfig()

  // In a containerised setup the Nuxt server usually reaches Strapi through
  // an internal URL (e.g. http://strapi:1337) while the browser must use the
  // public one (e.g. https://api.example.com).
  const baseURL = import.meta.server ? config.strapiUrl : config.public.strapiUrl

  return useAsyncData<ProjectCategory[]>(
    'project-categories',
    async () => {
      const response = await $fetch<StrapiCollection<ProjectCategory>>(
        '/api/project-categories',
        {
          baseURL,
          query: {
            'populate[image]': 'true',
            'populate[projects][populate][cover]': 'true',
            'populate[projects][populate][tags]': 'true',
            // `populate=*` only goes one level deep: the media inside the
            // content_zone components have to be populated explicitly.
            'populate[projects][populate][content_zone][populate]': '*',
          },
        },
      )

      return response.data
    },
    {
      default: () => [],
    },
  )
}

/**
 * Build an absolute URL for a Strapi upload. Always uses the *public* Strapi
 * URL so the browser can load the file even when SSR uses an internal URL.
 */
export function useStrapiMedia() {
  const config = useRuntimeConfig()
  const base = String(config.public.strapiUrl || '').replace(/\/+$/, '')

  return (
    media?: StrapiMedia | null,
    format?: 'thumbnail' | 'small' | 'medium' | 'large',
  ): string => {
    if (!media) return ''

    const path = (format && media.formats?.[format]?.url) || media.url
    if (!path) return ''

    return /^https?:\/\//i.test(path) ? path : `${base}${path}`
  }
}
