import type { Metadata } from "next";
import "./[lng]/globals.css";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-[100svh] overflow-hidden">
      <body className="h-full flex flex-col sansation overflow-hidden">
        {children}
      </body>
    </html>
  );
}
