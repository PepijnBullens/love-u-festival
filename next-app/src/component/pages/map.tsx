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

interface Act {
  start: string;
  end: string;
  label: string;
}

export default function Map({ params }: { params: { lng: string } }) {
  const [lng, setLng] = useState<string>("");
  const [overlay, setOverlay] = useState<null | Act>(null);

  useEffect(() => {
    async function fetchLng() {
      const { lng } = await params;
      setLng(lng);
    }
    fetchLng();
  }, [lng]);

  return (
    <>
      {overlay && <PinOverlay overlay={overlay} />}
      <TransformWrapper
        initialScale={2}
        minScale={1}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={true}
        alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
        centerZoomedOut={true}
      >
        <TransformComponent>
          <div className="p-4">
            <img src="/map.png" alt="Map" className="z-10" />
          </div>
          {pins.map(
            (
              pin: {
                x: number;
                y: number;
                content: {
                  stage: "Poton" | "The Lake" | "The Club" | "Hangar" | null;
                  icon: string | null;
                };
              },
              index
            ) => (
              <div
                key={`${pin.x}-${pin.y}-${index}`}
                style={{
                  position: "absolute",
                  left: `${pin.x}px`,
                  top: `${pin.y}px`,
                }}
              >
                <KeepScale>
                  <Pin
                    content={
                      pin.content.stage
                        ? pin.content.stage
                        : pin.content.icon
                        ? pin.content.icon
                        : ""
                    }
                    stage={pin.content.stage}
                    size={32}
                    setOverlay={setOverlay}
                  />
                </KeepScale>
              </div>
            )
          )}
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}
