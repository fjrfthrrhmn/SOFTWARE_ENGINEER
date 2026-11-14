import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StudentConnect",
    short_name: "StudentConnect",
    description:
      "Platform informasi akademik untuk mahasiswa, dosen, dan admin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f5",
    theme_color: "#171717",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
