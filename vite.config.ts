import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [deno(), sveltekit(), tailwindcss()],
});
