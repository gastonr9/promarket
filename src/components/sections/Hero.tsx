"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionReveal, MotionSection, useInView } from "@/components/ui";

interface HeroProps {
  subtitle?: string;
  heroImage?: string;
  announcementText?: string;
}

export function Hero({ subtitle, heroImage, announcementText }: HeroProps) {
  const [heroImageRef] = useInView();

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
            <SectionReveal className="hero-copy relative z-10 pt-4 lg:pt-8">
              <MotionSection variant="itemFast">
                <h1
                  id="hero-title"
                  className="font-heading font-extrabold leading-[1.02] tracking-tight mb-5 lg:mb-6 text-4xl lg:text-5xl xl:text-6xl"
                  style={{ maxWidth: "570px" }}
                >
                  Tu negocio siempre abastecido.
                </h1>
              </MotionSection>
              <MotionSection variant="itemFast">
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 max-w-[470px]">
                  {subtitle || "Catálogo completo con precios de lista. Elegís productos, consultás por WhatsApp y coordinamos la entrega. Sin comisiones, sin vueltas."}
                </p>
              </MotionSection>
              <MotionSection variant="itemFast">
                <div className="hero-actions flex flex-wrap gap-3 mb-6">
                  <Link href="#catalogo">
                    <Button variant="default" size="lg" className="gap-2">
                      Ver catálogo completo
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href="#contacto">
                    <Button variant="secondary" size="lg">
                      Quiero ser cliente
                    </Button>
                  </Link>
                </div>
              </MotionSection>
              <MotionSection variant="itemFast">
                <div className="hero-note flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Check className="h-4 w-4 text-[var(--coral)] shrink-0" aria-hidden="true" />
                  Atención directa para comercios · Solo WhatsApp
                </div>
              </MotionSection>
            </SectionReveal>

            <div className="hero-visual relative min-h-[410px]">
              {heroImage ? (
                <motion.div
                  ref={heroImageRef}
                  className="clip-scalloped overflow-hidden rounded-[var(--radius-xl)] shadow-brand h-full min-h-[410px]"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
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
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-muted rounded-[var(--radius-xl)] flex items-center justify-center shadow-brand">
                  <svg className="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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