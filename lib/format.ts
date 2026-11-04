import type { Property } from "@/lib/types";
import { t } from "@/lib/i18n";

export const formatPrice = (p: Property) =>
  `${String(p.priceEur).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")}\u00A0€${p.operation === "chirie" ? " / lună" : ""}`;

export const locationLabel = (p: Property) =>
  [p.district, p.city].filter(Boolean).join(", ") || p.street || "Moldova";

export const floorLabel = (p: Property) => {
  if (p.floor === undefined) return p.floors ? `${p.floors} ${p.floors === 1 ? "nivel" : "niveluri"}` : undefined;
  if (p.floor === 0) return "Parter";
  return p.floors && p.floors >= p.floor ? `Etaj ${p.floor}/${p.floors}` : `Etaj ${p.floor}`;
};

const typeWord = { apartamente: "Apartament", case: "Casă", altele: "Proprietate", garsoniere: "Garsonieră", camine: "Cameră în cămin", terenuri: "Teren", comercial: "Spațiu comercial" } as const;
export const propertyTitle = (p: Property) => {
  const loc = [p.district, p.city].filter(Boolean).join(", ");
  const rooms = p.rooms ? ` cu ${p.rooms} ${p.rooms === 1 ? "cameră" : "camere"}` : "";
  return `${typeWord[p.category]}${rooms} ${p.operation === "chirie" ? "de închiriat" : "de vânzare"}${loc ? ` în ${loc}` : p.street ? `, ${p.street}` : ""}`;
};
export const propertyDescription = (p: Property) =>
  `Descoperă ${propertyTitle(p).replace(/^./, (c) => c.toLowerCase())}${p.areaM2 ? `, ${p.areaM2} m²` : ""}. Vezi detaliile proprietății și contactează SG Imobil pentru informații sau o vizionare.`;
export const categoryLabel = (p: Property) => t.categories[p.category];
