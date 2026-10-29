"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ProductCard, FilterButtons, SearchInput } from "@/components/catalog";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, Category } from "@/types";

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
    
    // Minimum 300ms loading for perceived performance
    minLoadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Safety timeout
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleCategoryChange = useCallback((category: Category["slug"] | "Todos") => {
    setSelectedCategory(category);
    triggerLoading();
    updateUrl(category, searchQuery);
  }, [triggerLoading, searchQuery, updateUrl]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    triggerLoading();
    updateUrl(selectedCategory, query);
  }, [triggerLoading, selectedCategory, updateUrl]);

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
    <section id="catalogo" className="py-14 lg:py-20" aria-labelledby="catalogo-title">
      <div className="wrap mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 id="catalogo-title" className="font-heading font-extrabold text-3xl lg:text-4xl mb-2">
              Catálogo mayorista
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg">
              Explorá nuestro surtido y consultá precios por WhatsApp
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <FilterButtons
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar en el catálogo..."
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
            </p>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </Button>
          </div>
        )}

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No se encontraron productos</p>
            <p className="text-sm text-muted-foreground">Probá con otros filtros o términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}