"use client";

import { Dialog, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { X, MessageSquare } from "lucide-react";
import type { Product, ProductImage } from "@/types";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onWhatsAppClick: (productName: string) => void;
}

function getImageUrl(image: ProductImage | undefined): string | null {
  if (!image) return null;
  if (image.url) return image.url;
  return null;
}

export function ProductDialog({ product, open, onClose, onWhatsAppClick }: ProductDialogProps) {
  if (!product) return null;

  const imageUrl = getImageUrl(product.images?.[0]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogClose>
        <button
          className="absolute right-4 top-4 z-10 rounded-full p-1 bg-background/80 hover:bg-background text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Cerrar detalle"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </DialogClose>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/5] bg-muted overflow-hidden lg:rounded-r-none lg:rounded-bl-[calc(var(--radius)*2)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-8xl opacity-30">{product.category === "Bebidas" ? "🥤" : product.category === "Snacks" ? "🍿" : "📦"}</span>
            </div>
          )}
        </div>

        <div className="p-6 lg:p-8 flex flex-col">
          <div className="mb-4">
            <Badge variant="tag" className="mb-3 inline-block">
              {product.category}
            </Badge>
            <DialogTitle className="text-2xl lg:text-3xl font-heading font-bold leading-tight">
              {product.name}
            </DialogTitle>
          </div>

          <DialogDescription className="text-muted-foreground mb-6 leading-relaxed">
            {product.description || `${product.name}, disponible para consultar en presentación mayorista.`}
          </DialogDescription>

          <div className="border-t border-b border-border py-4 mb-6 space-y-3">
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Marca</dt>
                <dd className="font-semibold text-right">{typeof product.brand === "string" ? product.brand : product.brand?.name || "Consultar"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Presentación</dt>
                <dd className="font-semibold text-right">{product.detail || "Consultar"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Precio</dt>
                <dd className="font-semibold text-right">
                  {product.priceType === "fijo" && product.fixedPrice
                    ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                    : "Consultar por WhatsApp"}
                </dd>
              </div>
            </dl>
          </div>

          <Button
            variant="default"
            fullWidth
            size="lg"
            onClick={() => onWhatsAppClick(product.name)}
            className="mt-auto"
          >
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            Consultar por WhatsApp
          </Button>
        </div>
      </div>
    </Dialog>
  );
}