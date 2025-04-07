FROM denoland/deno:latest

WORKDIR /app

COPY deno.json .
RUN deno cache deno.json

COPY . .
RUN deno task build

RUN chmod -R g+w .

ENV PORT=11337
EXPOSE 11337

CMD ["deno", "task", "serve"]
