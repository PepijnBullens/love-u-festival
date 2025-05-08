import Information from "@/component/pages/information";
import Header from "@/component/header";

export default function InformationPage({
  params,
}: {
  params: { lng: string };
}) {
  return (
    <>
      <Header params={params} currentPage="information" />
      <Information params={params} />
    </>
  );
}
