"use client";

import Link from "next/link";

interface FooterProps {
  brandName?: string;
}

export function Footer({ brandName = "Promarket Logística" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-secondary py-11 lg:py-14" role="contentinfo">
      <div className="wrap mx-auto px-6 lg:px-8">
        <div className="footer-top flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-8 lg:pb-10">
          <div className="lg:max-w-[300px]">
            <Link href="#inicio" className="brand inline-flex items-center gap-3 mb-4" aria-label={`${brandName}, inicio`}>
              <span className="brand-mark w-10 h-10 lg:w-10 lg:h-10 grid place-items-center rounded-[12px_12px_12px_4px] bg-[var(--coral-dark)] text-white font-extrabold text-xl -rotate-3">
                P
              </span>
              <span className="brand-name font-extrabold text-lg lg:text-xl leading-[1.05]">
                <span className="text-[var(--coral-dark)]">pro</span>market
                <small className="block mt-1 text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground">
                  LOGÍSTICA
                </small>
              </span>
            </Link>
            <p className="footer-blurb text-muted-foreground text-sm leading-relaxed">
              Distribución y abastecimiento para kioscos, almacenes y comercios de cercanía.
            </p>
          </div>

          <div className="footer-column grid grid-cols-2 gap-8 lg:gap-12">
            <nav aria-label="Explorá">
              <strong className="block mb-3 font-semibold text-sm">Explorá</strong>
              <ul className="space-y-2">
                <li><Link href="#catalogo" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Catálogo</Link></li>
                <li><Link href="#como-comprar" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cómo comprar</Link></li>
                <li><Link href="#contacto" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contacto</Link></li>
              </ul>
            </nav>

            <nav aria-label="Redes">
              <strong className="block mb-3 font-semibold text-sm">Redes</strong>
              <ul className="space-y-2">
                <li><span className="text-xs text-muted-foreground">Instagram · Próximamente</span></li>
                <li><span className="text-xs text-muted-foreground">Facebook · Próximamente</span></li>
                <li><span className="text-xs text-muted-foreground">TikTok · Próximamente</span></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pt-4 lg:pt-6 border-t border-border text-muted-foreground text-xs">
          <span>© {year} {brandName}</span>
          <span className="flex items-center gap-4">El impulso que tu comercio necesita.</span>
        </div>
      </div>
    </footer>
  );
}