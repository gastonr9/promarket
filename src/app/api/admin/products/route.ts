import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData } from "@/lib/sanity/index";
import { productSchema, categorySchema, settingsSchema } from "@/lib/validation";

export async function GET() {
  try {
    // Auth check (rate limiting handled in middleware if needed)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = readData();
    return NextResponse.json({
      products: data.products,
      categories: data.categories,
      brands: data.brands,
      settings: data.settings,
    });
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json({ error: "Error al leer datos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check (rate limiting handled in middleware if needed)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { action, ...payload } = body;

    const data = readData();

    switch (action) {
      case "createProduct": {
        const { product } = payload;
        const validation = productSchema.safeParse(product);
        if (!validation.success) {
          return NextResponse.json({ error: "Datos inválidos", details: validation.error.flatten() }, { status: 400 });
        }
        const validated = validation.data;
        const newProduct = {
          ...validated,
          id: validated.id || crypto.randomUUID(),
          slug: validated.slug || validated.name.toLowerCase().replace(/\s+/g, "-"),
          fixedPrice: validated.fixedPrice === null ? undefined : validated.fixedPrice,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        data.products.push(newProduct);
        writeData(data);
        return NextResponse.json({ product: newProduct });
      }

      case "updateProduct": {
        const { product } = payload;
        const validation = productSchema.safeParse(product);
        if (!validation.success) {
          return NextResponse.json({ error: "Datos inválidos", details: validation.error.flatten() }, { status: 400 });
        }
        const index = data.products.findIndex((p) => p.id === product.id);
        if (index === -1) {
          return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
        }
        const updated = { 
          ...data.products[index], 
          ...validation.data, 
          fixedPrice: validation.data.fixedPrice === null ? undefined : validation.data.fixedPrice,
          updatedAt: new Date().toISOString() 
        };
        data.products[index] = updated;
        writeData(data);
        return NextResponse.json({ product: data.products[index] });
      }

      case "deleteProduct": {
        const { id } = payload;
        if (!id || typeof id !== "string") {
          return NextResponse.json({ error: "ID requerido" }, { status: 400 });
        }
        data.products = data.products.filter((p) => p.id !== id);
        writeData(data);
        return NextResponse.json({ success: true });
      }

      case "createCategory": {
        const { category } = payload;
        const validation = categorySchema.safeParse(category);
        if (!validation.success) {
          return NextResponse.json({ error: "Datos inválidos", details: validation.error.flatten() }, { status: 400 });
        }
        const validated = validation.data;
        const newCategory = {
          ...validated,
          id: validated.id || crypto.randomUUID(),
          slug: validated.slug || validated.name.toLowerCase().replace(/\s+/g, "-"),
        };
        data.categories.push(newCategory);
        writeData(data);
        return NextResponse.json({ category: newCategory });
      }

      case "updateCategory": {
        const { category } = payload;
        const validation = categorySchema.safeParse(category);
        if (!validation.success) {
          return NextResponse.json({ error: "Datos inválidos", details: validation.error.flatten() }, { status: 400 });
        }
        const index = data.categories.findIndex((c) => c.id === category.id);
        if (index === -1) {
          return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
        }
        data.categories[index] = { ...data.categories[index], ...validation.data };
        writeData(data);
        return NextResponse.json({ category: data.categories[index] });
      }

      case "deleteCategory": {
        const { id } = payload;
        if (!id || typeof id !== "string") {
          return NextResponse.json({ error: "ID requerido" }, { status: 400 });
        }
        data.categories = data.categories.filter((c) => c.id !== id);
        writeData(data);
        return NextResponse.json({ success: true });
      }

      case "createBrand": {
        const { brand } = payload;
        if (!brand?.name || typeof brand.name !== "string") {
          return NextResponse.json({ error: "Nombre de marca requerido" }, { status: 400 });
        }
        const newBrand = {
          ...brand,
          id: brand.id || crypto.randomUUID(),
          slug: brand.slug || brand.name.toLowerCase().replace(/\s+/g, "-"),
        };
        data.brands.push(newBrand);
        writeData(data);
        return NextResponse.json({ brand: newBrand });
      }

      case "updateSettings": {
        const { settings } = payload;
        const validation = settingsSchema.safeParse(settings);
        if (!validation.success) {
          return NextResponse.json({ error: "Datos inválidos", details: validation.error.flatten() }, { status: 400 });
        }
        const validated = validation.data;
        // Convert heroImage string to ProductImage object if provided
        const settingsToSave = {
          ...validated,
          heroImage: validated.heroImage ? { url: validated.heroImage, alt: "Hero image" } : undefined,
        };
        data.settings = { ...data.settings, ...settingsToSave };
        writeData(data);
        return NextResponse.json({ settings: data.settings });
      }

      case "importExcel": {
        const { products: importedProducts } = payload as { products: Array<{
          name?: string;
          category?: string;
          brand?: string;
          slug?: string;
          description?: string;
          detail?: string;
          priceType?: string;
          fixedPrice?: string | number;
          tags?: string | string[];
          images?: string | Array<{ url: string; alt?: string }>;
          active?: boolean;
          order?: string | number;
        }> };
        if (!Array.isArray(importedProducts)) {
          return NextResponse.json({ error: "Formato inválido: se esperaba array de productos" }, { status: 400 });
        }
        
        let imported = 0;
        let errors = 0;

        for (const imp of importedProducts) {
          try {
            // Validate required fields
            if (!imp.name || !imp.category) {
              errors++;
              continue;
            }

            // Sanitize inputs
            const name = String(imp.name).slice(0, 200);
            const categoryName = String(imp.category).slice(0, 100);
            const brandName = imp.brand ? String(imp.brand).slice(0, 100) : "Marca a definir";
            const slug = imp.slug ? String(imp.slug).slice(0, 200) : name.toLowerCase().replace(/\s+/g, "-");

            // Find or create category
            let category = data.categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
            if (!category) {
              category = {
                id: crypto.randomUUID(),
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
                icon: "📦",
                order: data.categories.length + 1,
                active: true,
              };
              data.categories.push(category);
            }

            // Find or create brand
            let brand = data.brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
            if (!brand) {
              brand = {
                id: crypto.randomUUID(),
                name: brandName,
                slug: brandName.toLowerCase().replace(/\s+/g, "-"),
                order: data.brands.length + 1,
              };
              data.brands.push(brand);
            }

            const existingIndex = data.products.findIndex((p) => p.slug === slug);

            const product = {
              id: existingIndex >= 0 ? data.products[existingIndex].id : crypto.randomUUID(),
              name,
              slug,
              category: category.name,
              brand: brand.name,
              description: String(imp.description || "").slice(0, 5000),
              detail: String(imp.detail || "").slice(0, 200),
              priceType: (imp.priceType === "fijo" ? "fijo" : "consultar") as "consultar" | "fijo",
              fixedPrice: imp.fixedPrice ? parseFloat(String(imp.fixedPrice)) : undefined,
              tags: imp.tags ? (typeof imp.tags === "string" ? String(imp.tags).split(",").map((t: string) => t.trim().slice(0, 50)) : imp.tags) : [],
              images: imp.images ? (typeof imp.images === "string" ? String(imp.images).split(",").map((u: string) => ({ url: u.trim() })).filter((i: { url: string }) => i.url.startsWith("http")) : imp.images) : [],
              active: imp.active !== false,
              order: imp.order ? parseInt(String(imp.order)) : data.products.length + 1,
              updatedAt: new Date().toISOString(),
            };

            if (existingIndex >= 0) {
              data.products[existingIndex] = product;
            } else {
              data.products.push({ ...product, createdAt: new Date().toISOString() });
            }
            imported++;
          } catch {
            errors++;
          }
        }

        writeData(data);
        return NextResponse.json({ imported, errors, total: imported + errors });
      }

      default:
        return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
    }
  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}