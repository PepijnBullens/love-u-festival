import getNextAct from "@/helper/getNextActs";
import Image from "next/image";
import { useDay } from "@/context/day-context";

interface Act {
  start: string;
  end: string;
  label: string;
  image: string | null;
  info: string | null;
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
      act: Act;
    }
  ) => void;
}) {
  const { day } = useDay();

  const overlay = (
    stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null
  ) => {
    if (!stage) return;

    const nextAct = getNextAct(stage, day);
    if (!nextAct) return;

    setOverlay({
      stage,
      act: nextAct,
    });
  };

  return (
    <div onClick={() => overlay(stage)}>
      <Image src={image} alt="Pin on map" width={size} height={size} />
    </div>
  );
}
