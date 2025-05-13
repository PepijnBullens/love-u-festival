import getNextAct from "@/helper/getNextAct";

interface Act {
  start: string;
  end: string;
  label: string;
}

export default function Pin({
  size,
  content,
  stage,
  setOverlay,
}: {
  size: number;
  content: React.ReactNode;
  stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null;
  setOverlay: (
    data: null | {
      start: string;
      end: string;
      label: string;
    }
  ) => void;
}) {
  const overlay = (
    stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null
  ) => {
    if (!stage) return;

    const nextAct = getNextAct(stage);
    if (!nextAct) return;

    setOverlay(nextAct);
  };

  return (
    <div
      onClick={() => overlay(stage)}
      className="aspect-square rounded-full bg-[#F03228] text-[#FFFFFF] border-[#8f1b15] border-2 flex justify-center items-center"
      style={{ width: size, height: size }}
    >
      {content}
    </div>
  );
}
