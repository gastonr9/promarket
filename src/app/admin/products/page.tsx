"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Upload, Download, ChevronLeft, ChevronRight, Package, FileSpreadsheet } from "lucide-react";
import { SearchInput } from "@/components/catalog/SearchInput";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { SessionProvider } from "@/components/providers/SessionProvider";
import type { Product, Category, Brand } from "@/types";

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  brand: string;
  description: string;
  detail: string;
  priceType: "consultar" | "fijo";
  fixedPrice: string;
  tags: string;
  images: string;
  active: boolean;
  order: string;
}

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  category: "",
  brand: "",
  description: "",
  detail: "",
  priceType: "consultar",
  fixedPrice: "",
  tags: "",
  images: "",
  active: true,
  order: "0",
};

function AdminProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<Array<{ name: string; type: string }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch data function - defined before useEffect
  const fetchData = async () => {
    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", { signal: abortControllerRef.current.signal });
      const data = await res.json();
      setProducts(data.products || []);
      setCategories(data.categories || []);
      setBrands(data.brands || []);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return; // Ignore aborted requests
      }
      console.error("Error fetching data:", error);
      showToast("No se pudieron cargar los datos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => fetchData(), 0);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL params to state - runs when searchParams change
  useEffect(() => {
    const action = searchParams.get("action");
    const editId = searchParams.get("edit");
    
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      if (action === "import") {
        setActiveTab("import");
        setDialogOpen(false);
      } else if (action === "new") {
        setActiveTab("form");
        setDialogOpen(true);
        setEditingProduct(null);
        setFormData(initialFormData);
      } else if (editId) {
        // For edit, we need products to be loaded first
        setActiveTab("form");
        setDialogOpen(true);
      } else {
        // Default - list view, no dialog
        setActiveTab("list");
        setDialogOpen(false);
        setEditingProduct(null);
        setFormData(initialFormData);
      }
    }, 0);
  }, [searchParams]);

  // Load product data for edit when products are available
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && products.length > 0) {
      const product = products.find(p => p.id === editId);
      if (product) {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => {
          setEditingProduct(product);
          setFormData({
            name: product.name,
            slug: product.slug,
            category: product.category,
            brand: typeof product.brand === "string" ? product.brand : product.brand?.name || "",
            description: product.description || "",
            detail: product.detail || "",
            priceType: product.priceType,
            fixedPrice: product.fixedPrice?.toString() || "",
            tags: product.tags?.join(", ") || "",
            images: product.images?.map(i => i.url).join(", ") || "",
            active: product.active,
            order: product.order.toString(),
          });
        }, 0);
      }
    }
  }, [searchParams, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      fixedPrice: formData.priceType === "fijo" ? parseFloat(formData.fixedPrice) : undefined,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      images: formData.images.split(",").map(u => ({ url: u.trim() })).filter(i => i.url),
      order: parseInt(formData.order) || 0,
    };

    try {
      const actionType = editingProduct ? "updateProduct" : "createProduct";
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionType, product: productData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast(editingProduct ? "Producto actualizado" : "Producto creado", "success");
      setDialogOpen(false);
      setFormData(initialFormData);
      setEditingProduct(null);
      router.replace("/admin/products");
      fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      brand: typeof product.brand === "string" ? product.brand : product.brand?.name || "",
      description: product.description || "",
      detail: product.detail || "",
      priceType: product.priceType,
      fixedPrice: product.fixedPrice?.toString() || "",
      tags: product.tags?.join(", ") || "",
      images: product.images?.map(i => i.url).join(", ") || "",
      active: product.active,
      order: product.order.toString(),
    });
    setDialogOpen(true);
    router.push(`/admin/products?edit=${product.id}`);
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteProduct", id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Producto eliminado correctamente", "success");
      fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
      // Preview - just show file name, server will parse
      setImportPreview([{ name: file.name, type: file.type }]);
    }
  };

  const handleImport = async () => {
    if (!importFile) return;
    try {
      const formData = new FormData();
      formData.append("file", importFile);

      const res = await fetch("/api/admin/products/import", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      showToast(`${result.imported} productos importados, ${result.errors} errores`, "success");
      setImportFile(null);
      setImportPreview([]);
      fetchData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  const downloadTemplate = async () => {
    try {
      const res = await fetch("/api/admin/products/template");
      if (!res.ok) throw new Error("Error generando plantilla");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "plantilla-productos.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (typeof p.brand === "string" ? p.brand : p.brand?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-3xl lg:text-4xl">Productos</h1>
            <p className="text-muted-foreground mt-1">Gestioná el catálogo mayorista</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadTemplate} className="gap-2">
              <Download className="h-4 w-4" />
              Plantilla Excel
            </Button>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo producto
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Lista ({products.length})</TabsTrigger>
            <TabsTrigger value="form">{editingProduct ? "Editar" : "Nuevo"}</TabsTrigger>
            <TabsTrigger value="import">
              <FileSpreadsheet className="h-4 w-4 mr-2" /> Importar Excel
            </TabsTrigger>
          </TabsList>

          {/* List Tab */}
          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={setSearch}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral" />
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Imagen</TableHead>
                          <TableHead>Producto</TableHead>
                          <TableHead>Categoría</TableHead>
                          <TableHead>Marca</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="w-40">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedProducts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No hay productos. <Button variant="link" onClick={openCreateDialog} className="p-0 h-auto">Crear uno</Button>
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedProducts.map((product) => (
                            <TableRow key={product.id} className={!product.active ? "opacity-50" : ""}>
                              <TableCell>
                                {product.images?.[0]?.url ? (
                                  <div className="h-12 w-12 relative rounded overflow-hidden">
                                    <Image 
                                      src={product.images[0].url} 
                                      alt={product.name} 
                                      fill 
                                      className="object-cover" 
                                      sizes="48px"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                                    <Package className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">{product.category}</Badge>
                              </TableCell>
                              <TableCell>
                                {typeof product.brand === "string" ? product.brand : product.brand?.name || "—"}
                              </TableCell>
                              <TableCell>
                                {product.priceType === "fijo" && product.fixedPrice
                                  ? `$${product.fixedPrice.toLocaleString("es-AR")}`
                                  : <Badge variant="secondary" className="text-xs">Consultar</Badge>}
                              </TableCell>
                              <TableCell>
                                <Badge variant={product.active ? "default" : "secondary"}>
                                  {product.active ? "Activo" : "Inactivo"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</span>
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>

          {/* Form Tab - just shows a message, dialog is rendered separately */}
          <TabsContent value="form" className="mt-4">
            <div className="text-center py-12 text-muted-foreground">
              <p>Usá el botón &quot;Nuevo producto&quot; o clickeá editar en la lista para abrir el formulario.</p>
            </div>
          </TabsContent>

          {/* Import Tab */}
          <TabsContent value="import" className="mt-4">
            <div className="space-y-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Importar desde Excel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Archivo Excel (.xlsx, .xls)</Label>
                    <Input type="file" accept=".xlsx,.xls" onChange={handleImportFile} />
                    {importFile && <p className="text-sm text-muted-foreground">Seleccionado: {importFile.name}</p>}
                  </div>

                  {importPreview.length > 0 && (
                    <div className="space-y-2">
                      <Label>Archivo listo para importar</Label>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">El servidor procesará el archivo y creará/actualizará productos automáticamente.</p>
                        <p className="text-xs text-muted-foreground mt-1">Columnas esperadas: name, category, brand, description, detail, priceType (consultar/fijo), fixedPrice, tags, images, active, order</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={handleImport} disabled={!importFile} className="gap-2">
                      <Upload className="h-4 w-4" />
                      Importar
                    </Button>
                    <Button variant="outline" onClick={downloadTemplate} className="gap-2">
                      <Download className="h-4 w-4" />
                      Descargar plantilla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>          </TabsContent>
        </Tabs>

        {/* Product Form Dialog - rendered outside Tabs for proper portal behavior */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Editar producto" : "Nuevo producto"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input id="slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select
                    id="category"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Select
                    id="brand"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                  >
                    <option value="">Seleccionar marca</option>
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    <option value="Marca a definir">Marca a definir</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <textarea id="description" className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="detail">Presentación / Detalle</Label>
                  <Input id="detail" placeholder="Ej: Botella · 2,25 L" value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceType">Tipo de precio</Label>
                  <Select
                    id="priceType"
                    value={formData.priceType}
                    onChange={e => setFormData({...formData, priceType: e.target.value as "consultar" | "fijo"})}
                  >
                    <option value="consultar">Consultar por WhatsApp</option>
                    <option value="fijo">Precio fijo</option>
                  </Select>
                </div>
              </div>

              {formData.priceType === "fijo" && (
                <div className="space-y-2">
                  <Label htmlFor="fixedPrice">Precio fijo (ARS)</Label>
                  <Input id="fixedPrice" type="number" step="0.01" value={formData.fixedPrice} onChange={e => setFormData({...formData, fixedPrice: e.target.value})} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
                <Input id="tags" placeholder="Ej: Bebidas, Promo, Nuevo" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Imágenes (URLs separadas por coma)</Label>
                <Input id="images" placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="order">Orden</Label>
                  <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
                </div>
                <div className="space-y-2 flex items-end">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="h-4 w-4 rounded border-input" />
                    Activo
                  </Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); setFormData(initialFormData); setEditingProduct(null); router.replace("/admin/products"); }}>
                  Cancelar
                </Button>
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  {editingProduct ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default function AdminProductsPage() {
  return (
    <SessionProvider>
      <ToastProvider>
        <Suspense fallback={
          <AdminLayout>
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral" />
            </div>
          </AdminLayout>
        }>
          <AdminProductsPageContent />
        </Suspense>
      </ToastProvider>
    </SessionProvider>
  );
}