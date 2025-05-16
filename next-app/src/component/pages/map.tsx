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

  return (
    <>
      <AnimatePresence>
        {overlay && (
          <PinOverlay overlay={overlay} setOverlay={setOverlay} t={t} />
        )}
      </AnimatePresence>

      <TransformWrapper centerZoomedOut={true}>
        <TransformComponent>
          <div className="p-4">
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
                    left: `${pin.x}px`,
                    top: `${pin.y}px`,
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
    </>
  );
}
