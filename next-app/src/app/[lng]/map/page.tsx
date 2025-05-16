import Map from "@/component/pages/map";
import { Suspense } from "react";

export default function MapPage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  return (
    <Suspense>
      <Map params={params} />
    </Suspense>
  );
}
