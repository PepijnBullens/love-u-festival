import Information from "@/component/pages/information";
import MainLayout from "@/layout/main-layout";

export default function InformationPage({
  params,
}: {
  params: { lng: string };
}) {
  return <Information params={params} />;
}
