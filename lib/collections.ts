import type { Filters } from "@/lib/filter";
export interface Collection { slug: string; h1: string; title: string; description: string; filters: Filters }
export const collections: Record<string, Collection> = {
  "de-vanzare": { slug: "de-vanzare", h1: "Proprietăți de vânzare în Chișinău și împrejurimi", title: "Proprietăți de vânzare în Chișinău | SG Imobil", description: "Apartamente, case și alte proprietăți de vânzare în Chișinău și în împrejurimi. Filtrează după preț, camere și suprafață și contactează SG Imobil.", filters: { op: "vanzare" } },
  "de-inchiriat": { slug: "de-inchiriat", h1: "Proprietăți de închiriat în Chișinău", title: "Proprietăți de închiriat în Chișinău | SG Imobil", description: "Apartamente și alte proprietăți de închiriat în Chișinău. Vezi ofertele actuale și contactează agenția SG Imobil.", filters: { op: "chirie" } },
  apartamente: { slug: "apartamente", h1: "Apartamente în Chișinău", title: "Apartamente de vânzare și de închiriat în Chișinău | SG Imobil", description: "Apartamente de vânzare și de închiriat în Chișinău: Botanica, Centru, Ciocana, Buiucani și alte sectoare. Contactează SG Imobil.", filters: { cat: "apartamente" } },
  case: { slug: "case", h1: "Case de vânzare în Chișinău și împrejurimi", title: "Case de vânzare în Chișinău și împrejurimi | SG Imobil", description: "Case de vânzare în Chișinău și în localitățile din apropiere. Vezi detaliile și solicită o vizionare prin SG Imobil.", filters: { cat: "case" } },
};
