import { type Pub, type PubId, type PubKeys, type Pubs } from "$lib/types.ts";
import { getPubs, setPubKeyIdPairs } from "$lib/server/db.ts";

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
  const newPubKeyIdPairs: PubKeys = new Map() as PubKeys;
  const pubs: Pubs = await getPubs();

  pubs.forEach((_: Pub, pubId: PubId): void => {
    let newPubKey: string;

    do {
      newPubKey = generatePubKeyString();
    } while (newPubKeyIdPairs.has(newPubKey));

    newPubKeyIdPairs.set(newPubKey, pubId);
  });

  await setPubKeyIdPairs(newPubKeyIdPairs);
}
