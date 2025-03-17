FROM denoland/deno:latest
# USER deno
WORKDIR /app

COPY deno.json .
RUN deno cache deno.json

COPY . .
RUN deno task build

ENV PORT=11337
EXPOSE 11337

CMD ["deno", "task", "serve"]
