import type { Metadata } from "next";
import "./[lng]/globals.css";
import Head from "next/head";

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
      <Head>
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo/light.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/light.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo/light.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo/light.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo/light.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/logo/light.png" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="❤️ U Festival" />
        <meta
          property="og:description"
          content="❤️ U Festival. An addition to the UIT, for (new) students in the Utrecht region"
        />
        <meta property="og:site_name" content="❤️ U Festival" />
        {/* 
        <!-- apple splash screen images -->
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='2048x2732' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='1668x2224' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='1536x2048' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='1125x2436' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='1242x2208' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='750x1334' />
        <link rel='apple-touch-startup-image' href='/logo/light.png' sizes='640x1136' />
        */}
      </Head>
      <body className="h-full flex flex-col sansation overflow-hidden">
        {children}
      </body>
    </html>
  );
}
