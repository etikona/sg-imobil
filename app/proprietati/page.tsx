import type { Metadata } from "next";
import { CollectionView } from "@/components/CollectionView";
import { parseFilters } from "@/lib/filter";

export const metadata: Metadata = {
  title: "Proprietăți de vânzare și de închiriat în Chișinău | SG Imobil",
  description: "Caută apartamente, case și alte proprietăți în Chișinău și în împrejurimi. Filtrează după tip, localitate, preț, camere și suprafață.",
  alternates: { canonical: "/proprietati" },
  openGraph: { url: "/proprietati", title: "Proprietăți în Chișinău | SG Imobil" },
};
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const values = parseFilters(await searchParams);
  return <CollectionView h1="Toate proprietățile" intro="Folosește filtrele pentru a găsi proprietatea potrivită, apoi solicită o vizionare." crumbs={[{ name: "Proprietăți", href: "/proprietati" }]} base={{}} values={values} />;
}
