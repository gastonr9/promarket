"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Header } from "./Header";
import type { Category } from "@/types";

interface HeaderWrapperProps {
  categories: Category[];
}

export function HeaderWrapper({ categories }: HeaderWrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category["slug"] | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  // Measure header height and set CSS variable for NavBar sticky positioning
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => {
      const height = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    updateHeight();
    
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    
    window.addEventListener('resize', updateHeight);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleCategoryChange = useCallback((category: Category["slug"] | "Todos") => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <Header
      ref={headerRef}
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onSearchSubmit={handleSearchSubmit}
    />
  );
}