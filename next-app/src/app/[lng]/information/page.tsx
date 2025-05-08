import Information from "@/components/pages/information";
import Header from "@/components/header";

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
