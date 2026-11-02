import { test, expect } from "@playwright/test";

test.describe("Catalog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalogo");
  });

  test("loads catalog page with title", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Catálogo Mayorista");
  });

  test("displays products", async ({ page }) => {
    await expect(page.locator('[role="list"]')).toBeVisible();
    // At least one product card should be visible
    await expect(page.locator('[role="listitem"]').first()).toBeVisible();
  });

  test("filters by category", async ({ page }) => {
    // Click on a category button (skip "Todos" which is first)
    const categoryButton = page.locator('[role="group"] button').nth(1); // Second button = first category
    await categoryButton.click();
    
    // Should show filtered results
    await expect(page.locator("text=Mostrando")).toBeVisible();
  });

  test("search functionality works", async ({ page }) => {
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill("test");
    
    // Wait for debounce and filter
    await page.waitForTimeout(500);
    
    // Should show filtered results message
    await expect(page.locator("text=Mostrando")).toBeVisible();
  });

  test("clear filters button works", async ({ page }) => {
    // Apply a filter first
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill("test");
    await page.waitForTimeout(500);
    
    // Click clear filters
    const clearButton = page.locator("button:has-text('Limpiar filtros')");
    await clearButton.click();
    
    // Search should be cleared
    await expect(searchInput).toHaveValue("");
  });
});

test.describe("Admin Products Page", () => {
  test("requires authentication", async ({ page }) => {
    await page.goto("/admin/products");
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe("Home Page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });
});