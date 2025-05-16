import { hangar } from "@/app/[lng]/schedule/schedule";
import { poton } from "@/app/[lng]/schedule/schedule";

interface Act {
  start: string;
  end: string;
  label: string;
}

interface Lineup {
  saturday?: Act[];
}

interface Stage {
  lineup?: Lineup;
}

export default function getNextActs(
  stage: "Poton" | "The Lake" | "The Club" | "Hangar"
) {
  let acts;

  if (stage === "Hangar" && hangar) {
    acts = (hangar as Stage)?.lineup?.saturday;
  }

  if (stage === "Poton" && poton) {
    acts = (poton as Stage)?.lineup?.saturday;
  }

  if (acts) {
    const now = new Date();
    const nextActs = acts
      .map((act) => {
        const [hours, minutes] = act.start.split(":").map(Number);
        const date = new Date(now);
        date.setHours(hours, minutes, 0, 0);
        return { act, date };
      })
      .filter(({ date }) => date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3)
      .map(({ act }) => act);

    return nextActs.length > 0 ? nextActs : [];
  }
}
