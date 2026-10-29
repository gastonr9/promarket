/**
 * Default product data - matches the original HTML
 * Used as fallback when Sanity is not configured
 */
import type { Product, Category, Brand, Settings } from "@/types";

export const defaultCategories: Category[] = [
  { id: "cat-todos", name: "Todos", slug: "todos", icon: "grid", order: 0, active: true },
  { id: "cat-bebidas", name: "Bebidas", slug: "bebidas", icon: "🥤", order: 1, active: true },
  { id: "cat-snacks", name: "Snacks", slug: "snacks", icon: "🍿", order: 2, active: true },
  { id: "cat-golosinas", name: "Golosinas", slug: "golosinas", icon: "🍬", order: 3, active: true },
  { id: "cat-higiene", name: "Higiene", slug: "higiene", icon: "🧴", order: 4, active: true },
  { id: "cat-almacen", name: "Almacén", slug: "almacen", icon: "📦", order: 5, active: true },
];

export const defaultBrands: Brand[] = [
  { id: "brand-placeholder", name: "Marca a definir", slug: "marca-a-definir", order: 0 },
];

export const defaultProducts: Product[] = [
  {
    id: "gaseosa-cola",
    name: "Gaseosa cola",
    slug: "gaseosa-cola",
    category: "Bebidas",
    brand: "Marca a definir",
    description: "Gaseosa sabor cola para sumar opciones frías a la heladera del local.",
    detail: "Botella · 2,25 L",
    priceType: "consultar",
    tags: ["Bebidas"],
    images: [],
    active: true,
    order: 1,
  },
  {
    id: "papas-clasicas",
    name: "Papas clásicas",
    slug: "papas-clasicas",
    category: "Snacks",
    brand: "Marca a definir",
    description: "Papas fritas clásicas para kioscos y comercios de cercanía.",
    detail: "Paquete · 100 g",
    priceType: "consultar",
    tags: ["Clásico"],
    images: [],
    active: true,
    order: 2,
  },
  {
    id: "alfajor-triple",
    name: "Alfajor triple",
    slug: "alfajor-triple",
    category: "Golosinas",
    brand: "Marca a definir",
    description: "Alfajor triple para venta por unidad o por caja. Consultá marcas y disponibilidad.",
    detail: "Unidad · consultar caja",
    priceType: "consultar",
    tags: ["Golosinas"],
    images: [],
    active: true,
    order: 3,
  },
  {
    id: "pasta-dental",
    name: "Pasta dental",
    slug: "pasta-dental",
    category: "Higiene",
    brand: "Marca a definir",
    description: "Producto de higiene personal en presentación familiar. Consultá variedades disponibles.",
    detail: "Tubo · 90 g",
    priceType: "consultar",
    tags: ["Higiene"],
    images: [],
    active: true,
    order: 4,
  },
  {
    id: "caramelos-surtidos",
    name: "Caramelos surtidos",
    slug: "caramelos-surtidos",
    category: "Golosinas",
    brand: "Marca a definir",
    description: "Surtido de caramelos para venta por unidad y exhibición en mostrador.",
    detail: "Bolsa · consultar peso",
    priceType: "consultar",
    tags: ["Golosinas"],
    images: [],
    active: true,
    order: 5,
  },
  {
    id: "chocolate-tableta",
    name: "Chocolate en tableta",
    slug: "chocolate-tableta",
    category: "Golosinas",
    brand: "Marca a definir",
    description: "Tableta de chocolate para kioscos, almacenes y comercios de barrio.",
    detail: "Tableta · consultar gramos",
    priceType: "consultar",
    tags: ["Dulces"],
    images: [],
    active: true,
    order: 6,
  },
  {
    id: "galletitas-dulces",
    name: "Galletitas dulces",
    slug: "galletitas-dulces",
    category: "Almacén",
    brand: "Marca a definir",
    description: "Galletitas dulces para acompañar desayunos y meriendas.",
    detail: "Paquete · consultar presentación",
    priceType: "consultar",
    tags: ["Merienda"],
    images: [],
    active: true,
    order: 7,
  },
  {
    id: "yerba-mate",
    name: "Yerba mate",
    slug: "yerba-mate",
    category: "Almacén",
    brand: "Marca a definir",
    description: "Yerba mate para el consumo diario. Consultá marcas y formatos disponibles.",
    detail: "Paquete · 1 kg",
    priceType: "consultar",
    tags: ["Almacén"],
    images: [],
    active: true,
    order: 8,
  },
  {
    id: "agua-mineral",
    name: "Agua mineral",
    slug: "agua-mineral",
    category: "Bebidas",
    brand: "Marca a definir",
    description: "Agua mineral para heladeras y venta de mostrador.",
    detail: "Botella · 2 L",
    priceType: "consultar",
    tags: ["Bebidas"],
    images: [],
    active: true,
    order: 9,
  },
  {
    id: "mani-salado",
    name: "Maní salado",
    slug: "mani-salado",
    category: "Snacks",
    brand: "Marca a definir",
    description: "Snack salado en presentación individual. Consultá caja y unidades.",
    detail: "Paquete · consultar presentación",
    priceType: "consultar",
    tags: ["Snacks"],
    images: [],
    active: true,
    order: 10,
  },
  {
    id: "arroz-largo-fino",
    name: "Arroz largo fino",
    slug: "arroz-largo-fino",
    category: "Almacén",
    brand: "Marca a definir",
    description: "Arroz largo fino para completar el surtido de almacén.",
    detail: "Paquete · 1 kg",
    priceType: "consultar",
    tags: ["Almacén"],
    images: [],
    active: true,
    order: 11,
  },
  {
    id: "chicles",
    name: "Chicles",
    slug: "chicles",
    category: "Golosinas",
    brand: "Marca a definir",
    description: "Chicles para exhibir junto a la caja como compra de impulso.",
    detail: "Blíster · consultar unidades",
    priceType: "consultar",
    tags: ["Mostrador"],
    images: [],
    active: true,
    order: 12,
  },
];

export const defaultSettings: Settings = {
  whatsappNumber: "",
  announcementText: "Atención a comercios · Consultá disponibilidad y zona de entrega por WhatsApp",
  heroTitle: "Tu negocio siempre <em>en movimiento.</em>",
  heroSubtitle: "Todo lo que tu kiosco o almacén necesita, en un solo lugar. Encontrá tus productos y pedinos precio directo por WhatsApp.",
};

// Helper functions
export function getActiveProducts(): Product[] {
  return defaultProducts.filter((p) => p.active);
}

export function getCategories(): Category[] {
  return defaultCategories.filter((c) => c.active).sort((a, b) => a.order - b.order);
}

export function getProductBySlug(slug: string): Product | undefined {
  return defaultProducts.find((p) => p.slug === slug && p.active);
}

export function getProductsByCategory(category: Category["slug"]): Product[] {
  if (category === "todos") return getActiveProducts();
  return getActiveProducts().filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return getActiveProducts();
  return getActiveProducts().filter((p) => {
    const brandStr = typeof p.brand === "string" ? p.brand : p.brand?.name || "";
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (brandStr && brandStr.toLowerCase().includes(q)) ||
      p.detail?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });
}