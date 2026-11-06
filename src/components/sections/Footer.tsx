"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
  email?: string;
  address?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// Simple inline SVG icons for social media
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Footer({
  whatsappNumber = "+54 9 11 0000-0000",
  email = "ventas@promarket.com.ar",
  address = "Santa Fe, Argentina",
  socialLinks = {}
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { label: "Sobre Nosotros", href: "#nosotros" },
      { label: "Catálogo Mayorista", href: "#catalogo" },
      { label: "Cómo Pedir", href: "#como-comprar" },
      { label: "Ofertas", href: "#ofertas" },
    ],
    servicios: [
      { label: "Envío Nacional", href: "#envio" },
      { label: "Precios por Volumen", href: "#precios" },
      { label: "Atención Personalizada", href: "#atencion" },
      { label: "Stock Permanente", href: "#stock" },
    ],
    ayuda: [
      { label: "Preguntas Frecuentes", href: "#faq" },
      { label: "Condiciones de Venta", href: "#terminos" },
      { label: "Política de Privacidad", href: "#privacidad" },
      { label: "Contacto", href: "#contacto" },
    ],
    contacto: [
      { label: "Solicitar Catálogo", href: "#contacto" },
      { label: "Ser Proveedor", href: "#proveedor" },
      { label: "Trabaja con Nosotros", href: "#trabajo" },
    ],
  };

  return (
    <footer className="footer bg-slate-950 text-white" role="contentinfo">
      <div className="wrap mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="footer-brand lg:col-span-1">
            <Link href="#inicio" className="flex items-center gap-2 mb-4" aria-label="ProMarket, inicio">
              <span className="w-10 h-10 grid place-items-center rounded-lg bg-primary text-white font-heading font-bold text-xl">
                P
              </span>
              <span className="font-heading font-bold text-xl leading-tight">
                <span className="text-white">Pro</span>Market
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Logística</span>
              </span>
            </Link>
            <p className="font-body text-sm text-slate-300 leading-relaxed mb-6 max-w-xs">
              Abastecimiento mayorista para kioscos, almacenes y comercios. Precios por volumen, entrega directa y atención personalizada por WhatsApp.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} aria-label="Síguenos en Instagram" className="text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950">
                  <InstagramIcon />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} aria-label="Síguenos en Facebook" className="text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950">
                  <FacebookIcon />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} aria-label="Síguenos en LinkedIn" className="text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950">
                  <LinkedinIcon />
                </a>
              )}
            </div>
          </div>

          {/* Empresa Links */}
          <nav className="footer-nav" aria-label="Empresa">
            <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios Links */}
          <nav className="footer-nav" aria-label="Servicios">
            <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-white mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                    {link.label}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto Column */}
          <div className="footer-contact">
            <h3 className="font-heading font-semibold text-base uppercase tracking-wider text-white mb-4">Contacto</h3>
            <ul className="space-y-3 font-body text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                <a 
                  href={`tel:${whatsappNumber.replace(/\s/g, '')}`}
                  aria-label={`Llamar por WhatsApp al ${whatsappNumber}`}
                  className="hover:text-white transition-colors"
                >
                  {whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                <a 
                  href={`mailto:${email}`}
                  aria-label={`Enviar correo a ${email}`}
                  className="hover:text-white transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-white mt-0.5" aria-hidden="true" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-body text-sm text-slate-400">
            © {currentYear} ProMarket Logística. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <Link href="#terminos" className="font-body hover:text-white transition-colors">Términos y condiciones</Link>
            <span aria-hidden="true">·</span>
            <Link href="#privacidad" className="font-body hover:text-white transition-colors">Política de privacidad</Link>
            <span aria-hidden="true">·</span>
            <Link href="#cookies" className="font-body hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}