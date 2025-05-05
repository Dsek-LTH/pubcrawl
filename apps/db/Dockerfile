FROM node:22-alpine AS base

RUN corepack enable && corepack install -g pnpm

FROM base AS deps

WORKDIR /app
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile --prod
COPY package.json .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --offline --frozen-lockfile  --prod

FROM base AS build

WORKDIR /app
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
COPY package.json .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --offline --frozen-lockfile
COPY . .
RUN pnpm build

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 4000
ENV NODE_ENV=production
CMD ["dist/src"]
