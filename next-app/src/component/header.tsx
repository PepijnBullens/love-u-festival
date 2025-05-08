"use client";

import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import VisualModeSwitcher from "@/component/theme-switcher/theme-switcher";
import Logo from "@/component/logo";

export default function Header({
  params,
  currentPage,
}: {
  params: { lng: string };
  currentPage: string;
}) {
  const { lng } = params;

  return (
    <nav>
      <div>
        <Logo />
      </div>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}/${currentPage}`}>{l}</Link>
            </span>
          );
        })}
      <VisualModeSwitcher />
    </nav>
  );
}
