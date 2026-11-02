import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

const mockProduct: Product = {
  id: "test-123",
  slug: "producto-test",
  name: "Producto Test",
  category: "Bebidas",
  brand: "Marca Test",
  description: "Descripción del producto",
  detail: "Botella 500ml",
  priceType: "fijo",
  fixedPrice: 1500,
  tags: ["promo", "nuevo"],
  images: [{ url: "/test-image.jpg", alt: "Imagen test" }],
  active: true,
  order: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Producto Test")).toBeInTheDocument();
  });

  it("renders brand name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Marca Test")).toBeInTheDocument();
  });

  it("renders price correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$1.500")).toBeInTheDocument();
  });

  it("renders detail", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Botella 500ml")).toBeInTheDocument();
  });

  it("renders tag badge", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("promo")).toBeInTheDocument();
  });

  it("links to product detail page", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link", { name: /producto test/i });
    expect(link).toHaveAttribute("href", "/catalogo/producto-test");
  });

  it("shows 'Consultar' for priceType consultar", () => {
    const productConsultar = { ...mockProduct, priceType: "consultar" as const, fixedPrice: undefined };
    render(<ProductCard product={productConsultar} />);
    expect(screen.getByText("Consultar")).toBeInTheDocument();
  });

  it("shows placeholder when no image", () => {
    const productNoImage = { ...mockProduct, images: [] };
    render(<ProductCard product={productNoImage} />);
    // Should render the SVG placeholder (box icon)
    expect(screen.getByTestId("product-placeholder")).toBeInTheDocument();
  });
});