"use client";

import Header from "@/component/header";
import Footer from "@/component/footer";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/theme-context";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const pathname = usePathname().split("/").pop() || "";
  const { theme } = useTheme();

  return (
    <main
      className={`
      ${
        theme === "light"
          ? pathname === "information"
            ? "blue-gradient"
            : pathname === "schedule"
            ? "red-gradient"
            : ""
          : null
      }
    flex flex-col h-full`}
    >
      <Header params={params} currentPage={pathname} />
      <section className="flex flex-col h-[80svh] overflow-auto">
        {children}
      </section>
      <Footer params={params} currentPage={pathname} />
    </main>
  );
}
