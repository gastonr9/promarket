"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ProductCard, FilterButtons, SearchInput } from "@/components/catalog";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";
import type { Product, Category } from "@/types";
import { SectionReveal, MotionSection } from "@/components/ui";

interface CatalogProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

export function Catalog({ products, categories, initialCategory = "Todos", initialSearch = "" }: CatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<Category["slug"] | "Todos">(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minLoadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback((category: string, search: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "Todos") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }
    const queryStr = params.toString();
    const newUrl = queryStr ? `/catalogo?${queryStr}` : "/catalogo";
    router.replace(newUrl, { scroll: false });
  }, [router, searchParams]);

  const triggerLoading = useCallback(() => {
    setIsLoading(true);
    if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    if (minLoadingTimeoutRef.current) clearTimeout(minLoadingTimeoutRef.current);
    
    minLoadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCategoryChange = useCallback((category: Category["slug"] | "Todos") => {
    analytics.categoryChange(selectedCategory, category);
    analytics.filterUse("category", category, products.length);
    setSelectedCategory(category);
    triggerLoading();
    updateUrl(category, searchQuery);
  }, [triggerLoading, searchQuery, updateUrl, selectedCategory, products.length]);

  const handleSearchChange = useCallback((query: string) => {
    analytics.searchQuery(query, products.length);
    analytics.filterUse("search", query, products.length);
    setSearchQuery(query);
    triggerLoading();
    updateUrl(selectedCategory, query);
  }, [triggerLoading, selectedCategory, updateUrl, products.length]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const brandStr = typeof p.brand === "string" ? p.brand : p.brand?.name || "";
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (brandStr && brandStr.toLowerCase().includes(query)) ||
          (p.detail && p.detail.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
        );
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (minLoadingTimeoutRef.current) clearTimeout(minLoadingTimeoutRef.current);
    };
  }, []);

  const hasActiveFilters = selectedCategory !== "Todos" || searchQuery.trim();

  const clearFilters = useCallback(() => {
    setSelectedCategory("Todos");
    setSearchQuery("");
    updateUrl("Todos", "");
  }, [updateUrl]);

  return (
    <section id="catalogo" className="bg-muted py-16 lg:py-24" aria-labelledby="catalogo-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <SectionReveal>
          <MotionSection variant="itemFast">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <span className="font-heading font-medium text-sm text-primary uppercase tracking-wider mb-3 block">Catálogo</span>
                <h2 id="catalogo-title" className="font-heading font-bold leading-tight tracking-[-0.01em] text-[clamp(1.875rem,3vw,2.5rem)] text-foreground">
                  Nuestro
                  <br />
                  <span className="text-primary">catálogo mayorista</span>
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed max-w-[330px] text-muted-foreground">
                Explorá el surtido, filtrá por categoría y pedí precio por WhatsApp.
              </p>
            </div>
          </MotionSection>

          <MotionSection variant="itemFast">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div className="flex flex-wrap gap-3">
                <FilterButtons
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
                <SearchInput
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar productos, marcas..."
                />
              </div>
            </div>
          </MotionSection>

          {hasActiveFilters && (
            <div className="mb-6 flex items-center justify-between font-body text-sm text-muted-foreground">
              <span>Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos</span>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Limpiar filtros
              </Button>
            </div>
          )}

          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-lg">
              <p className="font-heading font-semibold text-foreground mb-2">No se encontraron productos</p>
              <p className="font-body text-sm text-muted-foreground">Probá con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="list" aria-label="Productos del catálogo">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}