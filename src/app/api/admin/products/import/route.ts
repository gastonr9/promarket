import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readData, writeData } from "@/lib/sanity/index";
import type { Product } from "@/types";

interface ImportRow {
  name?: string;
  category?: string;
  brand?: string;
  description?: string;
  detail?: string;
  priceType?: string;
  fixedPrice?: string | number;
  tags?: string | string[];
  images?: string | { url: string; alt?: string }[];
  active?: boolean;
  order?: string | number;
  slug?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Auth check (rate limiting handled in middleware)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó archivo" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido. Use .xlsx o .xls" }, { status: 400 });
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Archivo muy grande (máx 2MB)" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);

    // Dynamic import for xlsx (server-side only)
    const XLSX = await import("xlsx");
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet) as ImportRow[];

    if (!Array.isArray(json) || json.length === 0) {
      return NextResponse.json({ error: "Archivo vacío o sin datos válidos" }, { status: 400 });
    }

    // Limit number of rows
    if (json.length > 500) {
      return NextResponse.json({ error: "Demasiadas filas (máx 500)" }, { status: 400 });
    }

    const dbData = readData();

    let imported = 0;
    let errors = 0;

    for (const imp of json) {
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
        let category = dbData.categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
        if (!category) {
          category = {
            id: crypto.randomUUID(),
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
            icon: "📦",
            order: dbData.categories.length + 1,
            active: true,
          };
          dbData.categories.push(category);
        }

        // Find or create brand
        let brand = dbData.brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
        if (!brand) {
          brand = {
            id: crypto.randomUUID(),
            name: brandName,
            slug: brandName.toLowerCase().replace(/\s+/g, "-"),
            order: dbData.brands.length + 1,
          };
          dbData.brands.push(brand);
        }

        const existingIndex = dbData.products.findIndex((p) => p.slug === slug);

        const product = {
          id: existingIndex >= 0 ? dbData.products[existingIndex].id : crypto.randomUUID(),
          name,
          slug,
          category: category.name,
          brand: brand.name,
          description: String(imp.description || "").slice(0, 5000),
          detail: String(imp.detail || "").slice(0, 200),
          priceType: (imp.priceType === "fijo" ? "fijo" : "consultar") as "consultar" | "fijo",
          fixedPrice: imp.fixedPrice ? parseFloat(String(imp.fixedPrice)) : undefined,
          tags: imp.tags
            ? (typeof imp.tags === "string"
                ? String(imp.tags).split(",").map((t: string) => t.trim().slice(0, 50))
                : imp.tags)
            : [],
          images: imp.images
            ? (typeof imp.images === "string"
                ? String(imp.images).split(",").map((u: string) => ({ url: u.trim() })).filter((i: { url: string }) => i.url.startsWith("http"))
                : imp.images)
            : [],
          active: imp.active !== false,
          order: imp.order ? parseInt(String(imp.order)) : dbData.products.length + 1,
          updatedAt: new Date().toISOString(),
        };

        if (existingIndex >= 0) {
          dbData.products[existingIndex] = product;
        } else {
          dbData.products.push({ ...product, createdAt: new Date().toISOString() } as Product);
        }
        imported++;
      } catch {
        errors++;
      }
    }

    writeData(dbData);
    return NextResponse.json({ imported, errors, total: imported + errors });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Error al importar archivo" }, { status: 500 });
  }
}