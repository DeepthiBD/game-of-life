import { useEffect, useState } from "react";
import type { ThemeMode } from "../types";

const STORAGE_KEY = "lifepilot-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  const resolved = mode === "system" ? getSystemTheme() : mode;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.setAttribute("data-theme", resolved);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      return stored ?? "system";
    } catch {
      return "system";
    }
  });

  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    return undefined;
  }, [theme]);

  function setTheme(mode: ThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore storage errors
    }
    setThemeState(mode);
  }

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  return { theme, resolvedTheme, setTheme };
}
