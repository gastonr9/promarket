"use client";

import { track as vercelTrack } from "@vercel/analytics/react";

export type AnalyticsEventName =
  | "product_view"
  | "whatsapp_click"
  | "filter_use"
  | "search_query"
  | "category_change"
  | "pdf_export"
  | "product_create"
  | "product_update"
  | "product_delete"
  | "import_products"
  | "command_palette_open"
  | "command_palette_execute";

interface BaseEventProperties {
  timestamp: string;
  page: string;
  referrer?: string;
}

// Event property interfaces (for documentation and type inference)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProductViewProperties extends BaseEventProperties {
  product_id: string;
  product_name: string;
  category: string;
  brand: string;
  price_type: "consultar" | "fijo";
  has_fixed_price: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WhatsAppClickProperties extends BaseEventProperties {
  product_id: string;
  product_name: string;
  phone_number: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FilterUseProperties extends BaseEventProperties {
  filter_type: "category" | "search";
  filter_value: string;
  results_count: number;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SearchQueryProperties extends BaseEventProperties {
  query: string;
  results_count: number;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CategoryChangeProperties extends BaseEventProperties {
  from_category: string;
  to_category: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PDFExportProperties extends BaseEventProperties {
  products_count: number;
  categories_count: number;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProductActionProperties extends BaseEventProperties {
  product_id: string;
  product_name: string;
  category: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImportProductsProperties extends BaseEventProperties {
  file_size: number;
  file_name: string;
  imported_count: number;
  errors_count: number;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CommandPaletteProperties extends BaseEventProperties {
  command_id: string;
  command_label: string;
  command_section: string;
}

function getBaseProperties(): BaseEventProperties {
  if (typeof window === "undefined") {
    return { timestamp: new Date().toISOString(), page: "" };
  }
  return {
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    referrer: document.referrer || undefined,
  };
}

/**
 * Track a custom analytics event using Vercel Analytics
 * Events are sent to Vercel's analytics backend
 */
export function track(eventName: AnalyticsEventName, properties?: Record<string, string | number | boolean | null | undefined>) {
  const baseProps = getBaseProperties();
  const eventProperties: Record<string, string | number | boolean | null | undefined> = { ...baseProps, ...(properties as Record<string, string | number | boolean | null | undefined>) };

  try {
    // Vercel Analytics track function accepts event name and properties
    vercelTrack(eventName, eventProperties);
  } catch (error) {
    // Silently fail in production, log in development
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Failed to track event:", eventName, error);
    }
  }
}

// Convenience functions for common events
export const analytics = {
  productView: (product: {
    id: string;
    name: string;
    category: string;
    brand: string | { name: string };
    priceType: "consultar" | "fijo";
    fixedPrice?: number;
  }) => {
    track("product_view", {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      brand: typeof product.brand === "string" ? product.brand : product.brand?.name || "General",
      price_type: product.priceType,
      has_fixed_price: product.priceType === "fijo" && !!product.fixedPrice,
    });
  },

  whatsappClick: (productId: string, productName: string, phoneNumber: string) => {
    track("whatsapp_click", {
      product_id: productId,
      product_name: productName,
      phone_number: phoneNumber,
    });
  },

  filterUse: (filterType: "category" | "search", filterValue: string, resultsCount: number) => {
    track("filter_use", {
      filter_type: filterType,
      filter_value: filterValue,
      results_count: resultsCount,
    });
  },

  searchQuery: (query: string, resultsCount: number) => {
    track("search_query", {
      query,
      results_count: resultsCount,
    });
  },

  categoryChange: (fromCategory: string, toCategory: string) => {
    track("category_change", {
      from_category: fromCategory,
      to_category: toCategory,
    });
  },

  pdfExport: (productsCount: number, categoriesCount: number) => {
    track("pdf_export", {
      products_count: productsCount,
      categories_count: categoriesCount,
    });
  },

  productCreate: (productId: string, productName: string, category: string) => {
    track("product_create", {
      product_id: productId,
      product_name: productName,
      category,
    });
  },

  productUpdate: (productId: string, productName: string, category: string) => {
    track("product_update", {
      product_id: productId,
      product_name: productName,
      category,
    });
  },

  productDelete: (productId: string, productName: string, category: string) => {
    track("product_delete", {
      product_id: productId,
      product_name: productName,
      category,
    });
  },

  importProducts: (fileSize: number, fileName: string, importedCount: number, errorsCount: number) => {
    track("import_products", {
      file_size: fileSize,
      file_name: fileName,
      imported_count: importedCount,
      errors_count: errorsCount,
    });
  },

  commandPaletteOpen: () => {
    track("command_palette_open");
  },

  commandPaletteExecute: (commandId: string, commandLabel: string, commandSection: string) => {
    track("command_palette_execute", {
      command_id: commandId,
      command_label: commandLabel,
      command_section: commandSection,
    });
  },
};