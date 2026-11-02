import { describe, it, expect, vi, beforeEach } from "vitest";
import { analytics, track } from "@/lib/analytics";

// Mock @vercel/analytics/react
vi.mock("@vercel/analytics/react", () => ({
  track: vi.fn(),
}));

describe("Analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("track function", () => {
    it("calls vercel track with event name and properties", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      track("test_event", { key: "value" });
      
      expect(vercelTrack).toHaveBeenCalledWith("test_event", expect.objectContaining({
        key: "value",
        timestamp: expect.any(String),
        page: expect.any(String),
      }));
    });
  });

  describe("analytics helpers", () => {
    it("productView tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.productView({
        id: "prod-1",
        name: "Test Product",
        category: "Bebidas",
        brand: "Marca Test",
        priceType: "fijo",
        fixedPrice: 1000,
      });
      
      expect(vercelTrack).toHaveBeenCalledWith("product_view", expect.objectContaining({
        product_id: "prod-1",
        product_name: "Test Product",
        category: "Bebidas",
        brand: "Marca Test",
        price_type: "fijo",
        has_fixed_price: true,
      }));
    });

    it("whatsappClick tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.whatsappClick("prod-1", "Test Product", "+5491100000000");
      
      expect(vercelTrack).toHaveBeenCalledWith("whatsapp_click", expect.objectContaining({
        product_id: "prod-1",
        product_name: "Test Product",
        phone_number: "+5491100000000",
      }));
    });

    it("filterUse tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.filterUse("category", "Bebidas", 10);
      
      expect(vercelTrack).toHaveBeenCalledWith("filter_use", expect.objectContaining({
        filter_type: "category",
        filter_value: "Bebidas",
        results_count: 10,
      }));
    });

    it("searchQuery tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.searchQuery("café", 5);
      
      expect(vercelTrack).toHaveBeenCalledWith("search_query", expect.objectContaining({
        query: "café",
        results_count: 5,
      }));
    });

    it("categoryChange tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.categoryChange("Todos", "Bebidas");
      
      expect(vercelTrack).toHaveBeenCalledWith("category_change", expect.objectContaining({
        from_category: "Todos",
        to_category: "Bebidas",
      }));
    });

    it("pdfExport tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.pdfExport(25, 3);
      
      expect(vercelTrack).toHaveBeenCalledWith("pdf_export", expect.objectContaining({
        products_count: 25,
        categories_count: 3,
      }));
    });

    it("productCreate tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.productCreate("new-1", "New Product", "Bebidas");
      
      expect(vercelTrack).toHaveBeenCalledWith("product_create", expect.objectContaining({
        product_id: "new-1",
        product_name: "New Product",
        category: "Bebidas",
      }));
    });

    it("productUpdate tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.productUpdate("prod-1", "Updated Product", "Snacks");
      
      expect(vercelTrack).toHaveBeenCalledWith("product_update", expect.objectContaining({
        product_id: "prod-1",
        product_name: "Updated Product",
        category: "Snacks",
      }));
    });

    it("productDelete tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.productDelete("prod-1", "Deleted Product", "Bebidas");
      
      expect(vercelTrack).toHaveBeenCalledWith("product_delete", expect.objectContaining({
        product_id: "prod-1",
        product_name: "Deleted Product",
        category: "Bebidas",
      }));
    });

    it("importProducts tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.importProducts(1024000, "products.xlsx", 50, 2);
      
      expect(vercelTrack).toHaveBeenCalledWith("import_products", expect.objectContaining({
        file_size: 1024000,
        file_name: "products.xlsx",
        imported_count: 50,
        errors_count: 2,
      }));
    });

    it("commandPaletteOpen tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.commandPaletteOpen();
      
      expect(vercelTrack).toHaveBeenCalledWith("command_palette_open", expect.objectContaining({
        timestamp: expect.any(String),
        page: expect.any(String),
      }));
    });

    it("commandPaletteExecute tracks correct event", async () => {
      const { track: vercelTrack } = await import("@vercel/analytics/react");
      
      analytics.commandPaletteExecute("nav-products", "Productos", "Navegación");
      
      expect(vercelTrack).toHaveBeenCalledWith("command_palette_execute", expect.objectContaining({
        command_id: "nav-products",
        command_label: "Productos",
        command_section: "Navegación",
      }));
    });
  });
});