import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
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

/*
 * Tip: download this photo, convert to WebP/AVIF (~2000px wide) and put it in
 * /public (e.g. "/images/hero.webp") for the best LCP. If you keep the remote URL,
 * add images.unsplash.com to `images.remotePatterns` in next.config.js.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80";

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

  return (
    <>
      {/* ================= HERO ================= */}
      <section aria-labelledby="hero-title" className="bg-forest text-white">
        <div className="relative isolate overflow-hidden bg-[#101715]">
          {/* Optimized, preloaded background (better LCP + indexable alt text) */}
          <Image
            src={HERO_IMAGE}
            alt="Casă modernă disponibilă prin agenția imobiliară din Chișinău"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />

          {/* Overlays: readable text on the left, photo stays visible on the right */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101715]/95 via-[#101715]/70 to-[#101715]/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101715]/85 via-transparent to-transparent" />

          <div className="wrap flex min-h-[600px] flex-col justify-between gap-16 pb-8 pt-28 lg:min-h-[700px] lg:pt-36">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                  aria-hidden
                />
                Agenție imobiliară în Chișinău
              </p>

              <h1
                id="hero-title"
                className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
              >
                {t.hero.title}
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-white/80 sm:text-lg">
                {t.hero.text}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/proprietati"
                  className="btn-light group inline-flex items-center gap-3"
                >
                  {t.hero.primary}
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t.hero.secondary}
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" aria-hidden />
                Chișinău, Moldova
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold" aria-hidden />
                Suport juridic pe tot parcursul tranzacției
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-gold" aria-hidden />
                Consultație gratuită
              </li>
            </ul>
          </div>
        </div>

        {/* Your existing SearchForm, overlapping the next section on desktop */}
        <div className="wrap pb-10 pt-6 lg:-mb-16 lg:pb-0 lg:pt-8">
          <SearchForm />
        </div>
      </section>

      {/* ================= FEATURED ================= */}
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

      {/* ================= SERVICES ================= */}
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

      {/* ================= OWNERS ================= */}
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

      {/* ================= FINANCING ================= */}
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

      {/* ================= WHY US ================= */}
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

      {/* ================= FINAL CTA ================= */}
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
