# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Build the Nuxt server bundle
# ---------------------------------------------------------------------------
FROM node:24.15-bookworm-slim AS build

WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Runtime: only the standalone Nitro output is needed
# ---------------------------------------------------------------------------
FROM node:24.15-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NUXT_TELEMETRY_DISABLED=1
ENV HOME=/home/node

COPY --from=build --chown=node:node /app/.output ./.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
