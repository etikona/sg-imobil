# SG Imobil — website redesign (Next.js 15, App Router, TypeScript, Tailwind v4)

## Run
```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What is real vs. placeholder
- **Data**: `lib/data/properties.ts` is a snapshot of the first 30 listings from sgimobil.md (price, area, rooms, floor, bathrooms, district, street). No API was found, so the UI reads through `lib/properties.ts` — swap that file for a CMS/API/DB call, no UI changes needed.
- **Categories** (`apartamente`/`case`/`altele`) are inferred from list structure; the source list does not expose them. Verify. Items 52268 and 52267 are `altele`.
- **Photos**: only listing 52276's photo URL could be retrieved; other cards show a labelled placeholder linking to the original listing. Remote images load from `www.sgimobil.md` (see `next.config.ts`) — copy them to your own storage/CDN with the client's permission for production.
- **Source quirks kept as-is** (confirm with the client): street spellings (e.g. "Trandafilrilor"), floor > total floors on 52253/52251, listing 52269 shows two prices (189 000 / 200 000 €; the first is used), 52276's original text says floor 5 while its structured field says 3 (structured field used).
- **Logo**: not retrievable — text wordmark in `components/Header.tsx` (TODO).
- **Contacts**: phones, address and hours come from sgimobil.md/Contacte. No official WhatsApp, e-mail, social links, or privacy/cookie policy texts were found; `lib/site.ts` has slots for them.
- **Testimonials**: none exist on the source, so the section was omitted. "About us" has no source content, so the nav uses "Servicii".
- **Financing**: no interest rates/fees are shown; the page carries a "confirm current conditions" notice and links to the original page.
- **Forms**: validated client + server (`lib/validation.ts`). `/api/inquiry` forwards to `INQUIRY_WEBHOOK_URL`; without it returns 503 and the UI shows an error with the phone number — it never claims success falsely. Property inquiries include `propertyId` and `propertySlug`.
- **shadcn/ui**: not installed (registry unreachable in my environment); UI uses small Tailwind primitives (`.btn-*`, `.field`). Run `npx shadcn@latest init` to adopt it.
- **Search**: plain GET form → server-side filtering at `/proprietati` (works without JS). The "Stare" filter appears automatically once any property has a `condition` value.

## Routes
`/`, `/proprietati`, `/proprietati/{apartamente|case|de-vanzare|de-inchiriat}`, `/proprietati/[slug]`, `/servicii`, `/finantare`, `/contact`, `/sitemap.xml`, `/robots.txt`.

## i18n
Copy lives in `lib/i18n/ro.ts`. Add `ru.ts`, register it in `lib/i18n/index.ts`, then add an `[locale]` segment.
