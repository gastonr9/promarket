"use client";

import { MessageSquare, MapPin, Clock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionReveal, MotionSection } from "@/components/ui/SectionReveal";

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
    <section className="contact-band bg-slate-900 text-white py-16 lg:py-24" id="contacto" aria-labelledby="contact-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="section-heading flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div>
                <span className="font-heading font-bold text-sm text-accent uppercase tracking-wider mb-3 block">Contacto</span>
                <h2 id="contact-title" className="font-heading font-bold leading-tight tracking-[-0.01em] text-[clamp(1.875rem,3vw,2.25rem)]">
                  Hablemos de tu
                  <br />
                  <span className="text-accent">próximo pedido</span>
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed max-w-[330px] text-slate-300">
                Sin formularios eternos. Un mensaje y coordinamos todo.
              </p>
            </div>
          </MotionSection>
          
          <MotionSection variant="item">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 bg-slate-800 border border-slate-700 shadow-industrial-3 hover:border-primary transition-all">
                  <div className="w-12 h-12 rounded-none bg-primary grid place-items-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-accent mb-1">WhatsApp Comercial</h3>
                    <p className="font-body text-sm text-slate-300 mb-3">La forma más rápida: escribimos, vemos stock y cerramos el pedido en minutos.</p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleClick}
                      className="gap-2 bg-accent hover:bg-primary border-accent"
                    >
                      Abrir WhatsApp
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-slate-800 border border-slate-700 shadow-industrial-3 hover:border-primary transition-all">
                  <div className="w-12 h-12 rounded-none bg-slate-700 grid place-items-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-slate-300 mb-1">Zona de cobertura</h3>
                    <p className="font-body text-sm text-slate-300">Santa Fe capital, Santo Tomé, Recreo, Paraná y localidades aledañas. Coordinamos día y franja horaria.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-slate-800 border border-slate-700 shadow-industrial-3 hover:border-primary transition-all">
                  <div className="w-12 h-12 rounded-none bg-slate-700 grid place-items-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-slate-300 mb-1">Horarios de atención</h3>
                    <p className="font-body text-sm text-slate-300">Lunes a viernes 8:00 a 18:00 · Sábados 8:00 a 12:00 · Fuera de horario: dejános tu mensaje y te respondemos a la brevedad.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 lg:p-8 shadow-industrial-3">
                <h3 className="font-heading font-semibold text-lg text-white mb-6">¿Querés ser cliente?</h3>
                <p className="font-body text-sm text-slate-300 mb-6 max-w-md">
                  Si tenés un kiosco, almacén, autoservicio o comercio de cercanía, registrate para acceder a precios mayoristas, stock en tiempo real y entrega coordinada.
                </p>
                <div className="flex flex-col gap-4">
                  <Link href="#catalogo" className="block w-full">
                    <Button variant="outline" size="lg" className="w-full gap-2 justify-center border-white text-white hover:bg-white/10">
                      Ver catálogo primero
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleClick}
                    className="w-full gap-2 justify-center bg-accent hover:bg-primary border-accent"
                  >
                    Quiero que me contacten
                    <Mail className="h-4 w-4" aria-hidden="true" />
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