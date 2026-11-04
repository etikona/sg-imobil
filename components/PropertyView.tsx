import Image from "next/image";
import Link from "next/link";
import { Phone, ExternalLink, Check } from "lucide-react";
import type { Property } from "@/lib/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { InquiryForm } from "./InquiryForm";
import { PropertyCard } from "./PropertyCard";
import { PropertyImage } from "./PropertyImage";
import { JsonLd } from "./JsonLd";
import { categoryLabel, floorLabel, formatPrice, locationLabel, propertyDescription, propertyTitle } from "@/lib/format";
import { getRelated } from "@/lib/properties";
import { site } from "@/lib/site";

export function PropertyView({ p }: { p: Property }) {
  const specs: [string, string | undefined][] = [
    ["Operațiune", p.operation === "chirie" ? "Închiriere" : "Vânzare"],
    ["Tip", categoryLabel(p)],
    ["Camere", p.rooms?.toString()],
    ["Suprafață", p.areaM2 ? `${p.areaM2} m²` : undefined],
    ["Etaj", floorLabel(p)],
    ["Blocuri sanitare", p.bathrooms?.toString()],
    ["Balcoane", p.balconies?.toString()],
    ["Planificare", p.series],
    ["Adresă", [p.street, p.district, p.city].filter(Boolean).join(", ") || undefined],
  ];
  const related = getRelated(p);
  const rest = p.images.slice(1);
  return (
    <div className="wrap py-10 pb-28 lg:pb-10">
      <Breadcrumbs items={[{ name: "Proprietăți", href: "/proprietati" }, { name: p.operation === "chirie" ? "De închiriat" : "De vânzare", href: p.operation === "chirie" ? "/proprietati/de-inchiriat" : "/proprietati/de-vanzare" }, { name: propertyTitle(p), href: `/proprietati/${p.slug}` }]} />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{propertyTitle(p)}</h1>
      <p className="mt-2 text-muted">{locationLabel(p)}{p.street ? ` · ${p.street}` : ""}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_.6fr]">
        <div>
          <div className="overflow-hidden rounded-xl"><PropertyImage p={p} priority sizes="(min-width:1024px) 60vw, 100vw" /></div>
          {rest.length > 0 && <div className="mt-3 grid grid-cols-3 gap-3">{rest.map((src, i) => <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg"><Image src={src} alt={`${propertyTitle(p)} — fotografia ${i + 2}`} fill sizes="20vw" className="object-cover" /></div>)}</div>}
          <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-forest underline-offset-4 hover:underline">Vezi toate fotografiile pe site-ul original<ExternalLink size={14} aria-hidden /></a>

          <h2 className="mt-10 text-xl font-semibold">Caracteristici</h2>
          <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {specs.filter(([, v]) => v).map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-line py-3 text-sm"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}
          </dl>
          {p.features.length > 0 && (<>
            <h2 className="mt-10 text-xl font-semibold">Dotări și vecinătăți</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">{p.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><Check size={16} className="text-forest" aria-hidden />{f}</li>)}</ul>
          </>)}
          {p.description && <><h2 className="mt-10 text-xl font-semibold">Descriere</h2><p className="mt-4 leading-relaxed">{p.description}</p></>}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-6">
            <p className="text-3xl font-semibold">{formatPrice(p)}</p>
            <a href={`tel:${site.primaryPhone.href}`} className="btn-primary mt-5 w-full"><Phone size={16} aria-hidden />{site.primaryPhone.display}</a>
            <div id="vizionare" className="mt-6 border-t border-line pt-6">
              <h2 className="text-lg font-semibold">Solicită o vizionare</h2>
              <p className="mb-4 mt-1 text-sm text-muted">Cererea ta va fi asociată proprietății {p.id}.</p>
              <InquiryForm kind="property" propertyId={p.id} propertySlug={p.slug} submitLabel="Solicită o vizionare" idPrefix="viz" />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && <section aria-labelledby="rel" className="mt-16"><h2 id="rel" className="text-2xl font-semibold">Proprietăți similare</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PropertyCard key={r.id} p={r} />)}</div></section>}

      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
        <a href={`tel:${site.primaryPhone.href}`} className="btn-outline flex-1"><Phone size={16} aria-hidden />Sună</a>
        <Link href="#vizionare" className="btn-primary flex-[2]">Solicită o vizionare</Link>
      </div>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "RealEstateListing", name: propertyTitle(p), description: propertyDescription(p), url: `${site.url}/proprietati/${p.slug}`, image: p.images.length ? p.images : undefined,
        offers: { "@type": "Offer", price: p.priceEur, priceCurrency: "EUR" },
        about: { "@type": p.category === "apartamente" ? "Apartment" : p.category === "case" ? "House" : "Residence", numberOfRooms: p.rooms, floorSize: p.areaM2 ? { "@type": "QuantitativeValue", value: p.areaM2, unitCode: "MTK" } : undefined, address: { "@type": "PostalAddress", addressLocality: p.city ?? p.district, streetAddress: p.street, addressCountry: "MD" } } }} />
    </div>
  );
}
