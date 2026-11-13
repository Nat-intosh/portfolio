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

The repository includes a production Docker Compose setup designed to sit
behind the existing **Nginx Proxy Manager** container (`npm-app-1`). NPM
handles the public hostnames, TLS certificates and ports `80`/`443`. The Nuxt
and Strapi containers join NPM's Docker network and are **not** published on
the host.

```text
.
├── docker-compose.yml       # Strapi + Nuxt, attached to NPM's Docker network
├── .env.example             # Compose secrets, public URLs and NPM network
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
- Nginx Proxy Manager already running in Docker (`npm-app-1`)
- Two DNS records pointing to the NPM server:
  - `nellvand.fr` (or your main domain)
  - `api.nellvand.fr` (or your API subdomain)
- Enough RAM for the Strapi admin build (about 1.5 GB). On a smaller VPS, add
  swap or build the images on another machine and push them to a registry.

### NPM network

The container name `npm-app-1` means the NPM Compose project is named `npm`, so
its default network is normally `npm_default`. Verify it with:

```bash
docker inspect npm-app-1 \
  --format '{{range $name, $_ := .NetworkSettings.Networks}}{{$name}}{{"\n"}}{{end}}'
```

If the output is not `npm_default`, set the real name in `.env`:

```env
NPM_NETWORK=the_real_network_name
```

### First deployment

1. Copy the environment template and fill in the production values:

   ```bash
   cp .env.example .env
   ```

   At minimum, change `NUXT_PUBLIC_STRAPI_URL`, `PUBLIC_URL`, `CORS_ORIGINS`,
   `NPM_NETWORK` if needed, and all Strapi secrets. Generate each secret with:

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

4. Verify that both containers joined NPM's network:

   ```bash
   docker network inspect npm_default \
     --format '{{range .Containers}}{{.Name}} {{end}}'
   ```

   Replace `npm_default` with your `NPM_NETWORK` value if it is different. You
   should see the Strapi and Nuxt containers in the list.

5. Configure Nginx Proxy Manager:

   | Setting | Main site | API |
   | --- | --- | --- |
   | Domain Names | `nellvand.fr` | `api.nellvand.fr` |
   | Scheme | `http` | `http` |
   | Forward Hostname / IP | `nuxt` | `strapi` |
   | Forward Port | `3000` | `1337` |
   | Websockets Support | optional | optional |
   | Block Common Exploits | on | on |
   | SSL | request a new Let's Encrypt certificate | same |
   | Force SSL | on | on |
   | HTTP/2 Support | on | on |

   NPM resolves the Docker service names `nuxt` and `strapi` on the shared
   network. No host port is needed.

6. Open:

   - Portfolio: `https://nellvand.fr`
   - Strapi admin: `https://api.nellvand.fr/admin`

### If NPM cannot reach the containers

- Confirm `NPM_NETWORK` matches the network printed by `docker inspect`.
- Confirm both stacks are running: `docker compose ps`.
- Confirm the containers appear in
  `docker network inspect <network> --format '{{range .Containers}}{{.Name}} {{end}}'`.
- As a fallback, use the full container names `portfolio-nuxt-1` and
  `portfolio-strapi-1` in NPM instead of the service names.

The `PROXY=true` value is already set in `docker-compose.yml`, so Strapi trusts
the `X-Forwarded-*` headers sent by NPM.

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
  configure that hostname in DNS and NPM.
- NPM is the only public entry point. The Nuxt and Strapi containers have no
  published host ports.
- If Cloudflare proxies the domain, set SSL/TLS mode to **Full (strict)**.
  Cloudflare connects to NPM, and NPM terminates the certificate from Let's
  Encrypt.
- On an SELinux-enabled host, append `:Z` to the two Strapi bind mounts
  (`./data/strapi/db:/app/.tmp:Z` and
  `./data/strapi/uploads:/app/public/uploads:Z`).

### Troubleshooting

- Validate the rendered Compose configuration and required variables with:

  ```bash
  docker compose config
  ```

- Check container status:

  ```bash
  docker compose ps
  ```

- If NPM returns `502 Bad Gateway`, verify that `NPM_NETWORK` is correct and
  that NPM can resolve `nuxt` and `strapi` on that network.
- If the API works but the browser shows CORS errors, check
  `CORS_ORIGINS` and restart Strapi.
- If images return 404, verify that `NUXT_PUBLIC_STRAPI_URL` and `PUBLIC_URL`
  use the public API hostname and that `data/strapi/uploads` contains the
  expected files.
- Inspect container logs with:

  ```bash
  docker compose logs -f strapi
  docker compose logs -f nuxt
  ```

### Switching to PostgreSQL later

SQLite is the safe default for this single-instance portfolio because the
existing content is already in `strapi/.tmp/data.db`. For multiple Strapi
instances or higher write concurrency, switch to PostgreSQL:

1. Add the `pg` dependency to `strapi/package.json`.
2. Add a PostgreSQL service with a persistent volume to `docker-compose.yml`.
3. Set `DATABASE_CLIENT=postgres`, `DATABASE_HOST=db`,
   `DATABASE_NAME`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` in `.env`.
4. Export the SQLite content with Strapi's data-transfer commands and import
   it into the new database before switching traffic.

Do not switch the database without migrating the existing content first.
