import { getProducts, getCategories } from "@/lib/data";

export const runtime = "nodejs";
export const revalidate = 3600; // ISR 1 hora

export async function GET() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://promarket.com.ar";

  const lines = [
    "# Promarket Logística - Catálogo completo (generado dinámicamente)",
    "",
    `Fuente: ${siteUrl}/catalogo`,
    `Actualizado: ${new Date().toISOString()}`,
    `Total productos: ${products.length}`,
    `Total categorías: ${categories.length}`,
    "",
    "## Catálogo principal",
    "/catalogo",
    "",
    "## Categorías",
    ...categories.map((c) => `- ${c.name}: /catalogo?category=${c.slug}`),
    "",
    "## Productos activos",
    ...products
      .sort((a, b) => a.order - b.order)
      .map((p) => `- ${p.name} (${p.category}): ${siteUrl}/catalogo/${p.slug}`),
    "",
    "## Cómo comprar",
    `${siteUrl}/#como-comprar`,
    "",
    "## Contacto",
    `${siteUrl}/#contacto`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}