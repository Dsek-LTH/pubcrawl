export interface Theme {
  displayName: string;
  logo: string; // Base64 encoded
  color: string; // Hex
}

export type ThemeId = string;

export type Themes = Map<ThemeId, Theme>;

export enum QueueStatus {
  EMPTY,
  SHORT,
  MEDIUM,
  LONG,
}

export interface Pub {
  occupancy: number;
  capacity: number;
  intending: Map<string, Date>; // Is to be implemented later
  queueStatus: QueueStatus;
  isActive: boolean;
  themeId: ThemeId;
}

// Can this be restricted to onlu five char strings and no whitespace?
export type PubId = string;

export type Pubs = Map<PubId, Pub>;

export type PubKey = string;

export type PubKeys = Map<PubKey, PubId>;
