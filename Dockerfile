FROM denoland/deno:latest
# USER deno
WORKDIR /app

COPY deno.json .
RUN deno cache deno.json

COPY . .
RUN deno task build

CMD ["deno", "task", "serve"]
