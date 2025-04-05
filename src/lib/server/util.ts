import { type Pub, type PubId, type PubKeys, type Pubs } from "$lib/types.ts";
import { getPubs, setPubKeys } from "$lib/server/db.ts";

export function generatePubKeyString(length: number = 5): string {
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const pubKey: string[] = Array(length);
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);

    pubKey[i] = characters.charAt(randomIndex);
  }

  return pubKey.join("");
}

export async function randomizePubKeys(): Promise<void> {
  const newPubKeys: PubKeys = new Map() as PubKeys;
  const pubs: Pubs = await getPubs();

  pubs.forEach((_: Pub, pubId: PubId): void => {
    let newKey: string;

    do {
      newKey = generatePubKeyString();
    } while (newPubKeys.has(newKey));

    newPubKeys.set(newKey, pubId);
  });

  await setPubKeys(newPubKeys);
}
