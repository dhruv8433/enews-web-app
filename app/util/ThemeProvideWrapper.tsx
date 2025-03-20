"use client";

import { useEffect, useState } from "react";
import { getTheme, themes } from "./theme";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

export default function ThemeManager() {
  const [theme, setTheme] = useState<string>("default"); // Default theme
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure it runs only on the client
      const savedTheme = localStorage.getItem("theme") || "default";
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeName: string) => {
    const themeColors = getTheme(themeName);
    document.documentElement.style.setProperty("--background", themeColors.background);
    document.documentElement.style.setProperty("--text", themeColors.text);
    document.documentElement.style.setProperty("--primary", themeColors.primary);
    document.documentElement.style.setProperty("--secondary", themeColors.primary);
    document.documentElement.style.setProperty("--button", themeColors.primary);
    document.documentElement.style.setProperty("--gradient", themeColors.gradient);
  };

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }
    applyTheme(themeName);
    setAnchorEl(null); // Close menu after selection
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick} color="primary">
        <PaletteIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.keys(themes).map((t) => (
          <MenuItem key={t} onClick={() => changeTheme(t)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: getTheme(t).primary,
                }}
              />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
