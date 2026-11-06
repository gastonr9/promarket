"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MessageSquare, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Product, ProductImage } from "@/types";

interface ProductDetailProps {
  product: Product;
  whatsappNumber?: string;
}

export function ProductDetail({ product, whatsappNumber }: ProductDetailProps) {
  // Handle both local format (url) and Sanity format (asset._ref)
  const getImageUrl = (img: ProductImage | undefined): string | null => {
    if (!img) return null;
    if (img.url) return img.url;
    // Legacy Sanity format support (not used with local JSON)
    const assetRef = (img as ProductImage & { asset?: { _ref?: string } }).asset?._ref;
    if (assetRef) {
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${assetRef.replace("image-", "").replace("-", ".")}`;
    }
    return null;
  };

  // Base64 encoded 10x10px placeholder for blur effect
  const blurDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZGRkIi8+PC9zdmc+";

  const imageUrl = getImageUrl(product.images?.[0]);
  const additionalImages = (product.images || []).slice(1);

  const handleWhatsAppClick = () => {
    const message = `Hola, quiero consultar precio y disponibilidad de ${product.name}.`;
    const cleanNumber = whatsappNumber?.replace(/\D/g, "") || "";

    if (!cleanNumber) {
      alert("WhatsApp todavía no está configurado.");
      return;
    }

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name;

  // JSON-LD structured data for Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} - ${product.detail || "Consultar presentación"}`,
    brand: brandName ? { "@type": "Brand", name: brandName } : undefined,
    category: product.category,
    image: imageUrl || undefined,
    sku: product.id,
    offers: product.priceType === "fijo" && product.fixedPrice ? {
      "@type": "Offer",
      price: product.fixedPrice,
      priceCurrency: "ARS",
      availability: product.active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    } : undefined,
  };

  return (
    <article className="product-detail min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb */}
      <nav className="breadcrumb wrap mx-auto px-6 lg:px-8 py-4" aria-label="Navegación">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/#catalogo" className="hover:text-foreground transition-colors">Catálogo</Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span aria-current="page">{product.category}</span>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span aria-current="page" className="text-foreground font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="wrap mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="detail-grid grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Gallery */}
          <div className="detail-gallery space-y-4">
            <div className="relative aspect-[4/5] bg-muted rounded-xl overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.images?.[0]?.alt || `${product.name} - detalle`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  width={600}
                  height={750}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted animate-pulse" aria-hidden="true">
                  <svg className="w-24 h-24 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
            </div>

            {additionalImages.length > 0 && (
              <div className="thumbnails flex gap-3 overflow-x-auto pb-2">
                {additionalImages.map((img, i) => {
                  const imgUrl = getImageUrl(img);
                  return (
                    <button
                      key={i}
                      className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                      aria-label={`Ver imagen ${i + 2}`}
                    >
                      {imgUrl && (
                        <Image
                          src={imgUrl}
                          alt={img.alt || `${product.name} - miniatura ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          placeholder="blur"
                          blurDataURL={blurDataUrl}
                          width={80}
                          height={80}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info & Actions */}
          <div className="detail-info flex flex-col">
            <div className="mb-4">
              <Badge variant="tag" className="mb-3 inline-block">
                {product.category}
              </Badge>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl leading-tight text-foreground">
                {product.name}
              </h1>
            </div>

            {product.description && (
              <p className="font-body text-base lg:text-lg leading-relaxed mb-6 text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="specs border-t border-b border-border py-5 mb-6 space-y-4">
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                {product.detail && (
                  <>
                    <dt className="font-body text-muted-foreground">Presentación</dt>
                    <dd className="font-heading font-semibold text-right text-foreground">{product.detail}</dd>
                  </>
                )}
                {brandName && (
                  <>
                    <dt className="font-body text-muted-foreground">Marca</dt>
                    <dd className="font-heading font-semibold text-right text-foreground">{brandName}</dd>
                  </>
                )}
                <dt className="font-body text-muted-foreground">Categoría</dt>
                <dd className="font-heading font-semibold text-right text-foreground">{product.category}</dd>
                <dt className="font-body text-muted-foreground">Precio</dt>
                <dd className="font-heading font-semibold text-right text-primary text-lg">
                  {product.priceType === "fijo" && product.fixedPrice
                    ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                    : "Consultar por WhatsApp"}
                </dd>
              </dl>
            </div>

            {/* CTA Buttons */}
            <div className="cta-group flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleWhatsAppClick}
                className="gap-2"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                Consultar por WhatsApp
              </Button>
              <Link href="/#catalogo">
                <Button variant="secondary" fullWidth size="lg" className="gap-2">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Volver al catálogo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}