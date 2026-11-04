import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/CollectionView";
import { PropertyView } from "@/components/PropertyView";
import { collections } from "@/lib/collections";
import { getAllProperties, getPropertyBySlug } from "@/lib/properties";
import { propertyDescription, propertyTitle } from "@/lib/format";

export const dynamicParams = false;
export const generateStaticParams = () => [...Object.keys(collections), ...getAllProperties().map((p) => p.slug)].map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collections[slug];
  const url = `/proprietati/${slug}`;
  if (c) return { title: c.title, description: c.description, alternates: { canonical: url }, openGraph: { url, title: c.title, description: c.description }, twitter: { title: c.title, description: c.description } };
  const p = getPropertyBySlug(slug);
  if (!p) return {};
  const title = `${propertyTitle(p)} | SG Imobil`;
  const description = propertyDescription(p);
  return { title, description, alternates: { canonical: url }, openGraph: { url, title, description, type: "website", images: p.images[0] ? [{ url: p.images[0] }] : undefined }, twitter: { card: "summary_large_image", title, description } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collections[slug];
  if (c) return <CollectionView h1={c.h1} crumbs={[{ name: "Proprietăți", href: "/proprietati" }, { name: c.h1, href: `/proprietati/${slug}` }]} base={c.filters} values={{}} />;
  const p = getPropertyBySlug(slug);
  if (!p) notFound();
  return <PropertyView p={p} />;
}
