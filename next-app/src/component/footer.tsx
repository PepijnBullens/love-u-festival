import Link from "next/link";
import Icon from "@/component/icon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Footer({
  params,
  theme,
  currentPage,
}: {
  params: { lng: string };
  theme: string;
  currentPage: string;
}) {
  const [lng, setLng] = useState<string>("");

  useEffect(() => {
    async function fetchLanguage() {
      const { lng } = await params;
      setLng(lng);
    }
    fetchLanguage();
  }, [params]);

  const items = ["information", "map", "schedule"];
  const currentPosition = items.indexOf(currentPage) - 1;

  return (
    <footer className="relative w-full flex justify-center items-center p-8 gap-8 bg-[#FFFFFF]">
      <motion.div
        initial={{
          x: `${currentPosition * (54 + 24)}px`,
        }}
        animate={{
          x: `${currentPosition * (54 + 24)}px`,
        }}
        className="w-[54px] z-10 left-1/2 top-1/2 rounded-xl -translate-1/2 aspect-square bg-[#000000] absolute"
      ></motion.div>
      {items.map((item) => (
        <Link key={item} href={`/${lng}/${item}`} className="z-50">
          <Icon
            name={item}
            width={46}
            height={46}
            themeMode={true}
            reversed={currentPage === item}
          />
        </Link>
      ))}
    </footer>
  );
}
