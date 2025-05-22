"use client";

import {
  createContext,
  useContext,
  useState,
  Suspense,
  useEffect,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";

type DayContextType = {
  day: "saturday" | "sunday";
  setDayFunc: (day: "saturday" | "sunday") => void;
};

const DayContext = createContext<DayContextType | undefined>(undefined);

export function DayProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <DayProviderInner>{children}</DayProviderInner>
    </Suspense>
  );
}

function DayProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [day, setDay] = useState<"saturday" | "sunday">(() => {
    const urlDay = searchParams.get("day");
    if (urlDay === "saturday" || urlDay === "sunday") {
      return urlDay;
    }
    return "sunday";
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("day", day);
    router.replace(`?${params.toString()}`);
  }, [day, searchParams, router]);

  const setDayFunc = (day: "saturday" | "sunday") => {
    setDay(day);
  };

  return (
    <DayContext.Provider value={{ day, setDayFunc }}>
      {children}
    </DayContext.Provider>
  );
}

export function useDay() {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
