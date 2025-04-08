import { getPubs, kv } from "$lib/server/db.ts";
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start({ emit }) {
    for await (const _ of kv.watch([["Pubs", "__kv_toolbox_meta__"]])) {
      emit(
        "pubsUpdated",
        JSON.stringify(Object.fromEntries(await getPubs())),
      );
    }
  });
}
