import { getCatalogData } from "@/lib/sanity";
import { Hero, TrustStrip, Catalog, HowItWorks, ContactBand, Footer } from "@/components/sections";
import { ToastProvider } from "@/components/ui/toast";
import Script from "next/script";

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
        <Catalog
          products={products}
          categories={categories}
        />
        <HowItWorks />
        <ContactBand whatsappNumber={settings.whatsappNumber} />
        <Footer />
      </div>
    </ToastProvider>
  );
}