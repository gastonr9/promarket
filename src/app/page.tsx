import { getCatalogData } from "@/lib/data";
import { Hero, TrustStrip, Catalog, HowItWorks, ContactBand, Footer } from "@/components/sections";
import { ToastProvider } from "@/components/ui/toast";
import Script from "next/script";
import { Suspense } from "react";

export const metadata = {
  title: "Promarket Logística | El impulso de tu comercio",
  description: "Abastecimiento mayorista para kioscos, almacenes y comercios. Consultá nuestro catálogo directamente por WhatsApp.",
};

export default async function HomePage() {
  const { products, categories, settings } = await getCatalogData();

  return (
    <ToastProvider>
      <Script
        id="promarket-settings"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__PROMARKET_SETTINGS__ = ${JSON.stringify({
            whatsappNumber: settings.whatsappNumber,
          })};`,
        }}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Hero
          announcementText={settings.announcementText}
          subtitle={settings.heroSubtitle}
          heroImage={settings.heroImage?.url}
        />
        <TrustStrip />
        <Suspense fallback={<div className="py-16 animate-pulse grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4"><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /><div className="h-72 bg-muted" /></div>}>
          <Catalog
            products={products}
            categories={categories}
          />
        </Suspense>
        <HowItWorks />
        <ContactBand whatsappNumber={settings.whatsappNumber} />
        <Footer />
      </div>
    </ToastProvider>
  );
}