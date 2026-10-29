/**
 * Type definitions for Promarket Logística
 * Based on the original HTML catalog structure
 */

export type ProductCategory = 
  | "Bebidas" 
  | "Snacks" 
  | "Golosinas" 
  | "Higiene" 
  | "Almacén" 
  | "Dulces" 
  | "Merienda" 
  | "Mostrador"
  | string; // Allow custom categories from admin

export type ProductTag = 
  | "Bebidas" 
  | "Clásico" 
  | "Golosinas" 
  | "Higiene" 
  | "Dulces" 
  | "Almacén" 
  | "Merienda" 
  | "Snacks" 
  | "Mostrador"
  | string;

export type PriceType = "consultar" | "fijo";

// Simplified image for local storage (just URLs)
export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  brand?: Brand | string;
  description?: string;
  detail?: string; // "Botella · 2,25 L"
  priceType: PriceType;
  fixedPrice?: number; // Only when priceType === "fijo"
  tags?: ProductTag[];
  images?: ProductImage[];
  active: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: ProductImage;
  description?: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string; // emoji or icon name
  order: number;
  active: boolean;
}

export interface Settings {
  whatsappNumber: string;
  announcementText?: string;
  heroImage?: ProductImage;
  heroTitle?: string;
  heroSubtitle?: string;
  // Admin authentication
  adminEmail?: string;
  adminPasswordHash?: string;
}

// UI State types
export interface CatalogFilters {
  category: ProductCategory | "Todos";
  search: string;
}

export interface WhatsAppMessage {
  productName?: string;
  customMessage?: string;
}

// Component props - simplified for card click navigation
export interface ProductCardProps {
  product: Product;
  index?: number;
}

export interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export interface FilterButtonProps {
  category: ProductCategory | "Todos";
  isActive: boolean;
  onClick: (category: ProductCategory | "Todos") => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}