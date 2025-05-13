"use client";

import Image from "next/image";
import { useTheme } from "@/context/theme-context";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { theme } = useTheme();

  return (
    <Image
      src={`/logo/${theme}.png`}
      width={width}
      height={height}
      alt="Image of ❤️U Festival logo."
    />
  );
}
