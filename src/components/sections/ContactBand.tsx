"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="contact-band bg-[var(--coral-dark)] text-white py-8 lg:py-10" id="contacto" aria-labelledby="contact-title">
      <div className="contact-inner wrap mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="text-center lg:text-left">
          <h2 id="contact-title" className="font-heading font-extrabold text-2xl lg:text-3xl mb-2">
            ¿Tenés un comercio?
          </h2>
          <p className="text-white/86 text-sm lg:text-base">
            Hablemos de tu próximo pedido y de cómo podemos ayudarte.
          </p>
        </div>
        <Button
          variant="light"
          size="lg"
          onClick={handleClick}
          className="w-full lg:w-auto whitespace-nowrap gap-2"
        >
          Contactar por WhatsApp
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}