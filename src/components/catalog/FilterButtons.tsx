"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

interface FilterButtonsProps {
  categories: Category[];
  selectedCategory: Category["slug"] | "Todos";
  onCategoryChange: (category: Category["slug"] | "Todos") => void;
}

export function FilterButtons({ categories, selectedCategory, onCategoryChange }: FilterButtonsProps) {
  const allCategories = [
    { id: "todos", name: "Todos", slug: "Todos" },
    ...categories,
  ];

  return (
    <div
      className="filters flex flex-wrap gap-2"
      role="group"
      aria-label="Filtrar productos por categoría"
    >
      {allCategories.map((category) => (
        <Button
          key={category.slug}
          variant={selectedCategory === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.slug)}
          aria-pressed={selectedCategory === category.slug}
          className={cn(
            "h-9 px-3 text-xs font-bold",
            "transition-all duration-180",
            selectedCategory === category.slug
              ? "shadow-sm"
              : "hover:bg-muted"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}