"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";

interface TopBarProps {
  whatsappNumber?: string;
  email?: string;
  address?: string;
}

export function TopBar({ whatsappNumber, email, address }: TopBarProps) {
  const cleanWhatsappNumber = whatsappNumber?.replace(/\D/g, "");
  const contactEmail = email?.trim();
  const contactAddress = address?.trim();

  if (!cleanWhatsappNumber && !contactEmail && !contactAddress) return null;

  return (
    <div className="top-bar bg-slate-50 border-b border-slate-200">
      <div className="wrap mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-2 py-2 text-sm font-body sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-slate-600">
            {cleanWhatsappNumber && (
              <a
                href={`https://wa.me/${cleanWhatsappNumber}`}
                className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            )}
            {contactAddress && (
              <span className="hidden items-center gap-1 md:inline-flex">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {contactAddress}
              </span>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{contactEmail}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}