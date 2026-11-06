"use client";

import { Phone, MapPin, Mail } from "lucide-react";

interface TopBarProps {
  whatsappNumber?: string;
  email?: string;
  address?: string;
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

export function TopBar({ 
  whatsappNumber = "+54 9 11 0000-0000",
  email = "ventas@promarket.com.ar",
  address = "Santa Fe, Argentina"
}: TopBarProps) {
  return (
    <div className="top-bar bg-slate-50 border-b border-slate-200">
      <div className="wrap mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-2 py-2 text-sm font-body sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-slate-600">
            <a href={`tel:${whatsappNumber.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{whatsappNumber}</span>
            </a>
            <span className="flex items-center gap-1 hidden md:inline-flex">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {address}
            </span>
            <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="hidden lg:inline">{email}</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <button aria-label="Instagram" className="text-slate-400 hover:text-primary transition-colors p-1.5" onClick={(e) => e.preventDefault()}>
              <InstagramIcon />
            </button>
            <button aria-label="Facebook" className="text-slate-400 hover:text-primary transition-colors p-1.5" onClick={(e) => e.preventDefault()}>
              <FacebookIcon />
            </button>
            <button aria-label="LinkedIn" className="text-slate-400 hover:text-primary transition-colors p-1.5" onClick={(e) => e.preventDefault()}>
              <LinkedinIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}