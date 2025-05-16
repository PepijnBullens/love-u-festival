import getNextActs from "@/helper/getNextActs";
import Image from "next/image";

interface Act {
  start: string;
  end: string;
  label: string;
}

export default function Pin({
  size,
  image,
  stage,
  setOverlay,
}: {
  size: number;
  image: string;
  stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null;
  setOverlay: (
    data: null | {
      stage: string;
      acts: Act[];
    }
  ) => void;
}) {
  const overlay = (
    stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null
  ) => {
    if (!stage) return;

    const nextActs = getNextActs(stage);
    if (!nextActs) return;

    setOverlay({
      stage,
      acts: nextActs,
    });
  };

  return (
    <div onClick={() => overlay(stage)}>
      <Image src={image} alt="Pin on map" width={size} height={size} />
    </div>
  );
}
