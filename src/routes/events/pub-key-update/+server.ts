import { getPubKeys, kv } from "$lib/server/db.ts";
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start({ emit }) {
    const watcher = kv.watch([["PubKeys"]]);
    for await (const change of watcher) {
      emit(
        "pubKeysUpdated",
        JSON.stringify(Object.fromEntries(await getPubKeys())),
      );
    }
  });
}
