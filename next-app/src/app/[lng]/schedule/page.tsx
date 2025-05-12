import Map from "@/component/pages/map";

export default function SchedulePage({ params }: { params: { lng: string } }) {
  return <Map params={params} />;
}
