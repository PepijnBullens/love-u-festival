import Link from "next/link";
import { translation } from "@/app/i18n";

export default async function Schedule({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await translation(lng, "schedule");

  return (
    <>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/information`}>{t("to-info-page")}</Link>
    </>
  );
}
