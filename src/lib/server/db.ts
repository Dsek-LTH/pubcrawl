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

export const kv = await Deno.openKv("db.sqlite");

export async function setPubKeyIdPairs(pubKeys: PubKeyIdPairs): Promise<void> {
  await kv.set(["PubKeyIdPairs"], pubKeys);
}

export async function getPubKeyIdPairs(): Promise<PubKeyIdPairs> {
  const res = await kv.get(["PubKeyIdPairs"]);

  if (res.versionstamp === null) {
    return new Map() as PubKeyIdPairs;
  }

  return res.value as PubKeyIdPairs;
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
    pubKey: PubKey
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
  await kv.set(["Themes"], themes);
}

export async function getThemes(): Promise<Themes> {
  const res = await kv.get(["Themes"]);

  if (res.versionstamp === null) {
    return new Map() as Themes;
  }

  return res.value as Themes;
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
  await kv.set(["Pubs"], pubs);
}

export async function getPubs(): Promise<Pubs> {
  const res = await kv.get(["Pubs"]);

  if (res.versionstamp === null) {
    return new Map() as Pubs;
  }

  return res.value as Pubs;
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

export async function updatePubId(oldPubId: PubId, newPubId: PubId): Promise<void> {
  const pubs: Pubs = await getPubs();
  const pub: Pub = pubs.get(oldPubId);

  pubs.delete(oldPubId);
  pubs.set(newPubId, pub);

  await setPubs(pubs);
}
