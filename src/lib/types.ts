export interface Theme {
  displayName: string;
  logo: string; // Base64 encoded
  color: string;
}

export type ThemeKey = string;

export interface Pub {
  counterKey: string;
  occupancy: number;
  capacity: number;
  intending: Map<string, Date>;
  isActive: boolean;
  themeKey: Theme;
}
