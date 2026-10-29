import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, Tag, UploadCloud, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, getCategories, getBrands, getSettings } from "@/lib/sanity";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata = {
  title: "Dashboard | Promarket Admin",
  description: "Panel de administración de Promarket Logística",
};

async function getStats() {
  const [products, categories, brands, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
    getSettings(),
  ]);

  return {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.active).length,
    totalCategories: categories.length,
    totalBrands: brands.length,
    whatsappConfigured: !!settings.whatsappNumber,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <SessionProvider>
      <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-3xl lg:text-4xl">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Gestioná tu catálogo mayorista</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/products?action=new">
              <Button className="gap-2">
                <Package className="h-4 w-4" />
                Nuevo producto
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/products" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">{stats.activeProducts} activos</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/categories" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Categorías</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCategories}</div>
                <p className="text-xs text-muted-foreground">Activas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/products?tab=brands" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Marcas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBrands}</div>
                <p className="text-xs text-muted-foreground">Registradas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">WhatsApp</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.whatsappConfigured ? "Configurado" : "Pendiente"}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.whatsappConfigured ? "Listo para pedidos" : "Configurar en ajustes"}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/admin/products?action=new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-border">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-semibold text-lg">Agregar producto</h3>
                <p className="text-sm text-muted-foreground mt-1">Cargar producto individual</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/products?action=import">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-border">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-semibold text-lg">Importar Excel</h3>
                <p className="text-sm text-muted-foreground mt-1">Carga masiva desde planilla</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-border">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Settings className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-semibold text-lg">Configurar sitio</h3>
                <p className="text-sm text-muted-foreground mt-1">WhatsApp, Hero, Anuncio</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
    </SessionProvider>
  );
}