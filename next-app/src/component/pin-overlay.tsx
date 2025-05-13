import { motion, AnimatePresence } from "framer-motion";

interface Act {
  start: string;
  end: string;
  label: string;
}

export default function PinOverlay({ overlay }: { overlay: Act }) {
  return (
    <AnimatePresence>
      <motion.div
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
        className="fixed top-1/2 left-1/2 -translate-1/2 bg-[#FFFFFF] z-50 w-[calc(100%-2rem)] p-4 shadow-information-block rounded-xl aspect-video"
      >
        {overlay.start}
        {overlay.label}
      </motion.div>
    </AnimatePresence>
  );
}
