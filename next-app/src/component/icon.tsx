"use client";

import Image from "next/image";
import { useTheme } from "@/context/theme-context";

type Props = {
  name: string | null;
  width: number;
  height: number;
  themeMode: boolean;
  reversed: boolean;
};

export default function Icon({
  name,
  width,
  height,
  themeMode,
  reversed,
}: Props) {
  const { theme } = useTheme();

  if (!name) return;

  const src = themeMode
    ? `/icons/${name}-${
        theme === "light"
          ? reversed
            ? "dark"
            : "light"
          : reversed
          ? "light"
          : "dark"
      }.svg`
    : `/icons/${name}.svg`;

  return <Image alt={name} width={width} height={height} src={src} />;
}
