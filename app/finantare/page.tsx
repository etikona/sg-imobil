import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Finanțare și Prima Casă Plus | SG Imobil", description: "Află cum te poate ajuta SG Imobil cu credit ipotecar și programul guvernamental Prima Casă Plus. Confirmă condițiile actuale cu agenția sau cu banca.", alternates: { canonical: "/finantare" }, openGraph: { url: "/finantare" } };
export default function Page() {
  return (
    <div className="wrap max-w-4xl py-10">
      <Breadcrumbs items={[{ name: "Finanțare", href: "/finantare" }]} />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Finanțare și Prima Casă Plus</h1>
      <p className="mt-4 max-w-2xl text-muted">Atât pentru programele guvernamentale, precum Prima Casă, cât și pentru un credit ipotecar obișnuit, SG-IMOBILGROUP SRL colaborează cu companii de finanțare și microfinanțare partenere.</p>
      <div role="note" className="mt-6 flex gap-3 rounded-lg border border-gold/60 bg-white p-4 text-sm"><Info size={18} className="mt-0.5 shrink-0 text-forest" aria-hidden /><p>Informațiile de mai jos sunt preluate de pe site-ul SG Imobil și pot fi învechite. <strong>Confirmă condițiile actuale (inclusiv dobânda și comisioanele) cu agenția sau cu banca.</strong></p></div>

      <h2 className="mt-12 text-2xl font-semibold">Programul Prima Casă Plus</h2>
      <p className="mt-3 text-muted">Program guvernamental dedicat familiilor din Republica Moldova, pentru condiții mai bune de locuit. Pe scurt, conform informațiilor publicate de SG Imobil:</p>
      <ul className="mt-5 list-disc space-y-2 pl-5">
        <li>solicitantul este cetățean al Republicii Moldova, cu venit stabil din surse oficiale;</li>
        <li>vârsta de la 18 ani până la vârsta de pensionare;</li>
        <li>termenul maxim al creditului este de 30 de ani;</li>
        <li>valoarea locuinței este de până la 2,5 milioane de lei;</li>
        <li>programul include și anumite profesii liberale, nu doar angajați.</li>
      </ul>
      <p className="mt-4 text-sm text-muted">Eligibilitatea depinde și de locuințele deținute deja și de starea imobilului. Detaliile complete — inclusiv documentele necesare — sunt pe <a className="underline" href="https://www.sgimobil.md/Article/3/Prima%20Cas%C4%83%20Plus" target="_blank" rel="noopener noreferrer">pagina originală Prima Casă Plus</a>.</p>

      <div className="mt-10 rounded-xl bg-forest p-8 text-white">
        <h2 className="text-2xl font-semibold">Vrei să știi dacă te califici?</h2>
        <p className="mt-2 text-white/85">Sună-ne sau scrie-ne și te îndrumăm pas cu pas.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a href={`tel:${site.primaryPhone.href}`} className="btn-light"><Phone size={16} aria-hidden />{site.primaryPhone.display}</a><Link href="/contact" className="btn-outline-light">Trimite o cerere</Link></div>
      </div>
    </div>
  );
}
