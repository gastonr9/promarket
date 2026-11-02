"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
        <motion.button
          key={category.slug}
          onClick={() => onCategoryChange(category.slug)}
          aria-pressed={selectedCategory === category.slug}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "h-9 px-3 text-xs font-bold rounded-[var(--radius)]",
            "transition-all duration-180",
            selectedCategory === category.slug
              ? "bg-[var(--ink)] text-white shadow-sm"
              : "bg-transparent border border-border text-[var(--ink)] hover:bg-[var(--mint)] hover:border-[var(--coral-dark)]"
          )}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}