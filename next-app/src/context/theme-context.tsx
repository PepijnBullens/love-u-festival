"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </Suspense>
  );
}

function ThemeProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [theme, setTheme] = useState(() => {
    const urlTheme = searchParams.get("theme");
    return urlTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    const params = new URLSearchParams(searchParams);
    params.set("theme", theme);
    router.replace(`?${params.toString()}`);
  }, [theme, searchParams, router]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
