import { ThemeProvider } from "@/context/theme-context";
import { OverlayProvider } from "@/context/overlay-context";
import type { Metadata } from "next";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import "./globals.css";
import MainLayout from "@/layout/main-layout";
import { DayProvider } from "@/context/day-context";

export const metadata: Metadata = {
  title: "❤️ U Festival",
  description:
    "❤️ U Festival. An addition to the UIT, for (new) students in the Utrecht region",
  generator: "Next.js",
  manifest: "/manifest.ts",
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
    <html lang={lng} dir={dir(lng)} className="h-[100svh] overflow-hidden">
      <body className="h-full flex flex-col sansation overflow-hidden">
        <DayProvider>
          <ThemeProvider>
            <OverlayProvider>
              <MainLayout params={params}>{children}</MainLayout>
            </OverlayProvider>
          </ThemeProvider>
        </DayProvider>
      </body>
    </html>
  );
}
