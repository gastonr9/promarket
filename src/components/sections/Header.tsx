"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

interface HeaderProps {
  categories: Category[];
  selectedCategory: Category["slug"] | "Todos";
  onCategoryChange: (category: Category["slug"] | "Todos") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit
}, ref) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryOptions = categories.filter(c => c.slug !== "todos");
  
  const allCategories = [
    { id: "todos", name: "Todas las categorías", slug: "Todos" },
    ...categoryOptions,
  ];

  const selectedCat = allCategories.find(c => c.slug === selectedCategory) || allCategories[0];

  return (
    <header ref={ref} className="header bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="wrap mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
          {/* Top row: Logo + Burger (mobile) */}
          <div className="flex items-center justify-between w-full lg:hidden">
            <Link href="#inicio" className="flex items-center gap-2 shrink-0" aria-label="ProMarket, inicio">
              <span className="w-10 h-10 grid place-items-center rounded-lg bg-primary text-white font-heading font-bold text-xl">
                P
              </span>
              <span className="font-heading font-bold text-xl leading-tight text-slate-900">
                <span className="text-primary">Pro</span>Market
              </span>
            </Link>

            <button 
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Logo */}
          <Link href="#inicio" className="flex items-center gap-2 shrink-0 hidden lg:flex" aria-label="ProMarket, inicio">
            <span className="w-10 h-10 grid place-items-center rounded-lg bg-primary text-white font-heading font-bold text-xl">
              P
            </span>
            <span className="font-heading font-bold text-xl leading-tight text-slate-900">
              <span className="text-primary">Pro</span>Market
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Logística</span>
            </span>
          </Link>

          {/* Search Bar - Compound */}
          <form onSubmit={onSearchSubmit} className="flex-1 max-w-2xl lg:max-w-3xl w-full lg:w-auto" role="search">
            <div className="relative flex rounded-md border border-slate-300 bg-white overflow-hidden hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              {/* Category Dropdown */}
              <div className="relative" ref={categoryRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 h-11 bg-white text-slate-700 font-body text-sm font-medium border-r border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isCategoryOpen}
                  aria-label="Seleccionar categoría"
                >
                  <span className="hidden sm:inline">{selectedCat.name}</span>
                  <span className="sm:hidden">Categorías</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                
                {isCategoryOpen && (
                  <ul className="absolute left-0 top-full z-50 w-56 md:w-64 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
                    {allCategories.map((cat) => (
                      <li key={cat.slug}>
                        <button
                          type="button"
                          onClick={() => {
                            onCategoryChange(cat.slug);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left font-body text-sm transition-colors ${
                            selectedCategory === cat.slug
                              ? "bg-primary-light text-primary font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                          role="option"
                          aria-selected={selectedCategory === cat.slug}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Buscar productos, marcas, SKU..."
                  className="w-full h-11 pl-10 pr-4 bg-transparent font-body text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  aria-label="Buscar productos"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* Search Button */}
              <Button type="submit" variant="whatsapp" size="default" className="px-5 h-11" aria-label="Buscar">
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </form>

          {/* CTA Button - Solicitar Catálogo (Desktop) */}
          <Link href="#catalogo" className="hidden lg:inline-flex">
            <Button variant="primary" size="default" className="whitespace-nowrap">
              Solicitar catálogo
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-slate-200 pt-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <nav className="flex flex-col gap-2">
              <Link href="#inicio" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Inicio</Link>
              <Link href="#catalogo" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Catálogo Mayorista</Link>
              <Link href="#como-comprar" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Cómo Pedir</Link>
              <Link href="#ofertas" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Ofertas</Link>
              <Link href="#nosotros" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Sobre Nosotros</Link>
              <Link href="#contacto" className="px-2 py-2 font-body text-sm font-medium text-slate-700 hover:text-primary">Contacto</Link>
              <Link href="#catalogo" className="mt-2">
                <Button variant="primary" size="lg" className="w-full justify-center" fullWidth>
                  Solicitar catálogo
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";