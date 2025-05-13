import { hangar } from "@/app/[lng]/schedule/schedule";

interface Act {
  start: string;
  end: string;
  label: string;
}

interface Lineup {
  saturday?: Act[];
}

interface Hangar {
  lineup?: Lineup;
}

export default function getNextAct(
  stage: "Poton" | "The Lake" | "The Club" | "Hangar"
) {
  if (stage === "Hangar" && hangar) {
    const acts = (hangar as Hangar)?.lineup?.saturday;

    if (acts) {
      const now = new Date();
      const closestFutureAct = acts
        .map((act) => {
          const [hours, minutes] = act.start.split(":").map(Number);
          const date = new Date(now);
          date.setHours(hours, minutes, 0, 0);
          return { act, date };
        })
        .filter(({ date }) => date > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

      return closestFutureAct ? closestFutureAct.act : null;
    }
  }
}
