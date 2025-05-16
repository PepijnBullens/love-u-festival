import Information from "@/component/pages/information";

export default function InformationPage({
  params,
}: {
  params: Promise<Promise<{ lng: string }>>;
}) {
  return <Information params={params} />;
}
