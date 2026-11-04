import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
export const metadata: Metadata = { title: "Servicii imobiliare în Chișinău | SG Imobil", description: "Consultație gratuită, vânzare, cumpărare, chirie, cadastru și intabulare, evaluare, administrare, schimb și suport juridic. Contactează SG Imobil.", alternates: { canonical: "/servicii" }, openGraph: { url: "/servicii" } };
const items = [
  ["Consultație gratuită", "Spune-ne ce cauți sau ce vrei să faci cu proprietatea ta și te orientăm spre următorul pas."],
  ["Cumpărare", "Asistență în alegerea proprietății și în parcurgerea tranzacției."],
  ["Chirie", "Sprijin pentru proprietarii și chiriașii care caută o înțelegere clară."],
  ["Vânzare", "Promovarea proprietății și suport până la finalizarea tranzacției."],
  ["Cadastru și intabulare", "Pregătirea și gestionarea documentelor de cadastru și intabulare."],
  ["Evaluare preventivă și oficială", "Estimare a valorii proprietății înainte de decizie sau evaluare oficială."],
  ["Administrare", "Administrarea proprietăților pentru proprietarii care preferă să delege."],
  ["Schimb", "Variante de schimb între proprietăți."],
  ["Suport juridic", "Suport juridic pe tot parcursul tranzacției."],
];
export default function Page() {
  return (
    <div className="wrap py-10">
      <Breadcrumbs items={[{ name: "Servicii", href: "/servicii" }]} />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Servicii</h1>
      <p className="mt-3 max-w-2xl text-muted">Oferta SG Imobil acoperă tranzacția de la prima consultație până la actele finale.</p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map(([h, p]) => <li key={h} className="rounded-lg border border-line bg-white p-6"><h2 className="font-semibold">{h}</h2><p className="mt-1.5 text-sm text-muted">{p}</p></li>)}</ul>
      <div className="mt-10 flex flex-wrap gap-3"><Link href="/contact" className="btn-primary">Contactează-ne</Link><Link href="/proprietati" className="btn-outline">Vezi proprietățile</Link></div>
    </div>
  );
}
