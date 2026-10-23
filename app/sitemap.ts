import type { MetadataRoute } from "next";

const BASE = "https://www.tealisdata.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/consulting", priority: 0.9 },
    { path: "/training", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/contact/meet", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/cookie-policy", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: `${BASE}${path}`, changeFrequency: "monthly", priority }));
}
