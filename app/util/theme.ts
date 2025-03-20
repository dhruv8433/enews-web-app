type Theme = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  button: string;
  cardBackground: string;
  gradient: string;
};

type ThemeOptions = "default" | "dark" | "cupcake" | "corporate" | "emerald" | "retro" | "cyberpunk" | "sunset";

export const themes: Record<ThemeOptions, Theme> = {
  default: {
    background: "#f2f2f2",
    text: "#000000",
    primary: "#ffffff",
    secondary: "#fffbfb",
    button: "#1e90ff",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #1e90ff, #00c6ff)", // Blue gradient
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    primary: "#222831",
    secondary: "#393E46",
    button: "#ff5722",
    cardBackground: "#1c1c1c",
    gradient: "linear-gradient(135deg, #ff80ab, #ff7043)", // Pink to Orange gradient
  },
  cupcake: {
    background: "#fce4ec",
    text: "#fff",
    primary: "#ff80ab",
    secondary: "#ffffff",
    button: "#ff4081",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #ff80ab, #ffccbc)", // Lite Purple gradient
  },
  corporate: {
    background: "#f5f5f5",
    text: "#0a192f",
    primary: "#007bff",
    secondary: "#6c757d",
    button: "#6610f2",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #d8bfd8, #ff80ab)", // Blue-Purple gradient
  },
  emerald: {
    background: "#e0f2f1",
    text: "#fff",
    primary: "#013220",
    secondary: "#81c784",
    button: "#388e3c",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #2e7d32, #4caf50)", // Green gradient
  },
  retro: {
    background: "#ffecd1",
    text: "#3e2723",
    primary: "#ff9800",
    secondary: "#ffcc80",
    button: "#ff5722",
    cardBackground: "#ffe0b2",
    gradient: "linear-gradient(135deg, #ff0000, #ffff00)", // Orange gradient
  },
  cyberpunk: {
    background: "#000000",
    text: "#ff00ff",
    primary: "#00ffff",
    secondary: "#ff00ff",
    button: "#00ff00",
    cardBackground: "#222222",
    gradient: "linear-gradient(90deg, rgba(101,254,8,1) 0%, rgba(0,255,235,1) 100%)", // Neon gradient
  },
  sunset: {
    background: "#ffccbc",
    text: "#4e342e",
    primary: "#d84315",
    secondary: "#ff7043",
    button: "#bf360c",
    cardBackground: "#ffab91",
    gradient: "linear-gradient(135deg, #ff7043, #d84315)", // Warm sunset gradient
  },
};

// Function to get the theme safely
export const getTheme = (theme: string): Theme => themes[theme as ThemeOptions] || themes.default;
