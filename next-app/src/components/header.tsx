import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import VisualModeSwitcher from "@/components/theme-switcher/theme-switcher";

export default async function ({
  params,
  currentPage,
}: {
  params: { lng: string };
  currentPage: string;
}) {
  const { lng } = await params;

  return (
    <header>
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
    </header>
  );
}
