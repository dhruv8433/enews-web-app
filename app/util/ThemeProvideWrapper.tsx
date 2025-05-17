'use client';

import { useEffect, useState } from "react";
import { getTheme, themes } from "./theme";
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
      applyTheme(savedTheme);
    }
  }, [settings]);

  const applyTheme = (themeName: string) => {
    const selectedTheme = settings?.config?.themes.find(theme => theme.name === themeName);
    if (!selectedTheme) return;

    const { background, text, icon } = selectedTheme;

    document.documentElement.style.setProperty("--background", background.body);
    document.documentElement.style.setProperty("--text", text.primary);
    document.documentElement.style.setProperty("--primarytext", text.primary);
    document.documentElement.style.setProperty("--primary", text.heading);
    document.documentElement.style.setProperty("--secondary", text.secondary);
    document.documentElement.style.setProperty("--button", background.button);
    document.documentElement.style.setProperty("--gradient", "linear-gradient(to right, #00f, #0ff)");
    document.documentElement.style.setProperty("--icon", icon.default);
  };

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }
    applyTheme(themeName);
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
      <IconButton onClick={handleClick} style={{ color: "var(--icon)" }}>
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
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
