import Schedule from "@/component/pages/schedule";

export default function SchedulePage({ params }: { params: { lng: string } }) {
  return <Schedule params={params} />;
}
