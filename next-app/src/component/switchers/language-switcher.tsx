import { languages } from "@/app/i18n/settings";
import Link from "next/link";
import Icon from "@/component/icon";

export default function LanguageSwitcher({
  currentPage,
  lng,
}: {
  currentPage: string;
  lng: string;
}) {
  return (
    <div className="w-[3rem] aspect-square flex justify-center items-center rounded-xl bg-[#FFFFFF] shadow-icon cursor-pointer">
      <Icon name="translate" width={24} height={24} />
    </div>
  );

  return languages
    .filter((l) => lng !== l)
    .map((l, index) => {
      return (
        <span key={l}>
          {index > 0 && " or "}
          <Link href={`/${l}/${currentPage}`}>{l}</Link>
        </span>
      );
    });
}
