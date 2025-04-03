import { getActivePubs, kv } from "$lib/server/db.ts";
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start({ emit }) {
    const watcher = kv.watch([["Themes"]]);
    for await (const change of watcher) {
      emit("themesUpdated", JSON.stringify(Object.fromEntries(await getActivePubs())));
    }
    console.log("SHOULD NEVER GET HERE");
  });
}
