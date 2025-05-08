import Map from "@/component/pages/map";
import Header from "@/component/header";

export default function MapPage({ params }: { params: { lng: string } }) {
  return (
    <>
      <Header params={params} currentPage="information" />
      <Map params={params} />
    </>
  );
}
