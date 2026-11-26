"use client";

import { Truck, Tag, MessageSquare, Package } from "lucide-react";
import { SectionReveal, MotionSection } from "@/components/ui/SectionReveal";

interface TrustStripProps {
  items?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

export function TrustStrip({ items = defaultItems }: TrustStripProps) {
  return (
    <section className="trust-strip bg-white border-y border-slate-200 py-12 lg:py-16" aria-labelledby="trust-strip-title">
      <SectionReveal className="wrap mx-auto px-6 lg:px-8">
        <h2 id="trust-strip-title" className="sr-only">Nuestros servicios</h2>
        <div className="trust-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <MotionSection key={index} variant="itemFast" style={{ transitionDelay: `${index * 80}ms` }}>
              <div className="trust-item flex flex-col items-center text-center gap-4">
                <span className="trust-icon inline-grid place-items-center w-14 h-14 rounded-lg bg-primary-light text-primary" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-heading font-semibold text-lg text-slate-900">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-slate-500 leading-relaxed max-w-xs">
                  {item.description}
                </p>
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
    icon: <Truck className="h-7 w-7" aria-hidden="true" />,
    title: "Envío nacional",
    description: "Llegamos a todo el país con logística propia y transportes aliados",
  },
  {
    icon: <Tag className="h-7 w-7" aria-hidden="true" />,
    title: "Precios mayoristas",
    description: "Tarifas escalonadas por volumen: a mayor compra, mejor precio unitario",
  },
  {
    icon: <MessageSquare className="h-7 w-7" aria-hidden="true" />,
    title: "Atención personalizada",
    description: "Un asesor comercial dedicado para tu negocio, disponible por WhatsApp",
  },
  {
    icon: <Package className="h-7 w-7" aria-hidden="true" />,
    title: "Stock permanente",
    description: "Reposición automática y alertas de productos críticos para tu local",
  },
];