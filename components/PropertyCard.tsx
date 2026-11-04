import Link from "next/link";
import { BedDouble, Ruler, Layers, MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { categoryLabel, floorLabel, formatPrice, locationLabel, propertyTitle } from "@/lib/format";
import { PropertyImage } from "./PropertyImage";
import { t } from "@/lib/i18n";
export function PropertyCard({ p, priority = false }: { p: Property; priority?: boolean }) {
  const meta = [
    p.rooms ? { i: BedDouble, v: `${p.rooms} ${p.rooms === 1 ? "cameră" : "camere"}` } : null,
    p.areaM2 ? { i: Ruler, v: `${p.areaM2} m²` } : null,
    floorLabel(p) ? { i: Layers, v: floorLabel(p)! } : null,
  ].filter(Boolean) as { i: typeof Ruler; v: string }[];
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      <Link href={`/proprietati/${p.slug}`} aria-label={propertyTitle(p)} tabIndex={-1}><PropertyImage p={p} priority={priority} /></Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide">
          <span className="text-forest">{categoryLabel(p)}</span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-ink">{p.operation === "chirie" ? "De închiriat" : "De vânzare"}</span>
        </div>
        <p className="mt-3 text-2xl font-semibold">{formatPrice(p)}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin size={14} aria-hidden />{locationLabel(p)}{p.street ? ` · ${p.street}` : ""}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/80">
          {meta.map((m) => <li key={m.v} className="flex items-center gap-1.5"><m.i size={15} aria-hidden />{m.v}</li>)}
        </ul>
        <Link href={`/proprietati/${p.slug}`} className="btn-outline mt-5 w-full">{t.featured.details}<span className="sr-only"> — {propertyTitle(p)}</span></Link>
      </div>
    </article>
  );
}
