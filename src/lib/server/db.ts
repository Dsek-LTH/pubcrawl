import { getAsBlob, set } from "@kitsonk/kv-toolbox/blob";
import {
  type Pub,
  type PubId,
  type PubKey,
  type PubKeyIdPairs,
  type Pubs,
  type Theme,
  type ThemeId,
  type Themes,
} from "$lib/types.ts";

// This is a cursed mess, tread carefully.

export const kv = await Deno.openKv("db.sqlite");

async function setObject(key: Deno.KvKey, obj: object): Promise<void> {
  const jsonString = JSON.stringify(obj);
  const blob = new Blob([jsonString], { type: "application/json" });
  await set(kv, key, blob);
}

async function getObject(key: Deno.KvKey): Promise<object | null> {
  const result = await getAsBlob(kv, key);

  if (result === null) {
    return null;
  }

  console.log(await Array.fromAsync(kv.list({ prefix: [] })));
  return JSON.parse(await result.text());
}

export async function setPubKeyIdPairs(
  pubKeyIdPairs: PubKeyIdPairs,
): Promise<void> {
  await setObject(["PubKeyIdPairs"], Object.fromEntries(pubKeyIdPairs));
}

export async function getPubKeyIdPairs(): Promise<PubKeyIdPairs> {
  return new Map(
    Object.entries(await getObject(["PubKeyIdPairs"]) ?? {}),
  ) as PubKeyIdPairs;
}

export async function getPubKeyIdPairId(pubKey: PubKey): Promise<PubId> {
  const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

  if (!pubKeyIdPairs.has(pubKey)) {
    throw new Error(`pubKey ${pubKey} does not exist`);
  }

  return pubKeyIdPairs.get(pubKey) as PubId;
}

export async function setPubKeyIdPair(
  pubKey: PubKey,
  pubId: PubId,
): Promise<void> {
  const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

  pubKeyIdPairs.set(pubKey, pubId);

  await setPubKeyIdPairs(pubKeyIdPairs);
}

export async function deletePubKeyIdPair(
  pubKey: PubKey,
): Promise<void> {
  const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

  pubKeyIdPairs.delete(pubKey);

  await setPubKeyIdPairs(pubKeyIdPairs);
}

// This might cause a datarace. Consult Melker or Simon for details.
export async function updatePubKeyIdPairPubKey(
  oldPubKey: PubKey,
  newPubKey: PubKey,
): Promise<void> {
  const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();
  const pubId: PubId = await getPubKeyIdPairId(oldPubKey);

  pubKeyIdPairs.delete(oldPubKey);
  pubKeyIdPairs.set(newPubKey, pubId);

  await setPubKeyIdPairs(pubKeyIdPairs);
}

export async function setThemes(themes: Themes): Promise<void> {
  await setObject(["Themes"], Object.fromEntries(themes));
}

export async function getThemes(): Promise<Themes> {
  return new Map(Object.entries(await getObject(["Themes"]) ?? {})) as Themes;
}

export async function setTheme(
  themeId: ThemeId,
  theme: Theme,
): Promise<void> {
  const themes: Themes = await getThemes();
  themes.set(themeId, theme);
  await setThemes(themes);
}

export async function getTheme(themeId: ThemeId): Promise<Theme> {
  const themes: Themes = await getThemes();

  if (!themes.has(themeId)) {
    throw new Error(`Theme with themeId "${themeId}" not found`);
  }

  return themes.get(themeId) as Theme;
}

export async function deleteTheme(
  themeId: ThemeId,
): Promise<void> {
  const themes: Themes = await getThemes();

  themes.delete(themeId);

  await setThemes(themes);
}

export async function updateThemeId(
  oldThemeId: ThemeId,
  newThemeId: ThemeId,
): Promise<void> {
  const themes: Themes = await getThemes();
  const theme: Theme = themes.get(oldThemeId);

  themes.delete(oldThemeId);
  themes.set(newThemeId, theme);

  await setThemes(themes);
}

export async function setPubs(pubs: Pubs): Promise<void> {
  await setObject(["Pubs"], Object.fromEntries(pubs));
}

export async function getPubs(): Promise<Pubs> {
  return new Map(Object.entries(await getObject(["Pubs"]) ?? {})) as Pubs;
}

export async function setPub(pubId: PubId, pub: Pub): Promise<void> {
  const pubs: Pubs = await getPubs();
  pubs.set(pubId, pub);
  await setPubs(pubs);
}

export async function getPub(pubId: PubId): Promise<Pub> {
  const pubs: Pubs = await getPubs();

  if (!pubs.has(pubId)) {
    throw new Error(`Pub with pubId "${pubId}" not found`);
  }

  return pubs.get(pubId) as Pub;
}

export async function deletePub(pubId: PubId): Promise<void> {
  const pubs: Pubs = await getPubs();

  pubs.delete(pubId);

  await setPubs(pubs);
}

export async function updatePubId(
  oldPubId: PubId,
  newPubId: PubId,
): Promise<void> {
  const pubs: Pubs = await getPubs();
  const pub: Pub = pubs.get(oldPubId);

  pubs.delete(oldPubId);
  pubs.set(newPubId, pub);

  await setPubs(pubs);
}

export async function setPubOccupancy(
  pubId: PubId,
  occupancy: number,
): Promise<void> {
  const pub: Pub = await getPub(pubId);

  pub.occupancy = occupancy;

  await setPub(pubId, pub);
}

export async function updatePubOccupancy(
  pubId: PubId,
  delta: number,
): Promise<void> {
  await setPubOccupancy(
    pubId,
    (await getPub(pubId)).occupancy + delta,
  );
}
