import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#24483C" };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Agenție imobiliară Chișinău | SG Imobil", template: "%s" },
  description: "SG Imobil — agenție imobiliară în Chișinău: apartamente, case, terenuri și spații comerciale de vânzare și de închiriat, consultație și suport juridic.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ro_MD", siteName: site.name, title: "Agenție imobiliară Chișinău | SG Imobil", description: "Apartamente, case și proprietăți în Chișinău și împrejurimi.", url: "/" },
  twitter: { card: "summary_large_image", title: "Agenție imobiliară Chișinău | SG Imobil", description: "Apartamente, case și proprietăți în Chișinău și împrejurimi." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2">Sari la conținut</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[
          { "@context": "https://schema.org", "@type": "RealEstateAgent", "@id": `${site.url}/#agency`, name: site.name, legalName: site.legalName, url: site.url, telephone: site.primaryPhone.href,
            address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.country },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:30" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" }] },
          { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "ro" },
        ]} />
      </body>
    </html>
  );
}
