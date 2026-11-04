import { Search } from "lucide-react";
import { getAllProperties, getLocations } from "@/lib/properties";
import type { Filters } from "@/lib/filter";
import { t } from "@/lib/i18n";
import type { Category } from "@/lib/types";

/** Server component using a plain GET form: works without JS, filtering happens on /proprietati. */
export function SearchForm({ values = {}, advanced = false }: { values?: Filters; advanced?: boolean }) {
  const all = getAllProperties();
  const cats = [...new Set(all.map((p) => p.category))] as Category[];
  const conditions = [...new Set(all.map((p) => p.condition).filter(Boolean) as string[])];
  const id = advanced ? "adv" : "hero";
  return (
    <form action="/proprietati" method="get" role="search" aria-label="Căutare proprietăți" className="rounded-xl border border-line bg-white p-4 text-ink shadow-xl sm:p-5">
      <div className={`grid gap-3 sm:grid-cols-2 ${advanced ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
        <div><label htmlFor={`${id}-op`} className="label">{t.search.op}</label>
          <select id={`${id}-op`} name="op" defaultValue={values.op ?? ""} className="field"><option value="">{t.search.all}</option><option value="vanzare">{t.search.sale}</option><option value="chirie">{t.search.rent}</option></select></div>
        <div><label htmlFor={`${id}-cat`} className="label">{t.search.category}</label>
          <select id={`${id}-cat`} name="cat" defaultValue={values.cat ?? ""} className="field"><option value="">{t.search.all}</option>{cats.map((c) => <option key={c} value={c}>{t.categories[c]}</option>)}</select></div>
        <div><label htmlFor={`${id}-loc`} className="label">{t.search.location}</label>
          <select id={`${id}-loc`} name="loc" defaultValue={values.loc ?? ""} className="field"><option value="">{t.search.all}</option>{getLocations().map((l) => <option key={l}>{l}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-2">
          <div><label htmlFor={`${id}-min`} className="label">{t.search.min}</label><input id={`${id}-min`} name="min" type="number" min={0} inputMode="numeric" defaultValue={values.min} className="field" /></div>
          <div><label htmlFor={`${id}-max`} className="label">{t.search.max}</label><input id={`${id}-max`} name="max" type="number" min={0} inputMode="numeric" defaultValue={values.max} className="field" /></div>
        </div>
        {advanced && <>
          <div><label htmlFor="adv-rooms" className="label">{t.search.rooms}</label>
            <select id="adv-rooms" name="rooms" defaultValue={values.rooms ?? ""} className="field"><option value="">{t.search.all}</option><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label htmlFor="adv-amin" className="label">{t.search.areaMin}</label><input id="adv-amin" name="amin" type="number" min={0} defaultValue={values.amin} className="field" /></div>
            <div><label htmlFor="adv-amax" className="label">{t.search.areaMax}</label><input id="adv-amax" name="amax" type="number" min={0} defaultValue={values.amax} className="field" /></div>
          </div>
          {conditions.length > 0 && <div><label htmlFor="adv-cond" className="label">{t.search.condition}</label>
            <select id="adv-cond" name="cond" defaultValue={values.cond ?? ""} className="field"><option value="">{t.search.all}</option>{conditions.map((c) => <option key={c}>{c}</option>)}</select></div>}
          <div><label htmlFor="adv-sort" className="label">{t.search.sort}</label>
            <select id="adv-sort" name="sort" defaultValue={values.sort ?? ""} className="field"><option value="">{t.search.newest}</option><option value="price-asc">{t.search.priceAsc}</option><option value="price-desc">{t.search.priceDesc}</option></select></div>
        </>}
        <div className={`flex items-end ${advanced ? "sm:col-span-2 lg:col-span-4 lg:justify-end" : ""}`}>
          <button type="submit" className="btn-primary w-full lg:w-auto"><Search size={16} aria-hidden />{t.search.submit}</button>
        </div>
      </div>
    </form>
  );
}
