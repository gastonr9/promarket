"use client";

import { Truck, MessageSquare, CheckCircle } from "lucide-react";
import { SectionReveal, MotionSection } from "@/components/ui/SectionReveal";

interface HowItWorksProps {
  steps?: Array<{
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

export function HowItWorks({ steps = defaultSteps }: HowItWorksProps) {
  return (
    <section id="como-comprar" className="how-it-works bg-white py-16 lg:py-24" aria-labelledby="how-it-works-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="font-heading font-medium text-sm text-primary uppercase tracking-wider mb-3 block">Cómo funciona</span>
              <h2 id="how-it-works-title" className="font-heading font-bold leading-tight tracking-[-0.01em] text-[clamp(1.875rem,3vw,2.5rem)] text-slate-900">
                Pedí en <span className="text-primary">3 pasos</span>
              </h2>
              <p className="font-body text-base leading-relaxed mt-4 text-slate-500">
                Sin complicaciones: elegís, consultás y recibís. Tu asesor se encarga del resto.
              </p>
            </div>
          </MotionSection>

          <MotionSection variant="itemFast">
            <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <article
                  key={index}
                  className="step-card flex flex-col items-center text-center gap-4 p-6"
                >
                  <div className="step-number relative flex-shrink-0">
                    <span className="step-icon inline-grid place-items-center w-16 h-16 rounded-full bg-primary-light text-primary ring-4 ring-white shadow-sm">
                      {step.icon}
                    </span>
                    <span className="step-badge absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-xs font-heading font-bold flex items-center justify-center ring-4 ring-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-slate-900">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </MotionSection>
        </SectionReveal>
      </div>
    </section>
  );
}

const defaultSteps = [
  {
    number: "1",
    title: "Explorá el catálogo",
    description: "Filtrá por categoría, buscá por marca o SKU y verás precios mayoristas al instante.",
    icon: <Truck className="h-8 w-8" aria-hidden="true" />,
  },
  {
    number: "2",
    title: "Pedí por WhatsApp",
    description: "Tu asesor te atiende directo, sin bots. Confirmás stock, precios y coordinás entrega.",
    icon: <MessageSquare className="h-8 w-8" aria-hidden="true" />,
  },
  {
    number: "3",
    title: "Recibís en tu local",
    description: "Entrega en 24-48hs con logística propia. Factura A/B, pago contraentrega o transferencia.",
    icon: <CheckCircle className="h-8 w-8" aria-hidden="true" />,
  },
];