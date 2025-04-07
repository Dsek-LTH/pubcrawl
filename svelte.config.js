import adapter from "svelte-adapter-deno";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  kit: {
    adapter: adapter({ precompress: false }),
  },
  preprocess: vitePreprocess(),
};
