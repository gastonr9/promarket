import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getSettings } from "@/lib/data";
import { ProductDetail } from "@/components/sections/ProductDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.description || `${product.name} - ${product.detail || "Consultar presentación"}. Consultá precio y disponibilidad.`,
    alternates: {
      canonical: `/catalogo/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Promarket Logística`,
      description: product.description || `${product.name} - ${product.detail || "Consultar presentación"}`,
      type: "website",
      images: product.images?.[0]?.url
        ? [product.images[0].url]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || `${product.name} - ${product.detail || "Consultar presentación"}`,
    },
    other: {
      "product:retailer": "Promarket Logística",
      "product:brand": typeof product.brand === "string" ? product.brand : product.brand?.name || "",
      "product:category": product.category,
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSettings()]);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} whatsappNumber={settings.whatsappNumber} />;
}