FROM node:22-bookworm-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --legacy --filter=pubcrawl --prod out

FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app

COPY --from=build /app/out/ .

EXPOSE 4000
CMD ["node", "build"]

