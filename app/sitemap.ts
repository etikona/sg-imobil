import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { collections } from "@/lib/collections";
import { getAllProperties } from "@/lib/properties";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/proprietati", "/servicii", "/finantare", "/contact", ...Object.keys(collections).map((k) => `/proprietati/${k}`), ...getAllProperties().map((p) => `/proprietati/${p.slug}`)];
  return pages.map((p) => ({ url: site.url + p, lastModified: now }));
}
