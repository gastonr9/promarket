import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Auth check (rate limiting handled in middleware if needed)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const XLSX = await import("xlsx");

    const template = [
      {
        name: "Gaseosa Cola 2.25L",
        category: "Bebidas",
        brand: "Coca-Cola",
        description: "Gaseosa sabor cola",
        detail: "Botella · 2,25 L",
        priceType: "consultar",
        fixedPrice: "",
        tags: "Bebidas,Popular",
        images: "",
        active: true,
        order: 1,
      },
      {
        name: "Papas Clásicas 100g",
        category: "Snacks",
        brand: "Lay's",
        description: "Papas fritas clásicas",
        detail: "Paquete · 100 g",
        priceType: "consultar",
        fixedPrice: "",
        tags: "Snacks",
        images: "",
        active: true,
        order: 2,
      },
      {
        name: "Alfajor Triple",
        category: "Golosinas",
        brand: "Havana",
        description: "Alfajor triple de dulce de leche",
        detail: "Unidad · 70 g",
        priceType: "fijo",
        fixedPrice: "350",
        tags: "Golosinas,Premium",
        images: "",
        active: true,
        order: 3,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=plantilla-productos.xlsx",
      },
    });
  } catch (error) {
    console.error("Template generation error:", error);
    return NextResponse.json({ error: "Error generando plantilla" }, { status: 500 });
  }
}