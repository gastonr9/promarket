"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import type { Product, ProductImage } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
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
  const hasDiscount = product.priceType === "fijo" && product.fixedPrice != null && product.originalPrice != null && product.originalPrice > product.fixedPrice;
  const discountPercent = hasDiscount && product.originalPrice != null && product.fixedPrice != null
    ? Math.round(((product.originalPrice - product.fixedPrice) / product.originalPrice) * 100)
    : 0;

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
          "bg-white border border-slate-200 rounded-lg shadow-sm",
          "transition-all duration-200",
          "hover:border-primary hover:shadow-md"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-200 p-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt || `${product.name} - ${product.detail || "producto"}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 920px) 25vw, 20vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105 will-change-transform"
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50" aria-hidden="true">
              <svg
                data-testid="product-placeholder"
                className="w-16 h-16 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}

          
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            {/* Category */}
            <span className="font-body text-xs text-slate-500 font-medium uppercase tracking-wider">
              {product.category}
            </span>

            {/* Product Name */}
            <h3 className="font-body text-base font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Brand & Detail */}
            <div className="flex items-center justify-between font-body text-sm text-slate-500 gap-2">
              <span className="truncate">{brandName}</span>
              {product.detail && (
                <span className="font-medium shrink-0">{product.detail}</span>
              )}
            </div>
          </div>

          {/* Price - Consultar por WhatsApp */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-slate-900">
                {product.priceType === "fijo" && product.fixedPrice != null
                  ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                  : "Consultar precio"}
              </span>
            </div>
            <p className="font-body text-xs text-slate-500 mt-1">Precio mayorista</p>
          </div>
        </div>
      </article>
    </Link>
  );
}