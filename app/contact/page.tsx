import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Contact | SG Imobil — Agenție imobiliară Chișinău", description: "Contactează SG Imobil: Bd. Negruzzi 10, Chișinău. Program luni–vineri 09:00–18:30, sâmbătă 09:00–14:00. Sună sau trimite o cerere.", alternates: { canonical: "/contact" }, openGraph: { url: "/contact" } };
export default function Page() {
  return (
    <div className="wrap py-10">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <address className="space-y-6 not-italic">
          <p className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-forest" size={20} aria-hidden /><span>mun. {site.address.city}, {site.address.street}</span></p>
          <div className="flex gap-3"><Phone className="mt-0.5 shrink-0 text-forest" size={20} aria-hidden /><ul className="space-y-1">{site.contacts.map((c) => <li key={c.href}><a className="font-medium underline-offset-4 hover:underline" href={`tel:${c.href}`}>{c.display}</a> <span className="text-sm text-muted">— {c.name}</span></li>)}</ul></div>
          <div className="flex gap-3"><Clock className="mt-0.5 shrink-0 text-forest" size={20} aria-hidden /><ul>{site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}</ul></div>
        </address>
        <div className="rounded-xl border border-line bg-white p-6"><h2 className="mb-4 text-xl font-semibold">Spune-ne ce cauți</h2><InquiryForm kind="contact" submitLabel="Trimite cererea" /></div>
      </div>
    </div>
  );
}
