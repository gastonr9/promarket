"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  subtitle?: string;
  heroImage?: string;
  announcementText?: string;
}

export function Hero({ subtitle, heroImage, announcementText }: HeroProps) {
  return (
    <>
      {announcementText && (
        <div className="bg-primary text-white text-center py-2 px-4 text-sm font-body w-full">
          <span className="font-heading font-medium">¡Novedad!</span> {announcementText}
        </div>
      )}

      <section className="hero relative overflow-hidden bg-primary text-white" id="inicio" aria-labelledby="hero-title">
        <div className="wrap mx-auto px-6 lg:px-8">
          <div className="hero-grid grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[500px] py-16 lg:py-24 xl:py-32">
            <div className="hero-copy relative z-10">
              <div className="flex items-center gap-2 mb-6 text-white font-heading font-medium uppercase tracking-wider text-sm">
                <div className="w-6 h-px bg-white" />
                <span>Envío directo a tu local</span>
              </div>
              <h1
                id="hero-title"
                className="font-heading font-bold leading-tight tracking-[-0.02em] mb-6 text-[clamp(2.25rem,4vw,3.5rem)] text-white"
                style={{ maxWidth: "570px" }}
              >
                Abastecimiento mayorista
                <br />
                <span className="text-white underline decoration-accent decoration-2 underline-offset-4">para tu comercio</span>
              </h1>
              <p className="font-body text-lg leading-relaxed mb-8 max-w-[470px] text-slate-100">
                {subtitle || "Catálogo completo con precios mayoristas. Seleccioná productos, pedí precio por WhatsApp y coordinamos la entrega. Sin comisiones, sin vueltas."}
              </p>
              <div className="hero-actions flex flex-wrap gap-3 mb-8">
                <Link href="#catalogo">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Ver catálogo mayorista
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="#contacto">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Quiero ser cliente
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-200 font-body">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>Sin pedido mínimo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>Entrega en 24-48hs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" aria-hidden="true" />
                  <span>Precios por volumen</span>
                </div>
              </div>
            </div>

            <div className="hero-visual relative">
              {heroImage ? (
                <div className="relative rounded-lg overflow-hidden bg-white shadow-lg aspect-[7/6]">
                  <Image
                    src={heroImage}
                    alt="Centro de distribución ProMarket con montacargas y pallets"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 920px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}