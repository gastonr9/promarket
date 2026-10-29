"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
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

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const imageUrl = getImageUrl(product.images?.[0]);
  const tag = product.tags?.[0];

  return (
    <Link href={`/catalogo/${product.slug}`} className="block group">
      <article
        className={cn(
          "product-card h-full flex flex-col",
          "overflow-hidden border border-border rounded-[var(--radius)] bg-card",
          "transition-all duration-200",
          "hover:-translate-y-1 hover:shadow-brand",
          "animate-rise"
        )}
        style={{ animationDelay: `${Math.min(index * 45, 180)}ms` }}
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
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted animate-shimmer" aria-hidden="true">
              <span className="text-6xl opacity-30">{product.category === "Bebidas" ? "🥤" : product.category === "Snacks" ? "🍿" : "📦"}</span>
            </div>
          )}
          {tag && (
            <Badge variant="tag" className="absolute left-3 top-3 z-10 text-[10px] px-2 py-1 radius-nested">
              {tag}
            </Badge>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--coral-dark)]">
              {product.category}
            </p>

            <h3 className="text-sm leading-snug line-clamp-2 font-semibold group-hover:text-[var(--coral-dark)] transition-colors">
              {product.name}
            </h3>

            <p className="text-[11px] text-muted-foreground">
              {product.detail || "Consultar presentación"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
            <span className="text-xs font-bold text-foreground">
              {product.priceType === "fijo" && product.fixedPrice
                ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                : "Consultar precio"}
            </span>
            <span className="text-xs font-semibold text-[var(--coral-dark)] group-hover:underline">
              Ver detalle →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}