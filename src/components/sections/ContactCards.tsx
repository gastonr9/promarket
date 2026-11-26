"use client";

import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal, MotionSection } from "@/components/ui/SectionReveal";

interface ContactCardsProps {
  whatsappNumber?: string;
  email?: string;
  address?: string;
}

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cta?: {
    label: string;
    href: string;
    variant: "whatsapp" | "outline";
  };
}

export function ContactCards({ whatsappNumber, email, address }: ContactCardsProps) {
  const cleanWhatsappNumber = whatsappNumber?.replace(/\D/g, "");
  const contactEmail = email?.trim();
  const contactAddress = address?.trim();
  const cards: ContactCard[] = [
    ...(cleanWhatsappNumber
      ? [{
          icon: <MessageCircle className="h-7 w-7" aria-hidden="true" />,
          title: "WhatsApp directo",
          subtitle: "Consultá precios, stock y disponibilidad de entrega.",
          cta: {
            label: "Escribir por WhatsApp",
            href: `https://wa.me/${cleanWhatsappNumber}`,
            variant: "whatsapp" as const,
          },
        }]
      : []),
    ...(contactEmail
      ? [{
          icon: <Mail className="h-7 w-7" aria-hidden="true" />,
          title: "Correo electrónico",
          subtitle: contactEmail,
          cta: {
            label: "Enviar correo",
            href: `mailto:${contactEmail}`,
            variant: "outline" as const,
          },
        }]
      : []),
    ...(contactAddress
      ? [{
          icon: <MapPin className="h-7 w-7" aria-hidden="true" />,
          title: "Ubicación",
          subtitle: contactAddress,
        }]
      : []),
  ];

  if (cards.length === 0) return null;

  return (
    <section id="contacto" className="contact-cards bg-slate-50 py-16 lg:py-24" aria-labelledby="contact-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <span className="font-heading font-medium text-sm text-primary uppercase tracking-wider mb-3 block">Contacto</span>
              <h2 id="contact-title" className="font-heading font-bold leading-tight tracking-[-0.01em] text-[clamp(1.875rem,3vw,2.5rem)] text-slate-900">
                Hablemos de tu <span className="text-primary">abastecimiento</span>
              </h2>
            </div>
          </MotionSection>

          <MotionSection variant="itemFast">
            <div className={`cards-grid grid grid-cols-1 gap-6 lg:gap-8 ${cards.length === 1 ? "mx-auto max-w-md" : cards.length === 2 ? "mx-auto max-w-3xl md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {cards.map((card, index) => (
                <article
                  key={index}
                  className="contact-card bg-white border border-slate-200 rounded-lg p-6 lg:p-8 flex flex-col items-center text-center gap-4"
                >
                  <div className="card-icon inline-grid place-items-center w-14 h-14 rounded-lg bg-primary-light text-primary">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-slate-900">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm text-slate-500 leading-relaxed mt-1">
                      {card.subtitle}
                    </p>
                  </div>
                  {card.cta && (
                    <Button
                      variant={card.cta.variant || "primary"}
                      size="lg"
                      className="w-full max-w-xs mt-2"
                      asChild
                    >
                      <a href={card.cta.href}>{card.cta.label}</a>
                    </Button>
                  )}
                </article>
              ))}
            </div>
          </MotionSection>
        </SectionReveal>
      </div>
    </section>
  );
}