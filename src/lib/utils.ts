/**
 * Utility functions
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = formatPhoneNumber(phone);
  if (!cleanPhone) return "#";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateProductWhatsAppMessage(productName: string): string {
  return `Hola, quiero consultar precio y disponibilidad de ${productName}.`;
}

export function generateGeneralWhatsAppMessage(): string {
  return "Hola, tengo un comercio y quiero conocer el catálogo y las condiciones de entrega.";
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}