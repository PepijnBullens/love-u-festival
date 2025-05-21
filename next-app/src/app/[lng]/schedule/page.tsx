import Schedule from "@/component/pages/schedule";

export default function SchedulePage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  return <Schedule />;
}
