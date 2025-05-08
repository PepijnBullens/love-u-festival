import Link from "next/link";
import { useTranslation } from "@/app/i18n";

export default async function Map({ params }: { params: { lng: string } }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, "map");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/information`}>{t("to-info-page")}</Link>
    </>
  );
}
