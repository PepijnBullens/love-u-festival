import Image from "next/image";
import { useTheme } from "@/context/theme-context";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={`/logo/${theme}.png`}
      width={24}
      height={24}
      alt="Image of ❤️U Festival logo."
    />
  );
}
