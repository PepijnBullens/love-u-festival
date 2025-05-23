"use client";

import { poton } from "@/app/[lng]/schedule/schedule";
import { theLake } from "@/app/[lng]/schedule/schedule";
import { theClub } from "@/app/[lng]/schedule/schedule";
import { hangar } from "@/app/[lng]/schedule/schedule";

import { useState, useEffect } from "react";
import { useDay } from "@/context/day-context";
import { translation } from "@/app/i18n";

// Helper to parse "HH:mm" to minutes
function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Helper to format minutes to "HH:mm"
function minutesToTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// Define allowed day keys
type TypedDay = "saturday" | "sunday";

export default function Schedule({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const [t, setT] = useState<(key: string) => string>(
    () => (key: string) => key
  );

  useEffect(() => {
    async function fetchLngAndTranslation() {
      const { lng } = await params;
      const { t } = await translation(lng, "schedule");
      setT(() => t);
    }
    fetchLngAndTranslation();
  }, [params]);

  const { day, setDayFunc } = useDay();

  // Get all start and end times from all stages for the selected day
  const allActs = [
    ...(poton.lineup[day as TypedDay] || []),
    ...(theLake.lineup[day as TypedDay] || []),
    ...(theClub.lineup[day as TypedDay] || []),
    ...(hangar.lineup[day as TypedDay] || []),
  ];

  // Get all start times and all end times
  const startTimes = allActs.map((act) => act.start).filter(Boolean);
  const endTimes = allActs.map((act) => act.end).filter(Boolean);

  // Earliest is the minimum of all start times
  const earliest = startTimes.sort(
    (a, b) => timeToMinutes(a) - timeToMinutes(b)
  )[0];
  // Latest is the maximum of all end times (including 00:00 as a valid end)
  const latest = endTimes
    .sort(
      (a, b) =>
        timeToMinutes(a === "00:00" ? "24:00" : a) -
        timeToMinutes(b === "00:00" ? "24:00" : b)
    )
    .slice(-1)[0];

  // Generate times array in 15-min intervals
  const times: string[] = [];
  if (earliest && latest) {
    const start = timeToMinutes(earliest);
    // Treat "00:00" as 24:00 for the end of the day
    const end = latest === "00:00" ? 24 * 60 : timeToMinutes(latest);
    for (let t = start; t <= end; t += 15) {
      // Format 1440 as "00:00" for display
      times.push(minutesToTime(t === 1440 ? 0 : t));
    }
  }

  // Helper to get lineup for a stage
  type Stage = {
    label: string;
    lineup: Record<TypedDay, { label: string; start: string; end: string }[]>;
  };

  function getLineup(stage: Stage) {
    return stage.lineup[day as TypedDay] || [];
  }

  type Act = { label: string; start: string; end: string };

  // Helper to get act's grid position and span
  function getActGridProps(act: Act) {
    if (!earliest || !latest) return {};
    // Find the index of the start and end time in the times array
    const startIdx = times.findIndex((t) => t === act.start) + 1; // +1 for grid (1-based)
    const endIdx = times.findIndex((t) => t === act.end) + 1;
    return {
      gridColumnStart: startIdx,
      gridColumnEnd: endIdx,
    };
  }

  const stages = [poton, theLake, theClub, hangar];

  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  });

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grow flex flex-col justify-end items-center py-2">
      <section className="grow flex justify-center items-center uppercase sansation-bold text-xl">
        {currentTime}
      </section>
      <section className="w-full p-2 flex overflow-hidden">
        <div className="flex flex-col p-2 gap-2">
          <div className="shadow-information-block w-full rounded-md bg-white h-8 dark:bg-[#1F1F1F]"></div>
          {[poton.label, theLake.label, theClub.label, hangar.label].map(
            (label) => (
              <div
                key={label}
                className="uppercase px-4 h-[4rem] shadow-information-block flex justify-center items-center min-w-full w-max rounded-md bg-[#FFFFFF] dark:bg-[#1F1F1F]"
              >
                {label}
              </div>
            )
          )}
        </div>

        <div className="grow p-2 overflow-auto">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${times.length}, minmax(3.5rem, 1fr))`,
              position: "relative",
            }}
          >
            {/* Time headers */}
            {times.map((time, idx) => (
              <div
                key={`time-${time}`}
                className="h-8 flex justify-center items-center px-4 shadow-information-block w-full rounded-md bg-[#FFFFFF] dark:bg-[#1F1F1F]"
                style={{
                  gridRow: 1,
                  gridColumn: idx + 1,
                  zIndex: 2,
                }}
              >
                {time}
              </div>
            ))}
            {/* Stage rows */}
            {stages.map((stage, stageIdx) =>
              getLineup(stage).map((act: Act) => (
                <div
                  key={act.label + act.start}
                  className="bg-[#FFFFFF] dark:bg-[#1F1F1F]"
                  style={{
                    ...getActGridProps(act),
                    gridRow: stageIdx + 2, // +2: 1 for header, 1-based index
                    height: "4rem",
                    minWidth: "3rem",
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 0.5rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                  }}
                  title={`${act.label} (${act.start} - ${act.end})`}
                >
                  {act.label}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="flex gap-2 w-full px-4">
        <div
          className={`${
            day === "saturday"
              ? "translate-y-[1px] bg-[#f6625a]"
              : "shadow-information-block"
          } w-full p-4 bg-[#F03228] text-white flex justify-center items-center rounded-md cursor-pointer`}
          onClick={() => setDayFunc("saturday")}
        >
          {t("saturday")}
        </div>
        <div
          className={`${
            day === "sunday"
              ? "translate-y-[1px] bg-[#f6625a]"
              : "shadow-information-block"
          } w-full p-4 bg-[#F03228] text-white flex justify-center items-center rounded-md cursor-pointer`}
          onClick={() => setDayFunc("sunday")}
        >
          {t("sunday")}
        </div>
      </section>
    </div>
  );
}
