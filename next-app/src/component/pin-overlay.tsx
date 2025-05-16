import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Icon from "@/component/icon";
import Image from "next/image";
import { useState } from "react";

interface Act {
  start: string;
  end: string;
  label: string;
  image: string | null;
  info: string | null;
}

export default function PinOverlay({
  overlay,
  setOverlay,
  t,
}: {
  overlay: null | {
    stage: string;
    act: Act;
  };
  setOverlay: (
    overlay: null | {
      stage: string;
      act: Act;
    }
  ) => void;
  t: any;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setOverlay(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOverlay]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="fixed w-[100vh] h-[100vh] top-0 left-0 bg-[#000000] z-[1000]"
      ></motion.div>
      <motion.div
        ref={overlayRef}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        className="overflow-auto fixed flex flex-col gap-8 top-1/2 left-1/2 -translate-1/2 bg-[#FFFFFF] z-[1100] w-[calc(100%-2rem)] h-[calc(100%-2rem)] p-4 shadow-information-block rounded-xl"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl uppercase sansation-bold">
            {t("next-up")} {overlay?.stage}
          </h2>
          <div
            onClick={() => setOverlay(null)}
            className="z-100 w-[3rem] aspect-square rounded-xl flex justify-center items-center cursor-pointer bg-[#F03228]"
          >
            <Icon
              name="close-white"
              width={32}
              height={32}
              themeMode={false}
              reversed={false}
            />
          </div>
        </div>
        {overlay && (
          <div className="flex justify-between gap-2 w-full h-full flex-col">
            <div className="flex h-full justify-between items-end relative">
              <div className="flex flex-col absolute left-4 bottom-4 gap-1">
                <h3 className="sansation-bold text-md bg-white rounded-xs w-min px-1">
                  {overlay.act.start}
                </h3>
                <h4 className="text-base bg-white rounded-xs px-1">
                  {overlay.act.label}
                </h4>
              </div>
              {overlay.act.image && (
                <img
                  src={overlay.act.image}
                  alt={overlay.act.image}
                  className="h-full w-full object-cover rounded-md"
                />
              )}
            </div>
            {overlay.act.info && <p>{overlay.act.info}</p>}
          </div>
        )}
      </motion.div>
    </>
  );
}
