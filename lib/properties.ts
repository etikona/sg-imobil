import { properties } from "@/lib/data/properties";
import type { Property } from "@/lib/types";
// Single access point: swap these for CMS/API calls (make them async) later.
export const getAllProperties = (): Property[] => properties;
export const getPropertyBySlug = (slug: string) => properties.find((p) => p.slug === slug);
export const getFeatured = () => properties.filter((p) => p.featured);
export const getRelated = (p: Property, n = 3) =>
  properties.filter((x) => x.id !== p.id && x.operation === p.operation && x.category === p.category)
    .sort((a, b) => Math.abs(a.priceEur - p.priceEur) - Math.abs(b.priceEur - p.priceEur)).slice(0, n);
export const getLocations = () => [...new Set(properties.map((p) => p.district ?? p.city).filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "ro"));
