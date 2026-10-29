"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded-[var(--radius-sm)]",
    circular: "rounded-full",
    rectangular: "rounded-[var(--radius)]",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="product-card-skeleton">
      <div className="aspect-[4/3] w-full bg-muted rounded-t-[var(--radius)]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/4" variant="text" />
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Skeleton className="h-3 w-20" variant="text" />
          <Skeleton className="h-9 w-28" variant="rectangular" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="product-grid" role="status" aria-label="Cargando productos">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}