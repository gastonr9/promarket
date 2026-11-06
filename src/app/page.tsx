import { getCatalogData } from "@/lib/data";
import { TopBar, HeaderWrapper, NavBar, Hero } from "@/components/sections";
import { ToastProvider } from "@/components/ui/toast";
import { Suspense, lazy } from "react";

// Lazy load below-the-fold sections to reduce initial JavaScript
const TrustStrip = lazy(() => import("@/components/sections/TrustStrip").then(m => ({ default: m.TrustStrip })));
const Catalog = lazy(() => import("@/components/sections/Catalog").then(m => ({ default: m.Catalog })));
const HowItWorks = lazy(() => import("@/components/sections/HowItWorks").then(m => ({ default: m.HowItWorks })));
const ContactCards = lazy(() => import("@/components/sections/ContactCards").then(m => ({ default: m.ContactCards })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

export const metadata = {
  title: "ProMarket Logística | El impulso de tu comercio",
  description: "Abastecimiento mayorista para kioscos, almacenes y comercios. Catálogo completo con precios mayoristas. Pedí por WhatsApp y coordinamos la entrega.",
};

export default async function HomePage() {
  const { products, categories, settings } = await getCatalogData();

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Top Bar - Contact info, social links, CTA */}
        <TopBar
          whatsappNumber={settings.whatsappNumber}
          email={settings.email}
          address={settings.address}
        />

        {/* Header - Logo, Compound Search, User Actions */}
        <HeaderWrapper categories={categories} />

        {/* Nav Bar - Main navigation */}
        <NavBar activeSection="inicio" />

        {/* Hero - Split layout with headline and image */}
        <Hero
          announcementText={settings.announcementText}
          subtitle={settings.heroSubtitle}
          heroImage={settings.heroImage?.url}
        />

        {/* Trust Strip - Service indicators (lazy loaded) */}
        <Suspense fallback={<div className="py-8 animate-pulse grid gap-4 md:grid-cols-4 px-4"><div className="h-16 bg-muted rounded" /><div className="h-16 bg-muted rounded" /><div className="h-16 bg-muted rounded" /><div className="h-16 bg-muted rounded" /></div>}>
          <TrustStrip />
        </Suspense>

        {/* Catalog - Product grid with filters (lazy loaded) */}
        <Suspense fallback={<div className="py-16 animate-pulse grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /></div>}>
          <Catalog
            products={products}
            categories={categories}
          />
        </Suspense>

        {/* How It Works - 3 steps (lazy loaded) */}
        <Suspense fallback={<div className="py-16 animate-pulse grid gap-8 md:grid-cols-3 px-4"><div className="h-48 bg-muted rounded" /><div className="h-48 bg-muted rounded" /><div className="h-48 bg-muted rounded" /></div>}>
          <HowItWorks />
        </Suspense>

        {/* Contact Cards - WhatsApp, Zone, Hours (lazy loaded) */}
        <Suspense fallback={<div className="py-12 animate-pulse grid gap-6 md:grid-cols-3 px-4"><div className="h-48 bg-muted rounded" /><div className="h-48 bg-muted rounded" /><div className="h-48 bg-muted rounded" /></div>}>
          <ContactCards />
        </Suspense>

        {/* Footer - Naval background (lazy loaded) */}
        <Suspense fallback={<div className="py-12 animate-pulse"><div className="h-32 bg-muted" /></div>}>
          <Footer
            whatsappNumber={settings.whatsappNumber}
            email={settings.email}
            address={settings.address}
          />
        </Suspense>
      </div>
    </ToastProvider>
  );
}