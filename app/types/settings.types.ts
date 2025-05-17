export interface ThemeManagerProps {
  settings: WebSettings;
}

export interface WebSettings {
  _id: string;
  name: string;
  footerText: string;
  googleAdsenseCode: string;
  headerLogo: string;
  footerLogo: string;
  themeName: string;
  config: Config;
}

export interface Config {
  fontFamily: string;
  fontSizeBase: string;
  headingFontSize: string;
  borderRadius: string;
  themes: ThemeConfig[];
}

export interface ThemeConfig {
  _id: string;
  name: string;
  background: ThemeColorGroup;
  text: ThemeColorGroup;
  icon: ThemeColorGroup;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface ThemeColorGroup {
  [key: string]: string; // e.g., navigation, card, header, etc.
}
