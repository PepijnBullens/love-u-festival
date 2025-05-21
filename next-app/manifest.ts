import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "❤️ U Festival",
    short_name: "❤️UF",
    description:
      "❤️ U Festival. An addition to the UIT, for (new) students in the Utrecht region",
    start_url: "/en/information",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo/light.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/light.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
