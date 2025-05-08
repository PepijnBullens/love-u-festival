"use client";

type Language = keyof typeof flags;
import { languages, flags } from "@/app/i18n/settings";
import Link from "next/link";
import Icon from "@/component/icon";
import { useOverlay } from "@/context/overlay-context";
import { redirect } from "next/navigation";

export default function LanguageSwitcher({
  currentPage,
  lng,
}: {
  currentPage: string;
  lng: string;
}) {
  const { showOverlay, hideOverlay } = useOverlay();

  const handleSwitch = (language: string) => {
    hideOverlay();
    setTimeout(() => redirect(`/${language}/${currentPage}`), 1000);
  };

  return (
    <div
      onClick={() =>
        showOverlay(
          <div className="flex gap-2 flex-col">
            {languages.map((language) => {
              const FlagIcon = require(`country-flag-icons/react/3x2`)[
                flags[language as Language]?.toUpperCase()
              ];

              return (
                <div
                  key={language}
                  className="w-32 cursor-pointer"
                  onClick={() => handleSwitch(language)}
                >
                  {FlagIcon && (
                    <FlagIcon className="w-full h-full object-cover rounded" />
                  )}
                </div>
              );
            })}
          </div>
        )
      }
      className="w-[3rem] aspect-square flex justify-center items-center rounded-xl bg-[#FFFFFF] shadow-icon cursor-pointer"
    >
      <Icon name="translate" width={24} height={24} />
    </div>
  );
}
