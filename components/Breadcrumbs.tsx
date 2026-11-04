import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { site } from "@/lib/site";
export interface Crumb { name: string; href: string }
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Acasă", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i < all.length - 1 ? <Link href={c.href} className="underline-offset-4 hover:underline">{c.name}</Link> : <span aria-current="page" className="text-ink">{c.name}</span>}
            {i < all.length - 1 && <ChevronRight size={14} aria-hidden />}
          </li>
        ))}
      </ol>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: site.url + c.href })) }} />
    </nav>
  );
}
