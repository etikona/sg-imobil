export type Operation = "vanzare" | "chirie";
export type Category = "apartamente" | "case" | "garsoniere" | "camine" | "terenuri" | "comercial" | "altele";

export interface Property {
  id: string;
  slug: string;
  operation: Operation;
  /** Derived from listing structure on the source list page; verify against the source CMS. */
  category: Category;
  city?: string;
  district?: string;
  street?: string;
  priceEur: number;
  areaM2?: number;
  rooms?: number;
  floor?: number;
  floors?: number;
  bathrooms?: number;
  balconies?: number;
  series?: string;
  condition?: string;
  features: string[];
  description?: string;
  images: string[];
  sourceUrl: string;
  featured?: boolean;
}
