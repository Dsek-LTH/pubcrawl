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
    LONG
}

export interface Pub {
  counterKey: string;
  occupancy: number;
  capacity: number;
  intending: Map<string, Date>;
  queueStatus: QueueStatus;
  isActive: boolean;
  themeKey: Theme;
}
