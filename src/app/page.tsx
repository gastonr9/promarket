import { getCatalogData } from "@/lib/data";
import { TopBar, HeaderWrapper, NavBar, Hero, TrustStrip, Catalog, HowItWorks, ContactCards, Footer } from "@/components/sections";
import { ToastProvider } from "@/components/ui/toast";
import { Suspense } from "react";

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

        {/* Trust Strip - Service indicators */}
        <TrustStrip />

        {/* Catalog - Product grid with filters */}
        <Suspense fallback={<div className="py-16 animate-pulse grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /></div>}>
          <Catalog
            products={products}
            categories={categories}
          />
        </Suspense>

        {/* How It Works - 3 steps */}
        <HowItWorks />

        {/* Contact Cards - WhatsApp, Zone, Hours */}
        <ContactCards />

        {/* Footer - Naval background */}
        <Footer
          whatsappNumber={settings.whatsappNumber}
          email={settings.email}
          address={settings.address}
        />
      </div>
    </ToastProvider>
  );
}