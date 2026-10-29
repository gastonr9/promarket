"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { SessionProvider } from "@/components/providers/SessionProvider";
import type { Category } from "@/types";

const initialCategory = { name: "", slug: "", icon: "📦", order: "0", active: true };

function AdminCategoriesPageContent() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState(initialCategory);
  const [dialogOpen, setDialogOpen] = useState(false);
  const debounceRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      showToast("No se pudieron cargar las categorías", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => fetchCategories(), 0);
  }, [fetchCategories]);

  // Cleanup debounce timeouts on unmount
  useEffect(() => {
    const refs = debounceRefs.current;
    return () => {
      refs.forEach((timeout) => clearTimeout(timeout));
      refs.clear();
    };
  }, []);

  const debouncedUpdateOrder = useCallback((id: string, newOrder: number) => {
    const existing = debounceRefs.current.get(id);
    if (existing) clearTimeout(existing);

    const timeout = setTimeout(async () => {
      try {
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updateCategory", category: { id, order: newOrder } }),
        });
        fetchCategories();
      } catch {
        showToast("Error al actualizar el orden", "error");
      }
      debounceRefs.current.delete(id);
    }, 300);

    debounceRefs.current.set(id, timeout);
  }, [showToast, fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      ...formData,
      order: parseInt(formData.order) || 0,
    };

    try {
      const actionType = editingCategory ? "updateCategory" : "createCategory";
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: actionType, category: categoryData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast(editingCategory ? "Categoría actualizada" : "Categoría creada", "success");
      setDialogOpen(false);
      setFormData(initialCategory);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      icon: category.icon || "📦",
      order: category.order.toString(),
      active: category.active,
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormData(initialCategory);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta categoría?")) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteCategory", id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Categoría eliminada correctamente", "success");
      fetchCategories();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      showToast(message, "error");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-3xl lg:text-4xl">Categorías</h1>
            <p className="text-muted-foreground mt-1">Organizá tu catálogo por categorías</p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva categoría
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral" />
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left font-semibold">Orden</th>
                      <th className="p-4 text-left font-semibold">Icono</th>
                      <th className="p-4 text-left font-semibold">Nombre</th>
                      <th className="p-4 text-left font-semibold">Slug</th>
                      <th className="p-4 text-left font-semibold">Estado</th>
                      <th className="p-4 text-right font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          No hay categorías. <Button variant="link" onClick={openCreateDialog} className="p-0 h-auto">Crear una</Button>
                        </td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category.id} className="border-b border-border/50 hover:bg-accent/50">
                          <td className="p-4">
                            <Input
                              type="number"
                              value={category.order}
                              onChange={(e) => {
                                const newOrder = parseInt(e.target.value) || 0;
                                debouncedUpdateOrder(category.id, newOrder);
                              }}
                              className="w-20"
                              aria-label={`Orden de ${category.name}`}
                            />
                          </td>
                          <td className="p-4 text-2xl">{category.icon || "📦"}</td>
                          <td className="p-4 font-medium">{category.name}</td>
                          <td className="p-4 text-muted-foreground">{category.slug}</td>
                          <td className="p-4">
                            <Badge variant={category.active ? "default" : "secondary"}>
                              {category.active ? "Activa" : "Inactiva"}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input id="slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icono / Emoji</Label>
                <Input id="icon" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="📦" maxLength={4} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="order">Orden</Label>
                  <Input id="order" type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
                </div>
                <div className="space-y-2 flex items-end">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="h-4 w-4 rounded border-input" />
                    Activa
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setDialogOpen(false); setFormData(initialCategory); setEditingCategory(null); }}>
                  Cancelar
                </Button>
                <Button type="submit" className="gap-2">
                  <Tag className="h-4 w-4" />
                  {editingCategory ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default function AdminCategoriesPage() {
  return (
    <SessionProvider>
      <ToastProvider>
        <AdminCategoriesPageContent />
      </ToastProvider>
    </SessionProvider>
  );
}