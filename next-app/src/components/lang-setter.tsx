"use client";
import { useEffect } from "react";

export default function LangSetter({ lng }: { lng: string }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
    }
  }, [lng]);
  return null;
}
