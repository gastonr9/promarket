"use client";

import { cn } from "@/lib/utils";
import { SectionReveal, MotionSection } from "@/components/ui";

interface HowItWorksProps {
  steps?: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export function HowItWorks({ steps = defaultSteps }: HowItWorksProps) {
  return (
    <section className="section how bg-ink text-white py-14 lg:py-22" id="como-comprar" aria-labelledby="how-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="section-heading flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <h2 id="how-title" className="font-heading font-extrabold leading-[1.12] tracking-tight text-3xl lg:text-4xl">
                  Así de fácil es pedir.
                </h2>
              </div>
              <p className="text-white/80 text-sm max-w-[330px] leading-relaxed">
                Sin carrito ni vueltas. Elegís un producto y coordinamos tu consulta por WhatsApp.
              </p>
            </div>
          </MotionSection>
            <MotionSection variant="item">
              <div className="steps grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {steps.map((step, index) => (
                  <article
                    key={step.number}
                    className={cn(
                      "step relative px-4 md:px-6",
                      "flex flex-col",
                      index > 0 && "md:border-l md:border-white/20 md:pl-8"
                    )}
                  >
                    <span className="step-number block mb-4 text-lime font-heading font-extrabold text-xs uppercase tracking-wider">
                      {step.number}
                    </span>
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-1">{step.description}</p>
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
    number: "EXPLORÁ",
    title: "Encontrá lo que buscás",
    description: "Usá las categorías o el buscador para recorrer el surtido.",
  },
  {
    number: "CONSULTÁ",
    title: "Escribinos por WhatsApp",
    description: "El mensaje incluye el producto elegido para agilizar la atención.",
  },
  {
    number: "COORDINÁ",
    title: "Confirmá tu pedido",
    description: "Te informamos precio, stock y opciones de entrega para tu zona.",
  },
];