import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Catalog } from "@/components/sections/Catalog";
import type { Product, Category } from "@/types";

const mockProducts: Product[] = [
  {
    id: "1",
    slug: "producto-1",
    name: "Producto 1",
    category: "Bebidas",
    brand: "Marca A",
    description: "Desc 1",
    detail: "Botella 500ml",
    priceType: "fijo",
    fixedPrice: 1000,
    tags: [],
    images: [],
    active: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "producto-2",
    name: "Producto 2",
    category: "Snacks",
    brand: "Marca B",
    description: "Desc 2",
    detail: "Paquete 100g",
    priceType: "consultar",
    tags: ["nuevo"],
    images: [],
    active: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "producto-3",
    name: "Producto 3",
    category: "Bebidas",
    brand: "Marca A",
    description: "Desc 3",
    detail: "Lata 350ml",
    priceType: "fijo",
    fixedPrice: 800,
    tags: [],
    images: [],
    active: false,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockCategories: Category[] = [
  { id: "1", name: "Bebidas", slug: "bebidas" },
  { id: "2", name: "Snacks", slug: "snacks" },
];

describe("Catalog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders catalog title", () => {
    render(<Catalog products={mockProducts} categories={mockCategories} />);
    expect(screen.getByText("Catálogo Mayorista")).toBeInTheDocument();
  });

  it("renders all products initially", () => {
    render(<Catalog products={mockProducts} categories={mockCategories} />);
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    expect(screen.getByText("Producto 3")).toBeInTheDocument();
  });

  it("filters by category", async () => {
    render(<Catalog products={mockProducts} categories={mockCategories} initialCategory="Bebidas" />);
    
    await waitFor(() => {
      expect(screen.getByText("Producto 1")).toBeInTheDocument();
      expect(screen.getByText("Producto 3")).toBeInTheDocument();
    });
    
    expect(screen.queryByText("Producto 2")).not.toBeInTheDocument();
  });

  it("shows correct product count when filtered", () => {
    // This test needs active filters to show the count
    render(<Catalog products={mockProducts} categories={mockCategories} initialCategory="Bebidas" />);
    expect(screen.getByText(/Mostrando/i)).toBeInTheDocument();
    expect(screen.getByText(/de/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
  });

  it("shows no results message when filter yields no products", () => {
    // Create a scenario where search yields no results
    render(<Catalog products={mockProducts} categories={mockCategories} initialSearch="inexistente" />);
    
    expect(screen.getByText("No se encontraron productos")).toBeInTheDocument();
  });
});