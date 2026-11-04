import { ro, type Dictionary } from "./ro";
// Localization-ready: add `ru.ts` (same shape as Dictionary) and register it here, then
// introduce an `[locale]` route segment. Copy lives here, not inside components.
const dictionaries: Record<"ro", Dictionary> = { ro };
export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "ro";
export const getDictionary = (l: Locale = defaultLocale) => dictionaries[l];
export const t = getDictionary();
