# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Build the Strapi admin and compile the server code
# ---------------------------------------------------------------------------
FROM node:24.15-bookworm-slim AS build

WORKDIR /app

ENV NODE_ENV=production
ENV STRAPI_TELEMETRY_DISABLED=1

# Native build tools are needed by better-sqlite3 and other native modules.
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

COPY . .
RUN npm run build \
    && npm prune --omit=dev

# ---------------------------------------------------------------------------
# Runtime
# ---------------------------------------------------------------------------
FROM node:24.15-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV STRAPI_TELEMETRY_DISABLED=1
ENV HOME=/home/node

# gosu lets the entrypoint keep the bind-mounted data directories writable and
# then drop privileges before starting Strapi.
RUN apt-get update \
    && apt-get install -y --no-install-recommends gosu ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build --chown=node:node /app /app

COPY --chown=root:root docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && mkdir -p /app/.tmp /app/public/uploads \
    && chown -R node:node /app/.tmp /app/public/uploads

EXPOSE 1337

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
