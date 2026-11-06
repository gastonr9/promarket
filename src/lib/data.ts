import fs from "fs";
import path from "path";
import type { Product, Category, Brand, Settings, LocalData } from "@/types";

const DATA_FILE = path.join(process.cwd(), "src", "data", "products.json");

// Helper to read data from JSON file
export function readData(): LocalData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(fileContent);
      
      // Admin credentials from environment variables
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

      console.log("[DATA] Module loaded - adminEmail:", adminEmail ? "SET" : "NOT SET");
      console.log("[DATA] Module loaded - adminPasswordHash:", adminPasswordHash ? "SET" : "NOT SET");

      if (adminEmail) {
        data.settings.adminEmail = adminEmail;
        console.log("[DATA] Applied adminEmail from env");
      }
      if (adminPasswordHash) {
        data.settings.adminPasswordHash = adminPasswordHash;
        console.log("[DATA] Applied adminPasswordHash from env");
      }
      return data;
    }
  } catch (error) {
    console.error("Error reading products.json:", error);
  }

  // Fallback default
  return {
    products: [],
    categories: [],
    brands: [],
    settings: {
      whatsappNumber: "",
      announcementText: "Atención a comercios · Consultá disponibilidad y zona de entrega por WhatsApp",
      heroTitle: "Tu negocio siempre <em>en movimiento.</em>",
      heroSubtitle: "Todo lo que tu kiosco o almacén necesita, en un solo lugar.",
    },
  };
}

// Helper to write data to JSON file
export function writeData(data: LocalData): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing products.json:", error);
    return false;
  }
}

// Data access functions (replacing Sanity fetchers)
export async function getProducts(): Promise<Product[]> {
  const data = readData();
  return data.products.filter((p: Product) => p.active !== false);
}

export async function getCategories(): Promise<Category[]> {
  const data = readData();
  return data.categories.filter((c: Category) => c.active !== false).sort((a: Category, b: Category) => a.order - b.order);
}

export async function getSettings(): Promise<Settings> {
  const data = readData();
  return data.settings;
}

export async function getBrands(): Promise<Brand[]> {
  const data = readData();
  return data.brands || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = readData();
  const product = data.products.find((p: Product) => p.slug === slug && p.active !== false);
  return product || null;
}

export async function getCatalogData(): Promise<{
  products: Product[];
  categories: Category[];
  settings: Settings;
}> {
  const data = readData();
  return {
    products: data.products.filter((p: Product) => p.active !== false),
    categories: data.categories.filter((c: Category) => c.active !== false).sort((a: Category, b: Category) => a.order - b.order),
    settings: data.settings,
  };
}