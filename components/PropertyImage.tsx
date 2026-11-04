import Image from "next/image";
import { Building2 } from "lucide-react";
import type { Property } from "@/lib/types";
import { propertyTitle } from "@/lib/format";
export function PropertyImage({ p, priority = false, sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" }: { p: Property; priority?: boolean; sizes?: string }) {
  const src = p.images[0];
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6dd]">
      {src ? (
        <Image src={src} alt={propertyTitle(p)} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted"><Building2 size={32} aria-hidden /><span className="text-xs">Fotografii pe site-ul original</span></div>
      )}
    </div>
  );
}
