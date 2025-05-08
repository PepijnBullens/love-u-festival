import Link from "next/link";
import { useTranslation } from "@/app/i18n";

export default async function Information({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, "information");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/map`}>{t("to-map-page")}</Link>
    </>
  );
}
