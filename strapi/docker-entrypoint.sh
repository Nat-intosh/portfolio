#!/bin/sh
set -eu

# Bind mounts are created by Docker/the host and may be owned by root. Make
# sure the unprivileged `node` user can write the SQLite database and uploads.
mkdir -p /app/.tmp /app/public/uploads
chown -R node:node /app/.tmp /app/public/uploads

exec gosu node "$@"
