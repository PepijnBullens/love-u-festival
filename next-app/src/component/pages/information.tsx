import { useTranslation } from "@/app/i18n";
import InformationBlock from "@/component/information-block";
import InformationBlockBig from "@/component/information-block-big";
import Icon from "@/component/icon";
import Logo from "@/component/logo";
import { informationLayout } from "@/app/[lng]/information/information-layout";

export default async function Information({
  params,
}: {
  params: { lng: string };
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, "information");

  return (
    <section className="p-4 flex flex-col gap-2">
      <h1 className="sansation-bold text-3xl flex items-center gap-1">
        The
        <span>
          <Logo width={32} height={32} />
        </span>
        Festival
      </h1>
      <h2 className="mb-8">{t("main-title")}</h2>

      {informationLayout.map((item, index) =>
        item.type === "default" ? (
          <InformationBlock
            key={`${item.title}-${index}`}
            title={t(item.title)}
            content={typeof item.content === "string" ? t(item.content) : ""}
            collapsible={item.collapsible || false}
            icon={
              <Icon
                name={item.icon || null}
                width={24}
                height={24}
                themeMode={true}
                reversed={false}
              />
            }
            iconCentered={item.iconCentered || false}
          />
        ) : item.type === "big" ? (
          <InformationBlockBig
            key={`${item.title}-${index}`}
            title={t(item.title)}
            content={
              item.content &&
              typeof item.content === "object" &&
              "title" in item.content &&
              "content" in item.content
                ? [
                    {
                      title: item.content.title as string,
                      content: item.content.content as string,
                    },
                  ]
                : []
            }
          />
        ) : null
      )}
    </section>
  );
}
