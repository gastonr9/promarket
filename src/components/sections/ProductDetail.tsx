"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MessageSquare, ArrowLeft, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react";
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
    <article className="product-detail min-h-screen">
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
            <div className="relative aspect-[4/5] bg-muted rounded-[var(--radius-xl)] overflow-hidden">
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
                <div className="w-full h-full flex items-center justify-center bg-muted animate-shimmer" aria-hidden="true">
                  <span className="text-8xl opacity-30">
                    {product.category === "Bebidas" ? "🥤" : product.category === "Snacks" ? "🍿" : "📦"}
                  </span>
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
                      className="relative flex-shrink-0 w-20 h-20 rounded-[var(--radius)] overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
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
              <Badge variant="tag" className="mb-3 inline-block radius-nested">
                {product.category}
              </Badge>
              <h1 className="font-heading font-extrabold text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
            </div>

            {product.description && (
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            <div className="specs border-t border-b border-border py-5 mb-6 space-y-4">
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                {product.detail && (
                  <>
                    <dt className="text-muted-foreground">Presentación</dt>
                    <dd className="font-semibold text-right">{product.detail}</dd>
                  </>
                )}
                {brandName && (
                  <>
                    <dt className="text-muted-foreground">Marca</dt>
                    <dd className="font-semibold text-right">{brandName}</dd>
                  </>
                )}
                <dt className="text-muted-foreground">Categoría</dt>
                <dd className="font-semibold text-right">{product.category}</dd>
                <dt className="text-muted-foreground">Precio</dt>
                <dd className="font-semibold text-right text-[var(--coral-dark)] text-lg">
                  {product.priceType === "fijo" && product.fixedPrice
                    ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                    : "Consultar por WhatsApp"}
                </dd>
              </dl>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="tags flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs radius-nested">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="cta-group flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                variant="default"
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

            {/* Trust indicators */}
            <div className="trust-indicators grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center p-3">
                <Truck className="h-6 w-6 text-[var(--coral-dark)] mb-2" aria-hidden="true" />
                <span className="text-xs font-semibold">Entrega a tu zona</span>
                <span className="text-[10px] text-muted-foreground">Consultá cobertura</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="h-6 w-6 text-[var(--coral-dark)] mb-2" aria-hidden="true" />
                <span className="text-xs font-semibold">Precios mayoristas</span>
                <span className="text-[10px] text-muted-foreground">Sin intermediarios</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <RotateCcw className="h-6 w-6 text-[var(--coral-dark)] mb-2" aria-hidden="true" />
                <span className="text-xs font-semibold">Reposición ágil</span>
                <span className="text-[10px] text-muted-foreground">Stock continuo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products - placeholder with better empty state */}
        <section className="related mt-16" aria-labelledby="related-title">
          <h2 id="related-title" className="font-heading font-extrabold text-2xl lg:text-3xl mb-6">
            También te puede interesar
          </h2>
          <div className="text-muted-foreground text-center py-12 border-2 border-dashed border-border rounded-[var(--radius-xl)] space-y-4">
            <p>
              <Link href="/#catalogo" className="underline text-[var(--coral-dark)] hover:text-[var(--coral)]">Explorar catálogo completo</Link> para ver todo el surtido.
            </p>
            <span className="text-sm block">Próximamente: productos relacionados por categoría</span>
          </div>
        </section>
      </div>
    </article>
  );
}