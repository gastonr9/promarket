"use client";

import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
  email?: string;
  address?: string;
}

export function Footer({
  whatsappNumber,
  email,
  address
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const cleanWhatsappNumber = whatsappNumber?.replace(/\D/g, "");
  const contactEmail = email?.trim();
  const contactAddress = address?.trim();
  const hasContactDetails = Boolean(cleanWhatsappNumber || contactEmail || contactAddress);

  return (
    <footer className="footer bg-slate-950 text-white" role="contentinfo">
      <div className="wrap mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${hasContactDetails ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-10 lg:gap-12 mb-12 lg:mb-16`}>
          {/* Brand Column */}
          <div className="footer-brand lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="ProMarket, inicio">
              <span className="w-10 h-10 grid place-items-center rounded-lg bg-primary text-white font-heading font-bold text-xl">
                P
              </span>
              <span className="font-heading font-bold text-xl leading-tight">
                <span className="text-white">Pro</span>Market
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Logística</span>
              </span>
            </Link>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-6 max-w-xs">
              Catálogo mayorista para kioscos, almacenes y comercios de cercanía.
            </p>
          </div>

          {/* Empresa Links */}
          <nav className="footer-nav" aria-label="Navegación">
            <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-white mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li><Link href="/catalogo" className="font-body text-sm text-slate-300 hover:text-white transition-colors">Catálogo mayorista</Link></li>
              <li><Link href="/#como-comprar" className="font-body text-sm text-slate-300 hover:text-white transition-colors">Cómo comprar</Link></li>
              {hasContactDetails && <li><Link href="/#contacto" className="font-body text-sm text-slate-300 hover:text-white transition-colors">Contacto</Link></li>}
            </ul>
          </nav>

          {hasContactDetails && (
            <div className="footer-contact">
              <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-white mb-4">Contacto</h3>
              <ul className="space-y-3 font-body text-sm text-slate-300">
                {cleanWhatsappNumber && (
                  <li className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                    <a href={`https://wa.me/${cleanWhatsappNumber}`} className="hover:text-white transition-colors">
                      WhatsApp
                    </a>
                  </li>
                )}
                {contactEmail && (
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                    <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
                  </li>
                )}
                {contactAddress && (
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                    <span>{contactAddress}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-body text-sm text-slate-400">
            © {currentYear} ProMarket Logística. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}