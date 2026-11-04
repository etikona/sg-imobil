import Link from "next/link";
import { Logo } from "./Header";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1"><Logo light /><p className="mt-4 text-sm leading-relaxed">Agenție imobiliară în Chișinău. Consultație, vânzare, cumpărare, chirie și suport juridic pe tot parcursul tranzacției.</p></div>
        <div><h2 className="text-sm font-semibold text-white">Navigare</h2><ul className="mt-4 space-y-2 text-sm">
          {[["/", t.nav.home], ["/proprietati", "Toate proprietățile"], ["/servicii", t.nav.services], ["/finantare", t.nav.financing], ["/contact", t.nav.contact]].map(([h, l]) => <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>)}
        </ul></div>
        <div><h2 className="text-sm font-semibold text-white">Categorii</h2><ul className="mt-4 space-y-2 text-sm">
          {[["/proprietati/apartamente", "Apartamente"], ["/proprietati/case", "Case"], ["/proprietati/de-vanzare", "De vânzare"], ["/proprietati/de-inchiriat", "De închiriat"]].map(([h, l]) => <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>)}
        </ul></div>
        <div><h2 className="text-sm font-semibold text-white">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>mun. {site.address.city}, {site.address.street}</p>
            {site.contacts.map((c) => <p key={c.href}><a href={`tel:${c.href}`} className="hover:text-white">{c.display}</a></p>)}
            {site.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs">
          <p>© {new Date().getFullYear()} {site.legalName}. Toate drepturile rezervate.</p>
          {/* TODO(client): link real Privacy Policy / Cookie Policy pages once the texts are provided. */}
          <p>Politica de confidențialitate și politica de cookie-uri — în curând.</p>
        </div>
      </div>
    </footer>
  );
}
