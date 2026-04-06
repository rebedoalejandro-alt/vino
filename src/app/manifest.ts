import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Casa del Vino",
    short_name: "Casa del Vino",
    description:
      "Tu tienda de vinos online. Descubre nuestra selección de vinos premium de las mejores bodegas de España. Envío gratis a partir de 150€.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    theme_color: "#F5C518",
    background_color: "#ffffff",
    prefer_related_applications: false,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["shopping", "food & drink"],
    screenshots: [
      {
        src: "/screenshot-540x720.png",
        sizes: "540x720",
        type: "image/png",
      },
      {
        src: "/screenshot-1280x720.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
  };
}
