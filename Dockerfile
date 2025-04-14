FROM docker.io/denoland/deno:latest

WORKDIR /app
RUN mkdir -p /app/deno-dir && chown -R deno:deno /app/deno-dir
ENV DENO_DIR=/app/deno-dir

COPY deno.json .
RUN deno cache deno.json

COPY . .
RUN deno task build

RUN rm db.sqlite && chmod -R g+w . && chmod -R o+w deno-dir

ENV PORT=11337
EXPOSE 11337

CMD ["deno", "task", "serve"]
