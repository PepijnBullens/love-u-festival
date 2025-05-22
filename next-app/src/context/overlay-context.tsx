"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/component/icon";

type OverlayContextType = {
  showOverlay: (children: ReactNode) => void;
  hideOverlay: () => void;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlayContent, setOverlayContent] = useState<ReactNode | null>(null);
  const [overlayState, setOverlayState] = useState<boolean>(false);

  const showOverlay = (content: ReactNode) => {
    setOverlayContent(content);
    setOverlayState(true);
  };

  const hideOverlay = () => {
    setOverlayState(false);
    setTimeout(() => setOverlayContent(null), 100);
  };

  const getCoveringCircleRadius = (width: number, height: number) => {
    return Math.sqrt(width * width + height * height);
  };

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  const size = 2 * getCoveringCircleRadius(windowWidth, windowHeight);

  return (
    <OverlayContext.Provider value={{ showOverlay, hideOverlay }}>
      {children}
      <AnimatePresence>
        {overlayContent && (
          <>
            <motion.div
              style={{
                width: size,
                height: size,
              }}
              className="fixed top-0 left-0 -translate-1/2 z-50 flex justify-center items-center rounded-full bg-black dark:bg-[#1F1F1F]"
              initial={{
                scale: "0%",
              }}
              animate={{
                scale: overlayState ? "100%" : "0%",
              }}
              exit={{
                scale: "0%",
              }}
              transition={{
                delay: overlayState ? 0 : 0.1,
                duration: 0.5,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: overlayState ? 0.1 : 0,
              }}
              className="absolute left-1/2 top-1/2 -translate-1/2 z-100"
            >
              {overlayContent}
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: overlayState ? 0.1 : 0,
              }}
              onClick={hideOverlay}
              className="absolute top-4 right-4 z-100 w-[3rem] aspect-square rounded-xl flex justify-center items-center cursor-pointer bg-[#F03228]"
            >
              <Icon
                name="close-white"
                width={32}
                height={32}
                themeMode={false}
                reversed={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
