"use client";

import { useTheme } from "@/context/theme-context";
import Icon from "@/component/icon";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#000000" : "#FFFFFF",
      }}
      className="w-[3rem] relative aspect-square rounded-xl shadow-icon cursor-pointer overflow-hidden transition-colors"
    >
      <motion.div
        initial={{
          x: theme === "dark" ? "0%" : "-200%",
        }}
        animate={{
          x: theme === "dark" ? "0%" : "-200%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-1/2"
      >
        <Icon
          name="light-mode"
          width={24}
          height={24}
          themeMode={false}
          reversed={false}
        />
      </motion.div>

      <motion.div
        initial={{
          x: theme === "dark" ? "200%" : "0%",
        }}
        animate={{
          x: theme === "dark" ? "200%" : "0%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-1/2"
      >
        <Icon
          name="dark-mode"
          width={24}
          height={24}
          themeMode={false}
          reversed={false}
        />
      </motion.div>
    </div>
  );
}
