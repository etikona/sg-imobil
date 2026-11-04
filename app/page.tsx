import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Scale,
  FileText,
  Home,
  KeyRound,
  Handshake,
  Landmark,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import { PropertyCard } from "@/components/PropertyCard";
import { InquiryForm } from "@/components/InquiryForm";
import { getFeatured } from "@/lib/properties";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";

export const metadata = { alternates: { canonical: "/" } };

const services = [
  {
    i: Home,
    title: "Cumpărare",
    text: "Te ajutăm să alegi dintre ofertele disponibile și să parcurgi pașii tranzacției fără surprize.",
  },
  {
    i: KeyRound,
    title: "Chirie",
    text: "Găsești mai ușor o proprietate de închiriat sau un chiriaș potrivit pentru proprietatea ta.",
  },
  {
    i: Handshake,
    title: "Vânzare",
    text: "Promovăm proprietatea ta și te sprijinim până la semnarea actelor.",
  },
  {
    i: FileText,
    title: "Cadastru și intabulare",
    text: "Ne ocupăm de documentele necesare, ca tu să te concentrezi pe decizie.",
  },
  {
    i: Scale,
    title: "Suport juridic",
    text: "Consultanță juridică pe tot parcursul tranzacției, de la prima discuție până la final.",
  },
  {
    i: Landmark,
    title: "Evaluare, administrare, schimb",
    text: "Evaluare preventivă și oficială, administrarea proprietății și variante de schimb.",
  },
];

export default function HomePage() {
  const featured = getFeatured();
  const hero = featured[0];
  console.log(hero);
  return (
    <>
      <section className="bg-forest text-white">
        <div className="wrap grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Agenție imobiliară · Chișinău
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {t.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/proprietati" className="btn-light">
                {t.hero.primary}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/contact" className="btn-outline-light">
                {t.hero.secondary}
              </Link>
            </div>
          </div>
          {hero?.images[0] && (
            <Link
              href={`/proprietati/${hero.slug}`}
              className="group relative hidden aspect-[4/3] overflow-hidden rounded-xl lg:block"
              aria-label="Vezi proprietatea recomandată"
            >
              <Image
                src={hero.images[0]}
                alt="Fotografie a unui apartament listat de SG Imobil în Botanica, Chișinău"
                fill
                priority
                sizes="40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          )}
        </div>

        <div className="wrap pb-10 lg:-mb-16 lg:pb-0">
          <SearchForm />
        </div>
      </section>

      <section aria-labelledby="featured" className="wrap pt-16 lg:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selecție din catalog</p>
            <h2 id="featured" className="h2 mt-2">
              {t.featured.title}
            </h2>
          </div>
          <Link href="/proprietati" className="btn-outline">
            {t.featured.all}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} p={p} priority={i < 3} />
          ))}
        </div>
      </section>

      <section aria-labelledby="services" className="wrap pt-24">
        <p className="eyebrow">Oferta noastră</p>
        <h2 id="services" className="h2 mt-2 max-w-2xl">
          Consultație gratuită și suport pe tot parcursul tranzacției
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="border-t border-ink/15 pt-5">
              <s.i className="text-forest" size={22} aria-hidden />
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/servicii"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline-offset-4 hover:underline"
        >
          Toate serviciile
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section id="vinde" aria-labelledby="owner" className="mt-24 bg-white">
        <div className="wrap grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Pentru proprietari</p>
            <h2 id="owner" className="h2 mt-2">
              {t.owner.title}
            </h2>
            <p className="mt-4 max-w-md text-muted">{t.owner.text}</p>
            <a
              href={`tel:${site.primaryPhone.href}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-forest"
            >
              <Phone size={18} aria-hidden />
              {site.primaryPhone.display}
            </a>
          </div>
          <div className="rounded-xl border border-line bg-paper p-6">
            <InquiryForm kind="owner" submitLabel={t.owner.cta} />
          </div>
        </div>
      </section>

      <section aria-labelledby="fin" className="wrap pt-24">
        <div className="grid gap-8 rounded-xl bg-forest p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              Finanțare
            </p>
            <h2
              id="fin"
              className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Prima Casă Plus și credit ipotecar
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Prima Casă Plus este un program guvernamental dedicat familiilor
              din Republica Moldova. SG Imobil colaborează cu companii de
              finanțare partenere și te îndrumă în alegerea soluției potrivite.
            </p>
            <p className="mt-3 text-sm text-white/70">
              Condițiile programului se pot modifica. Confirmă condițiile
              actuale cu agenția sau cu banca.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/finantare" className="btn-light">
              Detalii despre finanțare
            </Link>
            <a
              href={`tel:${site.primaryPhone.href}`}
              className="btn-outline-light"
            >
              <Phone size={16} aria-hidden />
              Cere îndrumare
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="why" className="wrap pt-24">
        <p className="eyebrow">De ce SG Imobil</p>
        <h2 id="why" className="h2 mt-2">
          Sprijin clar, de la prima discuție până la act
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              i: ShieldCheck,
              h: "Suport juridic",
              p: "Consultanță juridică pe tot parcursul tranzacției.",
            },
            {
              i: Landmark,
              h: "Parteneri de finanțare",
              p: "Lucrăm cu bănci și companii de finanțare pentru credite ipotecare și Prima Casă.",
            },
            {
              i: Clock,
              h: "Birou în Chișinău",
              p: "Te așteptăm pe Bd. Negruzzi 10, de luni până sâmbătă, conform programului.",
            },
          ].map((x) => (
            <li
              key={x.h}
              className="rounded-lg border border-line bg-white p-6"
            >
              <x.i className="text-forest" aria-hidden />
              <h3 className="mt-3 font-semibold">{x.h}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="final" className="wrap pt-24">
        <div className="rounded-xl border border-line bg-white p-8 text-center sm:p-14">
          <h2 id="final" className="h2 mx-auto max-w-2xl">
            {t.final.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t.final.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              {t.final.primary}
            </Link>
            <Link href="/proprietati" className="btn-outline">
              {t.final.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
