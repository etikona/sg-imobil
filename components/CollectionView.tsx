import { SearchForm } from "./SearchForm";
import { PropertyGrid } from "./PropertyGrid";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { applyFilters, type Filters } from "@/lib/filter";
import { getAllProperties } from "@/lib/properties";
import { propertyTitle } from "@/lib/format";
import { site } from "@/lib/site";

export function CollectionView({ h1, intro, crumbs, base, values }: { h1: string; intro?: string; crumbs: Crumb[]; base: Filters; values: Filters }) {
  const items = applyFilters(getAllProperties(), { ...values, ...base });
  return (
    <div className="wrap py-10">
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{h1}</h1>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
      <div className="mt-8"><SearchForm advanced values={{ ...values, ...base }} /></div>
      <p className="mt-8 text-sm text-muted" role="status" aria-live="polite">{items.length} {items.length === 1 ? "proprietate găsită" : "proprietăți găsite"}</p>
      <div className="mt-4"><PropertyGrid items={items} /></div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: propertyTitle(p), url: `${site.url}/proprietati/${p.slug}` })) }} />
    </div>
  );
}
