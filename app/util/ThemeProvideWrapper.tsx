'use client';

import { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { WebSettings } from "../types/setting.types";

interface ThemeManagerProps {
  settings: WebSettings;
}

interface Theme {
  background: Record<string, string>;
  text: Record<string, string>;
  icon: Record<string, string>;
}

interface Config {
  fontFamily: string;
  fontSizeBase: string;
  headingFontSize: string;
  borderRadius: string;
  [key: string]: any;
}

export default function ThemeManager({ settings }: ThemeManagerProps) {
  const [theme, setTheme] = useState<string>("default"); // Default theme
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || settings?.themeName || "default";
      setTheme(savedTheme);
      const config = settings?.config;
      const selectedTheme = settings?.config?.themes.find(t => t.name === savedTheme);
      if (selectedTheme) {
        setThemeVariables(selectedTheme, config);
      }
    }
  }, [settings]);

  // New function you provided, to set all theme CSS variables dynamically
  function setThemeVariables(theme: Theme, config: Config) {
    const root = document.documentElement;

    root.style.setProperty('--font-family', config.fontFamily);
    root.style.setProperty('--font-size-base', config.fontSizeBase);
    root.style.setProperty('--heading-font-size', config.headingFontSize);
    root.style.setProperty('--border-radius', config.borderRadius);

    // Background colors
    Object.entries(theme.background).forEach(([key, value]) => {
      root.style.setProperty(`--background-${key}`, value);
    });

    // Text colors
    Object.entries(theme.text).forEach(([key, value]) => {
      root.style.setProperty(`--text-${key}`, value);
    });

    // Icon colors
    Object.entries(theme.icon).forEach(([key, value]) => {
      root.style.setProperty(`--icon-${key}`, value);
    });
  }

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }
    const selectedTheme = settings?.config?.themes.find(t => t.name === themeName);
    const config = settings?.config;
    if (selectedTheme) {
      setThemeVariables(selectedTheme, config);
    }
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick} sx={{ color: "var(--icon-default)" }} aria-label="choose theme">
        <PaletteIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {settings?.config?.themes?.map((t) => (
          <MenuItem key={t._id} onClick={() => changeTheme(t.name)}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: t.background.button,
                }}
              />
              {t.name.replace(/^web-/, "").replace(/^\w/, (c) => c.toUpperCase())}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
