import { getThemes, kv } from "$lib/server/db.ts";
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start({ emit }) {
    for await (const change of kv.watch([["Themes"]])) {
      emit(
        "themesUpdated",
        JSON.stringify(Object.fromEntries(await getThemes())),
      );
    }
  });
}
