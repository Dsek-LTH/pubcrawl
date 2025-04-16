FROM node:22-alpine AS base

RUN corepack enable
WORKDIR /app
COPY package.json  .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --offline --frozen-lockfile
COPY . .
CMD ["pnpm", "push"]
