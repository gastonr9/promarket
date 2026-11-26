import { getCatalogData } from "@/lib/data";
import { Catalog } from "@/components/sections/Catalog";
import { ToastProvider } from "@/components/ui/toast";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Catálogo Mayorista | Promarket Logística",
  description: "Explorá nuestro catálogo completo de productos para kioscos, almacenes y comercios. Bebidas, snacks, golosinas y más al por mayor.",
  alternates: {
    canonical: "/catalogo",
  },
};

// Force dynamic rendering due to searchParams usage (Next.js 15+)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const categoryParam = typeof resolvedParams.category === "string" ? resolvedParams.category : "Todos";
  const searchParam = typeof resolvedParams.q === "string" ? resolvedParams.q : "";

  const { products, categories } = await getCatalogData();

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Breadcrumb */}
        <nav className="breadcrumb wrap mx-auto px-6 lg:px-8 py-4" aria-label="Navegación">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span aria-current="page" className="text-foreground font-medium">Catálogo Mayorista</span>
            </li>
          </ol>
        </nav>

        <main className="flex-1">
          <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Cargando catálogo...</div>}>
            <Catalog
              products={products}
              categories={categories}
              initialCategory={categoryParam}
              initialSearch={searchParam}
            />
          </Suspense>
        </main>
      </div>
    </ToastProvider>
  );
}
