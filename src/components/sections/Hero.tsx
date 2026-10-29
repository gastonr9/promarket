"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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
        <div className="announcement bg-ink text-white text-center py-2 px-4 text-xs font-medium tracking-wide w-full">
          <strong className="text-lime font-bold">Atención a comercios</strong> · {announcementText.replace("Atención a comercios · ", "")}
        </div>
      )}

      {heroImage && (
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      )}

      <section className="hero relative overflow-hidden py-14 lg:py-20" id="inicio" aria-labelledby="hero-title">
        <div className="wrap mx-auto px-6 lg:px-8">
          <div className="hero-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[440px]">
            <div className="hero-copy relative z-10 pt-4 lg:pt-8 animate-rise">
              <span className="eyebrow inline-flex items-center gap-2 text-[var(--blue)] font-extrabold text-xs uppercase tracking-wider mb-5">
                <span className="w-5 h-0.5 bg-[var(--coral)]" aria-hidden="true"></span>
                Mayorista para comercios
              </span>
              <h1
                id="hero-title"
                className="font-heading font-extrabold leading-[1.02] tracking-tight mb-5 lg:mb-6 text-4xl lg:text-5xl xl:text-6xl"
                style={{ maxWidth: "570px" }}
              >
                Tu negocio siempre <em className="text-[var(--coral-dark)] not-italic">en movimiento.</em>
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 max-w-[470px]">
                {subtitle || "Todo lo que tu kiosco o almacén necesita, en un solo lugar. Encontrá tus productos y pedinos precio directo por WhatsApp."}
              </p>

              <div className="hero-actions flex flex-wrap gap-3 mb-6">
                <Link href="#catalogo">
                  <Button variant="default" size="lg" className="gap-2">
                    Explorar catálogo
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="#contacto">
                  <Button variant="secondary" size="lg">
                    Quiero ser cliente
                  </Button>
                </Link>
              </div>

              <div className="hero-note flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[var(--lime)] text-ink text-[11px] font-bold" aria-hidden="true">
                  <Check className="h-3 w-3" />
                </span>
                Atención directa para comercios
              </div>
            </div>

            <div className="hero-visual relative min-h-[410px] animate-rise-delayed">
              {heroImage ? (
                <div className="clip-scalloped overflow-hidden rounded-[var(--radius-xl)] shadow-brand">
                  <Image
                    src={heroImage}
                    alt="Góndolas de un comercio de cercanía abastecido por Promarket Logística"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 920px) 100vw, 50vw"
                    fetchPriority="high"
                    width={700}
                    height={500}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-muted rounded-[var(--radius-xl)] flex items-center justify-center shadow-brand">
                  <span className="text-8xl opacity-30">🏪</span>
                </div>
              )}

              {/* Floating UI elements */}
              <div className="absolute right-0 bottom-4 w-[220px] lg:w-[260px] p-4 bg-white rounded-[var(--radius)] shadow-brand">
                <strong className="text-sm leading-snug">Abastecimiento simple</strong>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">Una consulta y seguimos</p>
              </div>

              <div className="absolute right-[-1rem] top-[-1rem] w-12 h-12 rounded-full bg-[var(--lime)] opacity-50" aria-hidden="true" />
              <div className="absolute left-0 bottom-0 w-7 h-7 rounded-full bg-[var(--coral)] opacity-90" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}