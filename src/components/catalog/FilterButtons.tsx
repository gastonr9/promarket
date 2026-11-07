"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface FilterButtonsProps {
  categories: Category[];
  selectedCategory: Category["slug"] | "Todos";
  onCategoryChange: (category: Category["slug"] | "Todos") => void;
}

export function FilterButtons({ categories, selectedCategory, onCategoryChange }: FilterButtonsProps) {
  // Filter out "Todos" from categories since we add it manually
  const categoryOptions = categories.filter(c => c.slug !== "todos");
  
  const allCategories = [
    { id: "todos", name: "Todos", slug: "Todos" },
    ...categoryOptions,
  ];

  return (
    <div
      className="filters flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar productos por categoría"
    >
      {allCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onCategoryChange(category.slug)}
          aria-pressed={selectedCategory === category.slug}
          className={cn(
            "h-11 px-4 text-sm font-heading font-bold uppercase tracking-wider rounded-md border transition-all duration-150",
            "active:scale-[0.98] hover:scale-[1.02]",
            selectedCategory === category.slug
              ? "bg-primary border-primary text-primary-foreground hover:bg-primary-hover"
              : "bg-background border-border text-foreground hover:border-primary hover:text-primary hover:bg-muted"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}