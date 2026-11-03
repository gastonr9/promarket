import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SWRegistration } from "@/components/providers/SWRegistration";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://promarket.com.ar"),
  title: {
    default: "Promarket Logística | El impulso de tu comercio",
    template: "%s | Promarket Logística",
  },
  description: "Abastecimiento mayorista para kioscos, almacenes y comercios. Consultá nuestro catálogo directamente por WhatsApp.",
  keywords: ["mayorista", "kioscos", "almacenes", "comercios", "abastecimiento", "logística", "catálogo", "whatsapp"],
  authors: [{ name: "Promarket Logística" }],
  creator: "Promarket Logística",
  publisher: "Promarket Logística",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://promarket.com.ar",
    siteName: "Promarket Logística",
    title: "Promarket Logística | El impulso de tu comercio",
    description: "Abastecimiento mayorista para kioscos, almacenes y comercios. Consultá nuestro catálogo directamente por WhatsApp.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Promarket Logística - Catálogo mayorista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promarket Logística",
    description: "Abastecimiento mayorista para kioscos, almacenes y comercios.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://promarket.com.ar";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Promarket Logística",
  alternateName: "Promarket",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: "Distribución y abastecimiento mayorista para kioscos, almacenes y comercios de cercanía.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Argentina",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+5491100000000",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
      areaServed: "AR",
      contactOption: ["WhatsApp"],
    },
  ],
  sameAs: [
    "https://wa.me/5491100000000",
  ],
  knowsAbout: [
    "Distribución mayorista",
    "Abastecimiento para kioscos",
    "Logística para comercios de cercanía",
    "Venta por WhatsApp",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Catálogo mayorista por WhatsApp",
      description: "Consulta de precios, stock y disponibilidad de entrega para kioscos y almacenes.",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${dmSans.variable} ${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        <SWRegistration />
      </body>
    </html>
  );
}