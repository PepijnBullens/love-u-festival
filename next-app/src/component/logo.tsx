"use client";

import Image from "next/image";
import { useTheme } from "@/context/theme-context";

export default function Logo({
  width,
  height,
  themeOverride,
}: {
  width: number;
  height: number;
  themeOverride: "light" | "dark" | null;
}) {
  const { theme } = useTheme();

  return (
    <Image
      src={`/logo/${themeOverride ? themeOverride : theme}.png`}
      width={width}
      height={height}
      alt="Image of ❤️U Festival logo."
    />
  );
}
