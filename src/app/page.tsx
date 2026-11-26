import { getCatalogData } from "@/lib/data";
import { TopBar } from "@/components/sections/TopBar";
import { HeaderWrapper } from "@/components/sections/HeaderWrapper";
import { NavBar } from "@/components/sections/NavBar";
import { Hero } from "@/components/sections/Hero";
import { ToastProvider } from "@/components/ui/toast";
import { TrustStrip, Catalog, HowItWorks, ContactCards, Footer } from "@/components/sections/LazySections";

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
        <TrustStrip />

        {/* Catalog - Product grid with filters (lazy loaded) */}
        <Catalog
          products={products}
          categories={categories}
        />

        {/* How It Works - 3 steps (lazy loaded) */}
        <HowItWorks />

        {/* Contact Cards - WhatsApp, Zone, Hours (lazy loaded) */}
        <ContactCards />

        {/* Footer - Naval background (lazy loaded) */}
        <Footer
          whatsappNumber={settings.whatsappNumber}
          email={settings.email}
          address={settings.address}
        />
      </div>
    </ToastProvider>
  );
}