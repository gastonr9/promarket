"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variants = {
    text: "h-3 w-full rounded-none",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="product-card-skeleton border border-slate-200 rounded-none overflow-hidden bg-white">
      <div className="aspect-square w-full bg-slate-100" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/3" variant="text" />
        <Skeleton className="h-4 w-2/3" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <Skeleton className="h-3 w-16" variant="text" />
          <Skeleton className="h-10 w-24" variant="rectangular" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="status" aria-label="Cargando productos">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}