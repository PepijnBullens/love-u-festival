"use client";

import Icon from "@/component/icon";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InformationBlock({
  title,
  content,
  icon = null,
  iconCentered = false,
  collapsible = false,
}: {
  title: string;
  content: string;
  icon: React.ReactNode | null;
  iconCentered: boolean;
  collapsible: boolean;
}) {
  const [collapsed, setCollapsed] = useState<null | boolean>(null);

  useEffect(() => {
    if (collapsible && collapsed === null) setCollapsed(true);
  }, [collapsible]);

  const toggle = () => {
    if (!collapsible) return;
    setCollapsed(!collapsed);
  };

  return (
    <article className="relative w-full rounded-md px-6 py-4 flex flex-col justify-between shadow-information-block bg-[#FFFFFF] ">
      <div className="flex justify-between items-center h-8">
        <h2 className="sansation-bold text-xl">{title}</h2>
        {collapsible ? (
          <motion.div
            initial={{
              rotateX: collapsed ? "0deg" : "180deg",
            }}
            animate={{
              rotateX: collapsed ? "0deg" : "180deg",
            }}
            className="cursor-pointer"
            onClick={toggle}
          >
            <Icon
              name="arrow-down"
              width={24}
              height={24}
              themeMode={true}
              reversed={false}
            />
          </motion.div>
        ) : (
          icon && (
            <div
              className={
                iconCentered ? "absolute right-6 top-1/2 -translate-y-1/2" : ""
              }
            >
              {icon}
            </div>
          )
        )}
      </div>
      <AnimatePresence initial={false} mode="wait">
        {!collapsed && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
          >
            <p className="text-sm text-[#767676] max-w-[calc(100%-(1.5rem+24px))]">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
