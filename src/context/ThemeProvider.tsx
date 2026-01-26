import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "../types/Theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Check Local Storage or System Preference on first load
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      // Check if user has a saved preference
      if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme") as Theme;
      }
      // If not, check their system/OS settings
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    // Fallback default
    return "light";
  });

  //  Sync React State with the Local Storage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
