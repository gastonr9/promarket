// Input validation schemas using Zod
import { z } from "zod";

// Product validation
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nombre requerido").max(200, "Nombre muy largo"),
  slug: z.string().min(1, "Slug requerido").max(200, "Slug muy largo").regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  category: z.string().min(1, "Categoría requerida"),
  brand: z.string().min(1, "Marca requerida").max(100, "Marca muy larga"),
  description: z.string().max(5000, "Descripción muy larga").optional().default(""),
  detail: z.string().max(200, "Detalle muy largo").optional().default(""),
  priceType: z.enum(["consultar", "fijo"]),
  fixedPrice: z.number().positive("Precio debe ser positivo").optional().nullable(),
  tags: z.array(z.string().max(50)).max(20, "Demasiadas etiquetas").optional().default([]),
  images: z.array(z.object({ url: z.string().url("URL inválida"), alt: z.string().optional() })).max(10, "Máximo 10 imágenes").optional().default([]),
  active: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

// Category validation
export const categorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nombre requerido").max(100, "Nombre muy largo"),
  slug: z.string().min(1, "Slug requerido").max(100, "Slug muy largo").regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones"),
  icon: z.string().max(10, "Icono muy largo").optional().default("📦"),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});

// Settings validation
export const settingsSchema = z.object({
  whatsappNumber: z.string().regex(/^\d{10,15}$/, "Número inválido (10-15 dígitos)").optional().default(""),
  announcementText: z.string().max(300, "Texto muy largo").optional().default(""),
  heroTitle: z.string().max(200, "Título muy largo").optional().default(""),
  heroSubtitle: z.string().max(500, "Subtítulo muy largo").optional().default(""),
  heroImage: z.string().url("URL inválida").optional().nullable().default(""),
  adminEmail: z.string().email("Email inválido").optional().default(""),
  adminPasswordHash: z.string().optional().default(""),
});

// Import file validation
export const importSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"].includes(file.type),
    "Solo archivos .xlsx o .xls"
  ).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    "Archivo muy grande (máx 5MB)"
  ),
});

// Type inference
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;