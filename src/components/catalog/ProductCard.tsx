"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import type { Product, ProductImage } from "@/types";

interface ProductCardProps {
  product: Product;
}

function getImageUrl(image: ProductImage | undefined): string | null {
  if (!image) return null;
  if (image.url) return image.url;
  return null;
}

// Base64 encoded 10x10px placeholder for blur effect
const blurDataUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZGRkIi8+PC9zdmc+";

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getImageUrl(product.images?.[0]);
  const tag = product.tags?.[0];
  const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name || "General";

  const handleClick = () => {
    analytics.productView({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: brandName,
      priceType: product.priceType,
      fixedPrice: product.fixedPrice,
    });
  };

  return (
    <Link href={`/catalogo/${product.slug}`} className="block group" onClick={handleClick}>
      <article
        className={cn(
          "product-card h-full flex flex-col",
          "overflow-hidden border border-border rounded-[var(--radius)] bg-card",
          "transition-all duration-200",
          "hover:-translate-y-1 hover:shadow-brand"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt || `${product.name} - ${product.detail || "producto"}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 920px) 25vw, 25vw"
              className="object-cover transition-transform duration-350 group-hover:scale-[1.045] will-change-transform"
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted animate-shimmer" aria-hidden="true">
              <svg 
                data-testid="product-placeholder"
                className="w-12 h-12 text-muted-foreground/20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
          {tag && (
            <Badge variant="tag" className="absolute left-3 top-3 z-10 text-[10px] px-2 py-1 radius-nested">
              {tag}
            </Badge>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                {brandName}
              </p>
              <span className="text-[9px] font-bold text-muted-foreground/60">
                REF: {product.id.slice(0, 6).toUpperCase()}
              </span>
            </div>

            <h3 className="text-sm leading-snug line-clamp-2 font-bold group-hover:text-[var(--coral-dark)] transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center gap-1.5 pt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-pulse" />
              <p className="text-[11px] font-medium text-muted-foreground">
                {product.detail || "Presentación mayorista"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-bold uppercase leading-none mb-1">
                Precio Lista
              </span>
              <span className="text-sm font-black text-foreground tracking-tight">
                {product.priceType === "fijo" && product.fixedPrice
                  ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                  : "Consultar"}
              </span>
            </div>
            <div className="bg-muted px-2 py-1 rounded-sm group-hover:bg-[var(--coral-dark)] group-hover:text-white transition-colors">
              <span className="text-[10px] font-bold uppercase">Ver más</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}