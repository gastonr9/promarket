"use client";

import { cn } from "@/lib/utils";
import { Truck, PackageCheck, ShieldCheck } from "lucide-react";
import { SectionReveal, MotionSection } from "@/components/ui";

interface TrustStripProps {
  items?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

export function TrustStrip({ items = defaultItems }: TrustStripProps) {
  return (
    <section className="trust-strip bg-[var(--mint)] border-t border-[var(--border)] border-b border-[var(--border)]" aria-label="Ventajas">
      <SectionReveal className="wrap mx-auto px-6 lg:px-8">
        <div className="trust-items grid grid-cols-1 md:grid-cols-3 gap-4 py-5 min-h-[84px]">
          {items.map((item, index) => (
            <MotionSection key={index} variant="itemFast" style={{ transitionDelay: `${index * 70}ms` }}>
              <div
                className={cn(
                  "trust-item flex items-center justify-center md:justify-start gap-3",
                  "text-[var(--ink)] text-sm font-bold"
                )}
              >
                <span className="trust-icon inline-grid place-items-center w-9 h-9 rounded-full bg-white text-[var(--coral-dark)] text-base shadow-sm" aria-hidden="true">
                  {item.icon}
                </span>
                {item.text}
              </div>
            </MotionSection>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}

const defaultItems = [
  {
    icon: <Truck className="h-5 w-5" aria-hidden="true" />,
    text: "Envíos directos en Santa Fe y zona",
  },
  {
    icon: <PackageCheck className="h-5 w-5" aria-hidden="true" />,
    text: "Precios especiales por bulto cerrado",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    text: "Asesoramiento comercial personalizado",
  },
];