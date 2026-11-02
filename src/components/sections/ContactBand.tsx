"use client";

import { MessageSquare, MapPin, Clock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionReveal, MotionSection } from "@/components/ui";

interface ContactBandProps {
  whatsappNumber: string;
}

export function ContactBand({ whatsappNumber }: ContactBandProps) {
  const handleClick = () => {
    const message = "Hola, tengo un comercio y quiero conocer el catálogo y las condiciones de entrega.";
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    
    if (!cleanNumber) {
      alert("WhatsApp todavía no está configurado. Agregá el número comercial para activar las consultas.");
      return;
    }
    
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-band bg-ink text-white py-14 lg:py-20" id="contacto" aria-labelledby="contact-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="section-heading flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <h2 id="contact-title" className="font-heading font-extrabold leading-[1.12] tracking-tight text-3xl lg:text-4xl">
                  Hablemos de tu próximo pedido.
                </h2>
              </div>
              <p className="text-white/80 text-sm max-w-[330px] leading-relaxed">
                Sin formularios eternos. Un mensaje y coordinamos todo.
              </p>
            </div>
          </MotionSection>
            <MotionSection variant="item">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-[var(--radius-xl)] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[var(--coral-dark)] grid place-items-center flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp Comercial</h3>
                      <p className="text-white/70 text-sm mb-3">La forma más rápida: escribimos, vemos stock y cerramos el pedido en minutos.</p>
                      <Button
                        variant="light"
                        size="lg"
                        onClick={handleClick}
                        className="gap-2"
                      >
                        Abrir WhatsApp
                        <MessageSquare className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-[var(--radius-xl)] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[var(--blue)] grid place-items-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Zona de cobertura</h3>
                      <p className="text-white/70 text-sm">Santa Fe capital, Santo Tomé, Recreo, Paraná y localidades aledañas. Coordinamos día y franja horaria.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-[var(--radius-xl)] border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[var(--lime)] text-ink grid place-items-center flex-shrink-0">
                      <Clock className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Horarios de atención</h3>
                      <p className="text-white/70 text-sm">Lunes a viernes 8:00 a 18:00 · Sábados 8:00 a 12:00 · Fuera de horario: dejános tu mensaje y te respondemos a la brevedad.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-[var(--radius-xl)] border border-white/10 p-6 lg:p-8">
                  <h3 className="font-bold text-xl mb-6">¿Querés ser cliente?</h3>
                  <p className="text-white/70 text-sm mb-6 max-w-md">
                    Si tenés un kiosco, almacén, autoservicio o comercio de cercanía, registrate para acceder a precios de lista, stock en tiempo real y entrega coordinada.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Link href="#catalogo" className="block w-full">
                      <Button variant="default" size="lg" className="w-full gap-2 justify-center">
                        Ver catálogo primero
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleClick}
                      className="w-full gap-2 justify-center"
                    >
                      Quiero que me contacten
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </MotionSection>
        </SectionReveal>
      </div>
    </section>
  );
}