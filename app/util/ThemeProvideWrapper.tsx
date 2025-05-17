'use client';

import { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { WebSettings } from "../types/setting.types";

interface ThemeManagerProps {
  settings: WebSettings;
}

export default function ThemeManager({ settings }: ThemeManagerProps) {
  const [theme, setTheme] = useState<string>("default"); // Default theme
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || settings?.themeName || "default";
      setTheme(savedTheme);
      const selectedTheme = settings?.config?.themes.find(t => t.name === savedTheme);
      if (selectedTheme) {
        setThemeVariables(selectedTheme);
      }
    }
  }, [settings]);

  // New function you provided, to set all theme CSS variables dynamically
  function setThemeVariables(theme: any) {
    const root = document.documentElement;

    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--font-size-base', theme.fontSizeBase);
    root.style.setProperty('--heading-font-size', theme.headingFontSize);
    root.style.setProperty('--border-radius', theme.borderRadius);

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
    if (selectedTheme) {
      setThemeVariables(selectedTheme);
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
