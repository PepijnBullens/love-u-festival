import { ThemeProvider } from "@/context/theme-context";
import { OverlayProvider } from "@/context/overlay-context";
import type { Metadata } from "next";
import { languages } from "../i18n/settings";
import "./globals.css";
import MainLayout from "@/layout/main-layout";
import { DayProvider } from "@/context/day-context";
import LangSetter from "@/components/lang-setter";

export const metadata: Metadata = {
  title: "❤️ U Festival",
  description:
    "❤️ U Festival. An addition to the UIT, for (new) students in the Utrecht region",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "/logo/light.png" },
    { rel: "icon", url: "/logo/light.png" },
  ],
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;

  return (
    <>
      <LangSetter lng={lng} />

      <DayProvider>
        <ThemeProvider>
          <OverlayProvider>
            <MainLayout params={params}>{children}</MainLayout>
          </OverlayProvider>
        </ThemeProvider>
      </DayProvider>
    </>
  );
}
