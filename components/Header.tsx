import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { t } from "@/lib/i18n";
import { site } from "@/lib/site";
export const navItems = [
  { href: "/proprietati/de-vanzare", label: t.nav.buy },
  { href: "/proprietati/de-inchiriat", label: t.nav.rent },
  { href: "/#vinde", label: t.nav.sell },
  { href: "/finantare", label: t.nav.financing },
  { href: "/servicii", label: t.nav.services },
  { href: "/contact", label: t.nav.contact },
];
export function Logo({ light = false }: { light?: boolean }) {
  // TODO(client): replace with the official logo file (e.g. /public/logo.svg) — none could be retrieved.
  return <span className={`text-xl font-semibold tracking-tight ${light ? "text-white" : "text-forest"}`}>SG<span className="text-gold"> Imobil</span></span>;
}
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="SG Imobil — pagina principală"><Logo /></Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {navItems.map((i) => <Link key={i.href} href={i.href} className="text-sm font-medium text-ink/80 hover:text-forest">{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.primaryPhone.href}`} className="btn-primary hidden sm:inline-flex"><Phone size={16} aria-hidden />{site.primaryPhone.display}</a>
          <details className="group relative lg:hidden">
            <summary className="btn-outline cursor-pointer list-none px-3" aria-label="Meniu"><Menu size={20} aria-hidden /></summary>
            <nav aria-label="Mobil" className="absolute right-0 mt-2 w-64 rounded-lg border border-line bg-white p-2 shadow-lg">
              {navItems.map((i) => <Link key={i.href} href={i.href} className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-paper">{i.label}</Link>)}
              <a href={`tel:${site.primaryPhone.href}`} className="btn-primary mt-2 w-full"><Phone size={16} aria-hidden />{t.nav.call}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
