"use client";

import Header from "@/component/header";
import Footer from "@/component/footer";
import { useTheme } from "@/context/theme-context";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const pathname = usePathname().split("/").pop() || "";
  const { theme } = useTheme();

  return (
    <main className="flex flex-col h-full">
      <Header params={params} currentPage={pathname} />
      <section className="flex flex-col grow">{children}</section>
      <Footer params={params} theme={theme} currentPage={pathname} />
    </main>
  );
}
