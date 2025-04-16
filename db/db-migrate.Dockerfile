FROM node:22-alpine AS base

RUN corepack enable && corepack install -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
COPY package.json  .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --offline --frozen-lockfile
COPY drizzle.config.ts .
COPY src/db/schema.ts src/db/schema.ts
CMD ["pnpm", "push"]
