"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import VisualModeSwitcher from "@/component/switchers/theme-switcher";
import Logo from "@/component/logo";
import LanguageSwitcher from "./switchers/language-switcher";

export default function Header({
  currentPage,
  params,
}: {
  currentPage: string;
  params: { lng: string };
}) {
  const [lng, setLng] = useState<string>("");

  useEffect(() => {
    async function fetchLanguage() {
      const { lng } = await params;
      setLng(lng);
    }
    fetchLanguage();
  }, []);

  return (
    <nav className="w-full p-4 flex justify-between items-center">
      <Link
        href={`/${lng}/information`}
        className="z-200 w-[3rem] aspect-square flex justify-center items-center rounded-xl bg-[#FFFFFF] shadow-icon cursor-pointer"
      >
        <Logo width={24} height={24} />
      </Link>
      <div className="flex gap-2">
        <LanguageSwitcher currentPage={currentPage} lng={lng} />
        <VisualModeSwitcher />
      </div>
    </nav>
  );
}
