import type { Property } from "@/lib/types";
export interface Filters { op?: string; cat?: string; loc?: string; min?: number; max?: number; rooms?: string; amin?: number; amax?: number; cond?: string; sort?: string }
type SP = Record<string, string | string[] | undefined>;
const s = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const n = (v: string | string[] | undefined) => { const x = Number(s(v)); return Number.isFinite(x) && s(v) ? x : undefined; };
export const parseFilters = (sp: SP): Filters => ({ op: s(sp.op), cat: s(sp.cat), loc: s(sp.loc), min: n(sp.min), max: n(sp.max), rooms: s(sp.rooms), amin: n(sp.amin), amax: n(sp.amax), cond: s(sp.cond), sort: s(sp.sort) });

export function applyFilters(list: Property[], f: Filters): Property[] {
  const out = list.filter((p) => {
    if (f.op && p.operation !== f.op) return false;
    if (f.cat && p.category !== f.cat) return false;
    if (f.loc && (p.district ?? p.city) !== f.loc) return false;
    if (f.min !== undefined && p.priceEur < f.min) return false;
    if (f.max !== undefined && p.priceEur > f.max) return false;
    if (f.rooms) { if (p.rooms === undefined) return false; if (f.rooms === "4+" ? p.rooms < 4 : p.rooms !== Number(f.rooms)) return false; }
    if (f.amin !== undefined && (p.areaM2 === undefined || p.areaM2 < f.amin)) return false;
    if (f.amax !== undefined && (p.areaM2 === undefined || p.areaM2 > f.amax)) return false;
    if (f.cond && p.condition !== f.cond) return false;
    return true;
  });
  if (f.sort === "price-asc") out.sort((a, b) => a.priceEur - b.priceEur);
  else if (f.sort === "price-desc") out.sort((a, b) => b.priceEur - a.priceEur);
  else out.sort((a, b) => Number(b.id) - Number(a.id));
  return out;
}
