/**
 * Small helpers shared by every page that consumes Strapi data.
 * Kept framework-agnostic so they are usable on both server and client.
 */

/** Turn a Strapi string into a URL-friendly slug ("Médusyne" -> "medusyne"). */
export function strapiSlug(value?: string | null): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Format a Strapi date ("2026-09-08") as "Septembre 2026". */
export function formatStrapiDate(value?: string | null): string {
  if (!value) return ''

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value

  const label = new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  }).format(date)

  return label.charAt(0).toUpperCase() + label.slice(1)
}

/** Classify a Strapi file so the templates can pick the right tag. */
export function strapiMediaKind(mime?: string | null): 'image' | 'video' | 'audio' | 'file' {
  if (!mime) return 'file'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  return 'file'
}
