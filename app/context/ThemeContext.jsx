"use client";
import { useState, useEffect, useContext, createContext } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const shouldBeDark = savedTheme
        ? savedTheme === "dark"
        : systemPrefersDark;

      setIsDarkMode(shouldBeDark);
      document.documentElement.classList.toggle("dark", shouldBeDark);
      setIsLoaded(true);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDarkMode);
  };

  const setTheme = (theme) => {
    const newIsDarkMode = theme === "dark";
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", newIsDarkMode);
  };

  const value = { isDarkMode, toggleTheme, setTheme, isLoaded };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
