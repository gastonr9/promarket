import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("joins class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
  });

  it("handles Tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("generateSlug utility", () => {
  it("generates slug from name", () => {
    const generateSlug = (name: string): string => {
      return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    };

    expect(generateSlug("Producto Test")).toBe("producto-test");
    expect(generateSlug("Café con Leche")).toBe("cafe-con-leche");
    expect(generateSlug("  Espacios   Extra  ")).toBe("espacios-extra");
    expect(generateSlug("Especial!@#$%Characters")).toBe("especialcharacters");
  });
});

describe("formatPrice utility", () => {
  it("formats price in ARS", () => {
    const formatPrice = (price: number): string => {
      return `$${price.toLocaleString("es-AR")}`;
    };

    expect(formatPrice(1000)).toBe("$1.000");
    expect(formatPrice(1500000)).toBe("$1.500.000");
    expect(formatPrice(99)).toBe("$99");
  });
});