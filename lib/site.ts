export const site = {
  name: "SG Imobil",
  legalName: "SG-IMOBILGROUP SRL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sgimobil.md",
  sourceUrl: "https://www.sgimobil.md",
  primaryPhone: { display: "+373 69 088842", href: "+37369088842" },
  contacts: [
    { name: "Sergiu Gaivas — Administrator", display: "+373 69 088842", href: "+37369088842" },
    { name: "Sergiu Gaivas — Administrator", display: "+373 69 667810", href: "+37369667810" },
    { name: "Sergiu Gaivas", display: "+373 69 341324", href: "+37369341324" },
  ],
  address: { street: "Bd. Negruzzi 10, etajul 2, birou 15", city: "Chișinău", country: "MD" },
  hours: [
    { days: "Luni – Vineri", time: "09:00 – 18:30" },
    { days: "Sâmbătă", time: "09:00 – 14:00" },
  ],
  // TODO(client): no official WhatsApp/e-mail/social links were found on sgimobil.md. Add them here when confirmed.
  whatsapp: undefined as string | undefined,
  email: undefined as string | undefined,
};
