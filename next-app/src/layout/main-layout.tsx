"use client";

import Header from "@/component/header";
import Footer from "@/component/footer";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const pathname = usePathname().split("/").pop() || "";

  return (
    <main
      className={`
      ${
        pathname === "information"
          ? "blue-gradient"
          : pathname === "schedule"
          ? "red-gradient"
          : ""
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
