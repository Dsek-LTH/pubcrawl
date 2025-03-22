export interface Theme {
  displayName: string;
  logo: string; // Base64 encoded
  color: string; // Hex
}

export type ThemeKey = string;

export enum QueueStatus {
  EMPTY,
  SHORT,
  MEDIUM,
  LONG,
}

export interface Pub {
  occupancy: number;
  capacity: number;
  intending: Map<string, Date>;  // Is to be implemented later
  queueStatus: QueueStatus;
  isActive: boolean;
  themeKey: ThemeKey;
}

// Can this be restricted to onlu five char strings and no whitespace?
export type PubKey = string;