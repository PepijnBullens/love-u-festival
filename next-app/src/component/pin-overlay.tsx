import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { TFunction } from "i18next";

interface Act {
  start: string;
  end: string;
  label: string;
}

export default function PinOverlay({
  overlay,
  setOverlay,
  t,
}: {
  overlay: null | {
    stage: string;
    acts: Act[];
  };
  setOverlay: (
    overlay: null | {
      stage: string;
      acts: Act[];
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
        className="fixed flex flex-col gap-4 h-fit top-1/2 left-1/2 -translate-1/2 bg-[#FFFFFF] z-[1100] w-[calc(100%-2rem)] p-4 shadow-information-block rounded-xl"
      >
        <h2 className="text-xl uppercase sansation-bold">
          {t("next-up")} {overlay?.stage}
        </h2>
        <div className="flex justify-between items-center w-full flex-wrap">
          {overlay?.acts.map((act: Act, index) => (
            <div className="flex flex-col" key={`${act.label}-${index}`}>
              <h3 className="sansation-bold text-md">{act.start}</h3>
              <h4 className="text-base">{act.label}</h4>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
