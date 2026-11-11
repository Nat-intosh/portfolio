# Portfolio

Monorepo for a portfolio website built with **Nuxt 4** (frontend) and **Strapi 5** (headless CMS), styled with **Tailwind CSS 4**.

## Structure

```
portfolio/
├── nuxt/     # Nuxt 4 frontend (port 3000)
└── strapi/   # Strapi 5 CMS + REST API (port 1337)
```

## Requirements

- Node.js >= 24.15.0 (required by Nuxt 4.6)
- npm >= 11

## Getting started

Dependencies are already installed. From the repository root:

```bash
npm run dev
```

This starts both apps together:

- Nuxt: http://localhost:3000
- Strapi admin: http://localhost:1337/admin

On the first Strapi launch, create your admin account at the admin URL.

You can also run them separately in two terminals:

```bash
npm run dev:strapi   # Strapi on :1337
npm run dev:nuxt     # Nuxt on :3000
```

## Environment

| App | File | Variable | Default |
| --- | --- | --- | --- |
| Nuxt | `nuxt/.env` | `NUXT_PUBLIC_STRAPI_URL` | `http://localhost:1337` |
| Strapi | `strapi/.env` | `HOST`, `PORT`, `APP_KEYS`, ... | generated on scaffold |

Copy `nuxt/.env.example` to `nuxt/.env` if you need to override the Strapi URL. Strapi already has a generated `strapi/.env` (SQLite database at `strapi/.tmp/data.db`).

## Build

```bash
npm run build          # builds Strapi then Nuxt
npm run build:strapi
npm run build:nuxt
```

## Useful Strapi commands

```bash
npm --prefix strapi run strapi -- --help   # Strapi CLI
npm --prefix strapi run console            # Strapi REPL
```
