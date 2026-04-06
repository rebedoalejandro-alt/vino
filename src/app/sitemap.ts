import { MetadataRoute } from "next";

// Mock data for products - in production, fetch from your database
const mockProducts = [
  { id: "1", slug: "reserva-especial-2020" },
  { id: "2", slug: "tinto-crianza-2019" },
  { id: "3", slug: "blanco-fresco-2023" },
  { id: "4", slug: "rosado-premium-2022" },
  { id: "5", slug: "espumoso-brut-2021" },
];

const mockBodegas = [
  { id: "1", slug: "bodega-marqués" },
  { id: "2", slug: "bodega-torres" },
  { id: "3", slug: "bodega-san-isidro" },
  { id: "4", slug: "bodega-fuenmayor" },
];

const mockRegions = [
  { id: "1", slug: "rioja" },
  { id: "2", slug: "penedes" },
  { id: "3", slug: "ribera-del-duero" },
  { id: "4", slug: "riojas-alavesa" },
];

const mockBlogPosts = [
  { id: "1", slug: "maridaje-vinos-quesos" },
  { id: "2", slug: "como-degustar-un-vino" },
  { id: "3", slug: "vinos-naturales-guia" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://casadelvino.com";
  const today = new Date().toISOString().split("T")[0];

  const routes: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },

    // Wine type pages
    {
      url: `${baseUrl}/vino/tinto`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vino/blanco`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vino/rosado`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vino/espumoso`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vinos-ecologicos`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Individual product pages
    ...mockProducts.map((product) => ({
      url: `${baseUrl}/vinos/${product.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Bodega pages
    {
      url: `${baseUrl}/bodega`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...mockBodegas.map((bodega) => ({
      url: `${baseUrl}/bodega/${bodega.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Region pages
    {
      url: `${baseUrl}/region`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...mockRegions.map((region) => ({
      url: `${baseUrl}/region/${region.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Blog pages
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...mockBlogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Static pages
    {
      url: `${baseUrl}/quienes-somos`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ayuda`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donde-esta-mi-pedido`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gastos-de-envio`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return routes;
}
