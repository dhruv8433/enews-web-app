type Theme = {
  background: string;
  text: string;
  primarytext: string;
  primary: string;
  secondary: string;
  button: string;
  cardBackground: string;
  gradient: string;
  icon: string; // Added icon field
};

type ThemeOptions =
  | "default"
  | "dark"
  | "cupcake"
  | "corporate"
  | "emerald"
  | "retro"
  | "cyberpunk"
  | "ocean"
  | "pastel"
  | "midnight"
  | "lavender";

export const themes: Record<ThemeOptions, Theme> = {
  default: {
    background: "#f2f2f2",
    text: "#000000",
    primarytext: "#1e90ff",
    primary: "#ffffff",
    secondary: "#fffbfb",
    button: "#1e90ff",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #1e90ff, #00c6ff)", // Blue gradient
    icon: "#1e90ff",
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    primarytext: "#ff5722",
    primary: "#222831",
    secondary: "#393E46",
    button: "#ff5722",
    cardBackground: "#1c1c1c",
    gradient: "linear-gradient(135deg, #ff80ab, #ff7043)", // Pink to Orange gradient
    icon: "#fff",
  },
  cupcake: {
    background: "#fce4ec",
    text: "#de3163",
    primarytext: "#ff80ab",
    primary: "#ff80ab",
    secondary: "#ffffff",
    button: "#ff4081",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #ff80ab, #ffccbc)", // Lite Purple gradient
    icon: "#fff",
  },
  corporate: {
    background: "#f5f5f5",
    text: "#0a192f",
    primarytext: "#007bff",
    primary: "#007bff",
    secondary: "#6c757d",
    button: "#6610f2",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #d8bfd8, #ff80ab)", // Blue-Purple gradient
    icon: "#fff",
  },
  emerald: {
    background: "#adcfcd",
    text: "#fff",
    primarytext: "#013220",
    primary: "#013220",
    secondary: "#81c784",
    button: "#388e3c",
    cardBackground: "#ffffff",
    gradient: "linear-gradient(135deg, #2e7d32, #4caf50)", // Green gradient
    icon: "#fff",
  },
  retro: {
    background: "#ffecd1",
    text: "#3e2723",
    primarytext: "#ff9800",
    primary: "#ff9800",
    secondary: "#ffcc80",
    button: "#ff5722",
    cardBackground: "#ffe0b2",
    gradient: "linear-gradient(135deg, #ff0000, #ffff00)", // Orange gradient
    icon: "#000",
  },
  cyberpunk: {
    background: "#000000",
    text: "#ff00ff",
    primarytext: "#00ffff",
    primary: "#00ffff",
    secondary: "#ff00ff",
    button: "#00ff00",
    cardBackground: "#222222",
    gradient: "linear-gradient(90deg, rgba(101,254,8,1) 0%, rgba(0,255,235,1) 100%)", // Neon gradient
    icon: "#00fffff",
  },
  ocean: {
    background: "#0077b6",
    text: "#ffffff",
    primarytext: "#90e0ef",
    primary: "#00b4d8",
    secondary: "#48cae4",
    button: "#023e8a",
    cardBackground: "#caf0f8",
    gradient: "linear-gradient(135deg, #00b4d8, #0077b6)", // Deep ocean gradient
    icon: "#fff",
  },
  pastel: {
    background: "#f8edeb",
    text: "#000",
    primarytext: "#52321E",
    primary: "#b5838d",
    secondary: "#e5989b",
    button: "#ffb4a2",
    cardBackground: "#ffe5d9",
    gradient: "linear-gradient(135deg, #ffcad4, #ffb4a2)", // Soft pastel gradient
    icon: "#000",
  },
  midnight: {
    background: "#0d1b2a",
    text: "#e0e1dd",
    primarytext: "#FCE8DB",
    primary: "#415a77",
    secondary: "#1b263b",
    button: "#e63946",
    cardBackground: "#14213d",
    gradient: "linear-gradient(135deg, #1b263b, #778da9)", // Midnight gradient
    icon: "#fff",
  },
  lavender: {
    background: "#e6e6fa",
    text: "#4b0082",
    primarytext: "#6a5acd",
    primary: "#7b68ee",
    secondary: "#8a2be2",
    button: "#9370db",
    cardBackground: "#d8bfd8",
    gradient: "linear-gradient(135deg, #8a2be2, #7b68ee)", // Purple lavender gradient
    icon: "#fff",
  },
};

// Function to get the theme safely
export const getTheme = (theme: string): Theme =>
  themes[theme as ThemeOptions] || themes.default;
