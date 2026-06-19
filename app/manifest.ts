import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f4f1ea",
    description:
      "Kuzey Kıbrıs SPC parke, SPC duvar paneli, banyo paneli, 3D panel ve proje uygulama planlaması.",
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/aelogo.png?v=3",
        type: "image/png",
      },
    ],
    name: "Adem Eren Decoration",
    short_name: "AE Dekorasyon",
    start_url: "/",
    theme_color: "#17191f",
  };
}
