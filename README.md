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
| Nuxt | `nuxt/.env` | `NUXT_STRAPI_URL` (server-side) | `http://localhost:1337` |
| Nuxt | `nuxt/.env` | `NUXT_PUBLIC_STRAPI_URL` (browser) | `http://localhost:1337` |
| Strapi | `strapi/.env` | `HOST`, `PORT`, `APP_KEYS`, ... | generated on scaffold |

Copy `nuxt/.env.example` to `nuxt/.env` if you need to override the Strapi URL. Strapi already has a generated `strapi/.env` (SQLite database at `strapi/.tmp/data.db`).

The project categories, projects and project content are read from Strapi. Two URLs are used so the app can run in separate containers later:

- `NUXT_STRAPI_URL` is used by the Nuxt server for SSR requests and can point to an internal address (e.g. `http://strapi:1337`).
- `NUXT_PUBLIC_STRAPI_URL` is sent to the browser for client-side requests and `/uploads/...` media, so it must be a publicly reachable URL (e.g. `https://api.example.com`).

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

## Docker deployment

The repository includes a production-oriented Docker Compose setup:

```text
.
├── docker-compose.yml       # Strapi + Nuxt + Caddy
├── Caddyfile                # HTTPS reverse proxy for the two hostnames
├── .env.example             # Compose secrets and public URLs
├── nuxt/Dockerfile          # Builds the standalone Nuxt server
├── strapi/Dockerfile        # Builds the Strapi admin + server
└── strapi/docker-entrypoint.sh
```

The default database is **SQLite**, which keeps the existing local content and
does not require a separate database service. Data is stored outside the
containers:

- `data/strapi/db/data.db` — SQLite database
- `data/strapi/uploads/` — uploaded media

Both directories are ignored by git and must be backed up.

### Requirements

- A Linux server with Docker Engine and the Docker Compose plugin
- Two DNS records pointing to the server:
  - `nellvand.fr` (or your main domain)
  - `api.nellvand.fr` (or your API subdomain)
- Inbound TCP ports `80` and `443` open
- Enough RAM for the Strapi admin build (about 1.5 GB). On a smaller VPS, add
  swap or build the images on another machine and push them to a registry.

Caddy obtains and renews TLS certificates automatically. Start the stack only
after the DNS records resolve to the server.

### First deployment

1. Copy the environment template and fill in the production values:

   ```bash
   cp .env.example .env
   ```

   At minimum, change `DOMAIN`, `API_DOMAIN`, `NUXT_PUBLIC_STRAPI_URL`,
   `PUBLIC_URL`, `CORS_ORIGINS`, and all Strapi secrets. Generate each secret
   with:

   ```bash
   openssl rand -base64 32
   ```

   `APP_KEYS` must contain four comma-separated values. Keep the generated
   `.env` private.

2. Create the data directories on the server, then copy the existing local
   content (optional but recommended if you already have projects in Strapi):

   ```bash
   # On the server, from the repository root
   mkdir -p data/strapi/db data/strapi/uploads
   ```

   ```bash
   # From your local machine, with the local Strapi server stopped
   rsync -avz strapi/.tmp/data.db user@server:/srv/portfolio/data/strapi/db/
   rsync -avz strapi/public/uploads/ user@server:/srv/portfolio/data/strapi/uploads/
   ```

   Adjust `/srv/portfolio` to the actual path of the repository on the server.
   On a fresh install without copied content, Strapi creates an empty database
   and you can create the first admin account at `https://api.nellvand.fr/admin`.
   In that case, also grant the Public role `find`/`findOne` permissions for
   `project-category`, `project`, and `tag`, otherwise the Nuxt pages will stay
   empty. If you copied the existing database, change the Strapi admin password
   after the first production login.

3. Build and start everything:

   ```bash
   docker compose up -d --build
   ```

4. Follow the startup logs:

   ```bash
   docker compose logs -f strapi
   docker compose logs -f nuxt
   ```

5. Open:

   - Portfolio: `https://nellvand.fr`
   - Strapi admin: `https://api.nellvand.fr/admin`

### Updating

```bash
git pull
docker compose build --pull
docker compose up -d
```

Strapi's admin panel is built inside the Docker image, so there is no separate
admin build step on the server. Existing SQLite data and uploads stay in
`data/strapi`.

### Backups and restore

The whole runtime state is contained in `data/strapi`. Stop Strapi briefly so
the SQLite file is consistent:

```bash
docker compose stop strapi
tar -czf "backup-$(date +%F-%H%M).tar.gz" data/strapi
docker compose start strapi
```

Keep a separate copy of `.env` in a safe place: it contains the Strapi secrets
and is not included in the `data/strapi` backup.

To restore:

```bash
docker compose down
tar -xzf backup-YYYY-MM-DD-HHMM.tar.gz
docker compose up -d
```

The Strapi entrypoint fixes ownership of the data directories at startup, so
the container can keep running as the unprivileged `node` user.

### Configuration notes

- `NUXT_STRAPI_URL=http://strapi:1337` is used by the Nuxt server inside the
  Docker network.
- `NUXT_PUBLIC_STRAPI_URL` and `PUBLIC_URL` must use the public API URL
  (`https://api.nellvand.fr`). The browser uses it for API requests and
  `/uploads/...` media.
- `CORS_ORIGINS` must contain the public frontend origin
  (`https://nellvand.fr`). Add `https://www.nellvand.fr` only if you also
  configure that hostname in Caddy and DNS.
- If Cloudflare proxies the domain, set SSL/TLS mode to **Full (strict)**.
  Caddy can still obtain its certificate through the HTTP-01 challenge. If
  HTTP validation is blocked, use Cloudflare DNS-only for the initial
  certificate issuance or configure a DNS challenge in Caddy.
- If you already run a reverse proxy on the host, remove the `caddy` service
  from `docker-compose.yml`, publish the Nuxt and Strapi ports on localhost
  instead, and point your proxy at them.
- On an SELinux-enabled host, append `:Z` to the two Strapi bind mounts
  (`./data/strapi/db:/app/.tmp:Z` and
  `./data/strapi/uploads:/app/public/uploads:Z`).

### Troubleshooting

- Validate the rendered Compose configuration and required variables with:

  ```bash
  docker compose config
  ```

- If HTTPS fails, check DNS propagation and Caddy's logs:

  ```bash
  docker compose logs -f caddy
  ```

- If the site is empty, check Strapi first:

  ```bash
  docker compose logs -f strapi
  docker compose logs -f nuxt
  ```

- If images return 404, verify that `NUXT_PUBLIC_STRAPI_URL` and `PUBLIC_URL`
  use the public API hostname and that `data/strapi/uploads` contains the
  expected files.

### Switching to PostgreSQL later

SQLite is the safe default for this single-instance portfolio because the
existing content is already in `strapi/.tmp/data.db`. For multiple Strapi
instances or higher write concurrency, switch to PostgreSQL:

1. Add the `pg` dependency to `strapi/package.json`.
2. Add a PostgreSQL service with a persistent volume to `docker-compose.yml`.
3. Set `DATABASE_CLIENT=postgres`, `DATABASE_HOST=db`,
   `DATABASE_NAME`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD`.
4. Export the SQLite content with Strapi's data-transfer commands and import
   it into the new database before switching traffic.

Do not switch the database without migrating the existing content first.
