"use client";

import Icon from "@/component/icon";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InformationBlockBig({
  title,
  content,
}: {
  title: string;
  content: { title: string; content: string }[];
}) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <article className="relative w-full rounded-md px-6 py-4 flex flex-col justify-between shadow-information-block bg-[#FFFFFF] ">
      <div className="flex justify-between items-center h-8">
        <h2 className="sansation-bold text-xl">{title}</h2>
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
            className="flex flex-col gap-4 mt-8"
          >
            {content.map((item, index) => (
              <section key={`${item.title}-${index}`}>
                <h2 className="sansation-bold">{item.title}</h2>
                <p className="text-sm text-[#767676]">{item.content}</p>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
