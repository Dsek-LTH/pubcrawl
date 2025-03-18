import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit(), deno()],
});
