"use client";

import { useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";
import Pin from "@/component/pin";
import { pins } from "@/app/[lng]/map/pins";
import PinOverlay from "../pin-overlay";
import { AnimatePresence } from "framer-motion";
import { translation } from "@/app/i18n";
import Image from "next/image";
import { useDay } from "@/context/day-context";

interface Act {
  start: string;
  end: string;
  label: string;
  image: string | null;
  info: string | null;
}

export default function Map({ params }: { params: Promise<{ lng: string }> }) {
  const [overlay, setOverlay] = useState<null | {
    stage: string;
    act: Act;
  }>(null);
  const [t, setT] = useState<(key: string) => string>(
    () => (key: string) => key
  );
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    async function fetchLngAndTranslation() {
      const { lng } = await params;
      const { t } = await translation(lng, "map");
      setT(() => t);
    }
    fetchLngAndTranslation();
  }, [params]);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [params]);

  const { day, setDayFunc } = useDay();

  return (
    <>
      <AnimatePresence>
        {overlay && (
          <PinOverlay overlay={overlay} setOverlay={setOverlay} t={t} />
        )}
      </AnimatePresence>

      <TransformWrapper centerZoomedOut={false} initialScale={2}>
        <TransformComponent>
          <div className="p-4 w-full! h-full!">
            <Image
              src="/map.png"
              alt="Map"
              width={dimensions.width}
              height={dimensions.height}
            />
            {pins.map(
              (
                pin: {
                  x: number;
                  y: number;
                  stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null;
                  size: number;
                  image: string;
                },
                index
              ) => (
                <KeepScale
                  key={`${pin.x}-${pin.y}-${index}`}
                  style={{
                    position: "absolute",
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                  }}
                >
                  <Pin
                    image={pin.image}
                    stage={pin.stage}
                    size={pin.size}
                    setOverlay={setOverlay}
                  />
                </KeepScale>
              )
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>

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
    </>
  );
}
