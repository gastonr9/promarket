"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, Target } from "lucide-react";

interface TrustStripProps {
  items?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
}

export function TrustStrip({ items = defaultItems }: TrustStripProps) {
  return (
    <section className="trust-strip bg-[var(--mint)] border-t border-[#d9e5d8] border-b border-[#d9e5d8]" aria-label="Ventajas">
      <div className="trust-items wrap mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 py-5 min-h-[84px]">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "trust-item flex items-center justify-center md:justify-start gap-3",
              "text-[#33465a] text-sm font-bold"
            )}
          >
            <span className="trust-icon inline-grid place-items-center w-9 h-9 rounded-full bg-white text-[var(--coral-dark)] text-base" aria-hidden="true">
              {item.icon}
            </span>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}

const defaultItems = [
  {
    icon: <ArrowUpRight className="h-5 w-5" aria-hidden="true" />,
    text: "Catálogo fácil de consultar",
  },
  {
    icon: <Clock className="h-5 w-5" aria-hidden="true" />,
    text: "Atención por WhatsApp",
  },
  {
    icon: <Target className="h-5 w-5" aria-hidden="true" />,
    text: "Consultá cobertura de entrega",
  },
];