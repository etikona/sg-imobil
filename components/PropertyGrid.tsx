import Link from "next/link";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { t } from "@/lib/i18n";
export function PropertyGrid({ items }: { items: Property[] }) {
  if (!items.length)
    return (
      <div role="status" className="rounded-lg border border-dashed border-ink/25 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">{t.empty.title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">{t.empty.text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/proprietati" className="btn-outline">{t.search.reset}</Link><Link href="/contact" className="btn-primary">Spune-ne ce cauți</Link></div>
      </div>
    );
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((p, i) => <PropertyCard key={p.id} p={p} priority={i < 3} />)}</div>;
}
