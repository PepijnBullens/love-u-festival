"use client";

import { useTheme } from "@/context/theme-context";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>{theme}</p>
      <button onClick={toggleTheme}>Switch Theme</button>
    </>
  );
}
