'use client';

import { useEffect, useState } from "react";
import { Config, ThemeConfig, ThemeManagerProps } from "../types/settings.types";

export default function ThemeManager({ settings }: ThemeManagerProps) {
  const [theme, setTheme] = useState<string>("default");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme =
        localStorage.getItem("theme") || settings?.themeName || "default";
      setTheme(savedTheme);

      const config = settings?.config;
      const selectedTheme = config?.themes.find((t) => t.name === savedTheme);
      if (selectedTheme) {
        setThemeVariables(selectedTheme, config);
      }
    }
  }, [settings]);

  function setThemeVariables(theme: ThemeConfig, config: Config) {
    const root = document.documentElement;

    root.style.setProperty("--font-family", config.fontFamily);
    root.style.setProperty("--font-size-base", config.fontSizeBase);
    root.style.setProperty("--heading-font-size", config.headingFontSize);
    root.style.setProperty("--border-radius", config.borderRadius);

    Object.entries(theme.background).forEach(([key, value]) => {
      root.style.setProperty(`--background-${key}`, value);
    });

    Object.entries(theme.text).forEach(([key, value]) => {
      root.style.setProperty(`--text-${key}`, value);
    });

    Object.entries(theme.icon).forEach(([key, value]) => {
      root.style.setProperty(`--icon-${key}`, value);
    });
  }

  const changeTheme = (themeName: string) => {
    setTheme(themeName);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }

    const selectedTheme = settings?.config?.themes.find((t) => t.name === themeName);
    const config = settings?.config;
    if (selectedTheme && config) {
      setThemeVariables(selectedTheme, config);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--icon-default)] rounded-full"
        aria-label="Choose theme"
      >
        🎨 {/* You can replace this emoji with an actual icon if needed */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 card border  rounded shadow-md z-50">
          <ul className="py-1">
            {settings?.config?.themes?.map((t) => (
              <li key={t._id}>
                <button
                  onClick={() => changeTheme(t.name)}
                  className="flex items-center gap-2 w-full text-left px-4 py-2"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.background.button }}
                  ></span>
                  {t.name.replace(/^web-/, "").replace(/^\w/, (c) => c.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
