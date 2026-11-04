import Link from "next/link";
export default function NotFound() {
  return <div className="wrap py-24 text-center"><h1 className="text-3xl font-semibold">Pagina nu a fost găsită</h1><p className="mt-3 text-muted">Proprietatea poate să nu mai fie disponibilă.</p><Link href="/proprietati" className="btn-primary mt-6">Vezi proprietățile</Link></div>;
}
