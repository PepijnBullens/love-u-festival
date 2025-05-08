import Map from "@/component/pages/map";

export default function MapPage({ params }: { params: { lng: string } }) {
  return <Map params={params} />;
}
