"use client";

import { useEffect, useState } from "react";

export default function Interface({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.cookie = `theme=${newTheme}; path=/`;
  };

  return (
    <>
      <p>{theme}</p>
      <button onClick={switchTheme}>Switch Theme</button>
    </>
  );
}
