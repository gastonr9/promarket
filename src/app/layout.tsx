import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SWRegistration } from "@/components/providers/SWRegistration";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://promarket.com.ar").replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Promarket Logística | El impulso de tu comercio",
    template: "%s | Promarket Logística",
  },
  description: "Catálogo mayorista para kioscos, almacenes y comercios. Consultá precios y disponibilidad.",
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
    url: siteUrl,
    siteName: "Promarket Logística",
    title: "Promarket Logística | El impulso de tu comercio",
    description: "Catálogo mayorista para kioscos, almacenes y comercios. Consultá precios y disponibilidad.",
  },
  twitter: {
    card: "summary",
    title: "Promarket Logística",
    description: "Abastecimiento mayorista para kioscos, almacenes y comercios.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Promarket Logística",
  alternateName: "Promarket",
  url: siteUrl,
  description: "Distribución y abastecimiento mayorista para kioscos, almacenes y comercios de cercanía.",
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
    <html lang="es-AR" className={`${spaceGrotesk.variable} ${workSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Preconnect hints for critical third-party origins - only Google Fonts used on homepage */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:font-semibold">
          Saltar al contenido principal
        </a>
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