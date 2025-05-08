"use client";

import { useTheme } from "@/context/theme-context";

export default function Interface() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>{theme}</p>
      <button onClick={toggleTheme}>Switch Theme</button>
    </>
  );
}
