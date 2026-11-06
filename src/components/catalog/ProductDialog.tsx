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
          className="absolute right-4 top-4 z-10 w-8 h-8 rounded-none bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors focus:outline-none focus:border-primary focus:ring-0"
          aria-label="Cerrar detalle"
        >
          <X className="h-4 w-4 mx-auto" aria-hidden="true" />
        </button>
      </DialogClose>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
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
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6 lg:p-8 flex flex-col">
          <div className="mb-4">
            <Badge variant="promo" className="mb-3 inline-block">
              {product.category}
            </Badge>
            <DialogTitle className="font-heading font-bold text-2xl lg:text-3xl leading-tight text-slate-900">
              {product.name}
            </DialogTitle>
          </div>

          <DialogDescription className="font-body text-slate-500 mb-6 leading-relaxed">
            {product.description || `${product.name}, disponible para consultar en presentación mayorista.`}
          </DialogDescription>

          <div className="border-t border-b border-slate-200 py-4 mb-6 space-y-3">
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div>
                <dt className="font-body text-slate-400">Marca</dt>
                <dd className="font-heading font-semibold text-right text-slate-900">{typeof product.brand === "string" ? product.brand : product.brand?.name || "Consultar"}</dd>
              </div>
              <div>
                <dt className="font-body text-slate-400">Presentación</dt>
                <dd className="font-heading font-semibold text-right text-slate-900">{product.detail || "Consultar"}</dd>
              </div>
              <div>
                <dt className="font-body text-slate-400">Precio</dt>
                <dd className="font-heading font-semibold text-right text-slate-900">
                  {product.priceType === "fijo" && product.fixedPrice
                    ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                    : "Consultar por WhatsApp"}
                </dd>
              </div>
            </dl>
          </div>

          <Button
            variant="whatsapp"
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