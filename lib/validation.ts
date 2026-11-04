export type InquiryKind = "owner" | "property" | "contact";
export interface InquiryInput { kind: InquiryKind; name: string; phone: string; propertyType?: string; intent?: string; location?: string; message?: string; propertyId?: string; propertySlug?: string; website?: string }
export type Errors = Partial<Record<keyof InquiryInput, string>>;
const PHONE = /^\+?[0-9\s().-]{7,18}$/;
export function validateInquiry(v: InquiryInput): Errors {
  const e: Errors = {};
  if (!v.name?.trim() || v.name.trim().length < 2) e.name = "Introdu numele complet (minimum 2 caractere).";
  if (!v.phone?.trim()) e.phone = "Introdu un număr de telefon.";
  else if (!PHONE.test(v.phone.trim()) || v.phone.replace(/\D/g, "").length < 7) e.phone = "Număr de telefon invalid. Exemplu: +373 69 123456.";
  if (v.kind === "owner") {
    if (!v.propertyType) e.propertyType = "Alege tipul proprietății.";
    if (!v.intent) e.intent = "Alege vânzare sau închiriere.";
    if (!v.location?.trim()) e.location = "Indică localitatea sau adresa proprietății.";
  }
  if (v.kind === "property" && !v.propertyId) e.propertyId = "Lipsește proprietatea asociată cererii.";
  if (v.message && v.message.length > 1000) e.message = "Mesajul este prea lung (maximum 1000 de caractere).";
  return e;
}
