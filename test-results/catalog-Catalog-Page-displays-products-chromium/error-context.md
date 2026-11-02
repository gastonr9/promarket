# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: catalog.spec.ts >> Catalog Page >> displays products
- Location: test\e2e\catalog.spec.ts:12:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="list"]')
Expected: visible
Error: strict mode violation: locator('[role="list"]') resolved to 2 elements:
    1) <div role="list" aria-label="Productos del catálogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">…</div> aka getByRole('list', { name: 'Productos del catálogo' })
    2) <div role="list" aria-label="Productos del catálogo" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">…</div> aka getByLabel('Productos del catálogo').nth(1)

Call log:
  - Expect "toBeVisible" locator('[role="list"]') with timeout 5000ms
  - waiting for locator('[role="list"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - navigation "Navegación" [ref=e4]:
        - list [ref=e5]:
          - listitem [ref=e6]:
            - link "Inicio" [ref=e7] [cursor=pointer]:
              - /url: /
          - listitem [ref=e8]:
            - generic [ref=e11]: Catálogo Mayorista
      - main [ref=e12]:
        - region [ref=e13]:
          - generic [ref=e14]:
            - generic [ref=e15]:
              - generic [ref=e16]:
                - heading "Catálogo Mayorista" [level=2] [ref=e17]
                - paragraph [ref=e18]: Explorá nuestro surtido y consultá precios por WhatsApp
              - generic [ref=e19]:
                - group "Filtrar productos por categoría" [ref=e20]:
                  - button "Todos" [pressed] [ref=e21]
                  - button "Todos" [ref=e22]
                  - button "Bebidas" [ref=e23]
                  - button "Snacks" [ref=e24]
                  - button "Golosinas" [ref=e25]
                  - button "Higiene" [ref=e26]
                  - button "Almacén" [ref=e27]
                - searchbox "Buscar en el catálogo" [ref=e32]
            - list "Productos del catálogo" [ref=e33]:
              - listitem [ref=e34]:
                - link [ref=e35] [cursor=pointer]:
                  - /url: /catalogo/gaseosa-cola
                  - article [ref=e36]:
                    - generic [ref=e37]:
                      - generic [ref=e39]: 🥤
                      - generic [ref=e40]: Bebidas
                    - generic [ref=e41]:
                      - generic [ref=e42]:
                        - generic [ref=e43]:
                          - paragraph [ref=e44]: Marca a definir
                          - generic [ref=e45]: "REF: GASEOS"
                        - heading "Gaseosa cola" [level=3] [ref=e46]
                        - paragraph [ref=e49]: Botella · 2,25 L
                      - generic [ref=e50]:
                        - generic [ref=e51]:
                          - generic [ref=e52]: Precio Lista
                          - generic [ref=e53]: Consultar
                        - generic [ref=e54]: Ver más
              - listitem [ref=e55]:
                - link [ref=e56] [cursor=pointer]:
                  - /url: /catalogo/papas-clasicas
                  - article [ref=e57]:
                    - generic [ref=e58]:
                      - generic [ref=e60]: 🍿
                      - generic [ref=e61]: Clásico
                    - generic [ref=e62]:
                      - generic [ref=e63]:
                        - generic [ref=e64]:
                          - paragraph [ref=e65]: Marca a definir
                          - generic [ref=e66]: "REF: PAPAS-"
                        - heading "Papas clásicas" [level=3] [ref=e67]
                        - paragraph [ref=e70]: Paquete · 100 g
                      - generic [ref=e71]:
                        - generic [ref=e72]:
                          - generic [ref=e73]: Precio Lista
                          - generic [ref=e74]: Consultar
                        - generic [ref=e75]: Ver más
              - listitem [ref=e76]:
                - link [ref=e77] [cursor=pointer]:
                  - /url: /catalogo/alfajor-triple
                  - article [ref=e78]:
                    - generic [ref=e79]:
                      - generic [ref=e81]: 📦
                      - generic [ref=e82]: Golosinas
                    - generic [ref=e83]:
                      - generic [ref=e84]:
                        - generic [ref=e85]:
                          - paragraph [ref=e86]: Marca a definir
                          - generic [ref=e87]: "REF: ALFAJO"
                        - heading "Alfajor triple" [level=3] [ref=e88]
                        - paragraph [ref=e91]: Unidad · consultar caja
                      - generic [ref=e92]:
                        - generic [ref=e93]:
                          - generic [ref=e94]: Precio Lista
                          - generic [ref=e95]: Consultar
                        - generic [ref=e96]: Ver más
              - listitem [ref=e97]:
                - link [ref=e98] [cursor=pointer]:
                  - /url: /catalogo/pasta-dental
                  - article [ref=e99]:
                    - generic [ref=e100]:
                      - generic [ref=e102]: 📦
                      - generic [ref=e103]: Higiene
                    - generic [ref=e104]:
                      - generic [ref=e105]:
                        - generic [ref=e106]:
                          - paragraph [ref=e107]: Marca a definir
                          - generic [ref=e108]: "REF: PASTA-"
                        - heading "Pasta dental" [level=3] [ref=e109]
                        - paragraph [ref=e112]: Tubo · 90 g
                      - generic [ref=e113]:
                        - generic [ref=e114]:
                          - generic [ref=e115]: Precio Lista
                          - generic [ref=e116]: Consultar
                        - generic [ref=e117]: Ver más
              - listitem [ref=e118]:
                - link [ref=e119] [cursor=pointer]:
                  - /url: /catalogo/caramelos-surtidos
                  - article [ref=e120]:
                    - generic [ref=e121]:
                      - generic [ref=e123]: 📦
                      - generic [ref=e124]: Golosinas
                    - generic [ref=e125]:
                      - generic [ref=e126]:
                        - generic [ref=e127]:
                          - paragraph [ref=e128]: Marca a definir
                          - generic [ref=e129]: "REF: CARAME"
                        - heading "Caramelos surtidos" [level=3] [ref=e130]
                        - paragraph [ref=e133]: Bolsa · consultar peso
                      - generic [ref=e134]:
                        - generic [ref=e135]:
                          - generic [ref=e136]: Precio Lista
                          - generic [ref=e137]: Consultar
                        - generic [ref=e138]: Ver más
              - listitem [ref=e139]:
                - link [ref=e140] [cursor=pointer]:
                  - /url: /catalogo/chocolate-tableta
                  - article [ref=e141]:
                    - generic [ref=e142]:
                      - generic [ref=e144]: 📦
                      - generic [ref=e145]: Dulces
                    - generic [ref=e146]:
                      - generic [ref=e147]:
                        - generic [ref=e148]:
                          - paragraph [ref=e149]: Marca a definir
                          - generic [ref=e150]: "REF: CHOCOL"
                        - heading "Chocolate en tableta" [level=3] [ref=e151]
                        - paragraph [ref=e154]: Tableta · consultar gramos
                      - generic [ref=e155]:
                        - generic [ref=e156]:
                          - generic [ref=e157]: Precio Lista
                          - generic [ref=e158]: Consultar
                        - generic [ref=e159]: Ver más
              - listitem [ref=e160]:
                - link [ref=e161] [cursor=pointer]:
                  - /url: /catalogo/galletitas-dulces
                  - article [ref=e162]:
                    - generic [ref=e163]:
                      - generic [ref=e165]: 📦
                      - generic [ref=e166]: Merienda
                    - generic [ref=e167]:
                      - generic [ref=e168]:
                        - generic [ref=e169]:
                          - paragraph [ref=e170]: Marca a definir
                          - generic [ref=e171]: "REF: GALLET"
                        - heading "Galletitas dulces" [level=3] [ref=e172]
                        - paragraph [ref=e175]: Paquete · consultar presentación
                      - generic [ref=e176]:
                        - generic [ref=e177]:
                          - generic [ref=e178]: Precio Lista
                          - generic [ref=e179]: Consultar
                        - generic [ref=e180]: Ver más
              - listitem [ref=e181]:
                - link [ref=e182] [cursor=pointer]:
                  - /url: /catalogo/yerba-mate
                  - article [ref=e183]:
                    - generic [ref=e184]:
                      - generic [ref=e186]: 📦
                      - generic [ref=e187]: Almacén
                    - generic [ref=e188]:
                      - generic [ref=e189]:
                        - generic [ref=e190]:
                          - paragraph [ref=e191]: Marca a definir
                          - generic [ref=e192]: "REF: YERBA-"
                        - heading "Yerba mate" [level=3] [ref=e193]
                        - paragraph [ref=e196]: Paquete · 1 kg
                      - generic [ref=e197]:
                        - generic [ref=e198]:
                          - generic [ref=e199]: Precio Lista
                          - generic [ref=e200]: Consultar
                        - generic [ref=e201]: Ver más
              - listitem [ref=e202]:
                - link [ref=e203] [cursor=pointer]:
                  - /url: /catalogo/agua-mineral
                  - article [ref=e204]:
                    - generic [ref=e205]:
                      - generic [ref=e207]: 🥤
                      - generic [ref=e208]: Bebidas
                    - generic [ref=e209]:
                      - generic [ref=e210]:
                        - generic [ref=e211]:
                          - paragraph [ref=e212]: Marca a definir
                          - generic [ref=e213]: "REF: AGUA-M"
                        - heading "Agua mineral" [level=3] [ref=e214]
                        - paragraph [ref=e217]: Botella · 2 L
                      - generic [ref=e218]:
                        - generic [ref=e219]:
                          - generic [ref=e220]: Precio Lista
                          - generic [ref=e221]: Consultar
                        - generic [ref=e222]: Ver más
              - listitem [ref=e223]:
                - link [ref=e224] [cursor=pointer]:
                  - /url: /catalogo/mani-salado
                  - article [ref=e225]:
                    - generic [ref=e226]:
                      - generic [ref=e228]: 🍿
                      - generic [ref=e229]: Snacks
                    - generic [ref=e230]:
                      - generic [ref=e231]:
                        - generic [ref=e232]:
                          - paragraph [ref=e233]: Marca a definir
                          - generic [ref=e234]: "REF: MANI-S"
                        - heading "Maní salado" [level=3] [ref=e235]
                        - paragraph [ref=e238]: Paquete · consultar presentación
                      - generic [ref=e239]:
                        - generic [ref=e240]:
                          - generic [ref=e241]: Precio Lista
                          - generic [ref=e242]: Consultar
                        - generic [ref=e243]: Ver más
              - listitem [ref=e244]:
                - link [ref=e245] [cursor=pointer]:
                  - /url: /catalogo/arroz-largo-fino
                  - article [ref=e246]:
                    - generic [ref=e247]:
                      - generic [ref=e249]: 📦
                      - generic [ref=e250]: Almacén
                    - generic [ref=e251]:
                      - generic [ref=e252]:
                        - generic [ref=e253]:
                          - paragraph [ref=e254]: Marca a definir
                          - generic [ref=e255]: "REF: ARROZ-"
                        - heading "Arroz largo fino" [level=3] [ref=e256]
                        - paragraph [ref=e259]: Paquete · 1 kg
                      - generic [ref=e260]:
                        - generic [ref=e261]:
                          - generic [ref=e262]: Precio Lista
                          - generic [ref=e263]: Consultar
                        - generic [ref=e264]: Ver más
              - listitem [ref=e265]:
                - link [ref=e266] [cursor=pointer]:
                  - /url: /catalogo/chicles
                  - article [ref=e267]:
                    - generic [ref=e268]:
                      - generic [ref=e270]: 📦
                      - generic [ref=e271]: Mostrador
                    - generic [ref=e272]:
                      - generic [ref=e273]:
                        - generic [ref=e274]:
                          - paragraph [ref=e275]: Marca a definir
                          - generic [ref=e276]: "REF: CHICLE"
                        - heading "Chicles" [level=3] [ref=e277]
                        - paragraph [ref=e280]: Blíster · consultar unidades
                      - generic [ref=e281]:
                        - generic [ref=e282]:
                          - generic [ref=e283]: Precio Lista
                          - generic [ref=e284]: Consultar
                        - generic [ref=e285]: Ver más
              - listitem [ref=e286]:
                - link [ref=e287] [cursor=pointer]:
                  - /url: /catalogo/test-product
                  - article [ref=e288]:
                    - generic [ref=e289]:
                      - generic [ref=e291]: 🥤
                      - generic [ref=e292]: Test
                    - generic [ref=e293]:
                      - generic [ref=e294]:
                        - generic [ref=e295]:
                          - paragraph [ref=e296]: Marca a definir
                          - generic [ref=e297]: "REF: 903768"
                        - heading "Test Product" [level=3] [ref=e298]
                        - paragraph [ref=e301]: Unidad · 1 L
                      - generic [ref=e302]:
                        - generic [ref=e303]:
                          - generic [ref=e304]: Precio Lista
                          - generic [ref=e305]: Consultar
                        - generic [ref=e306]: Ver más
  - alert [ref=e307]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Catalog Page", () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto("/catalogo");
  6  |   });
  7  | 
  8  |   test("loads catalog page with title", async ({ page }) => {
  9  |     await expect(page.locator("h2")).toContainText("Catálogo Mayorista");
  10 |   });
  11 | 
  12 |   test("displays products", async ({ page }) => {
> 13 |     await expect(page.locator('[role="list"]')).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  14 |     // At least one product card should be visible
  15 |     await expect(page.locator('[role="listitem"]').first()).toBeVisible();
  16 |   });
  17 | 
  18 |   test("filters by category", async ({ page }) => {
  19 |     // Click on a category button (skip "Todos" which is first)
  20 |     const categoryButton = page.locator('[role="group"] button').nth(1); // Second button = first category
  21 |     await categoryButton.click();
  22 |     
  23 |     // Should show filtered results
  24 |     await expect(page.locator("text=Mostrando")).toBeVisible();
  25 |   });
  26 | 
  27 |   test("search functionality works", async ({ page }) => {
  28 |     const searchInput = page.locator('input[type="search"]');
  29 |     await searchInput.fill("test");
  30 |     
  31 |     // Wait for debounce and filter
  32 |     await page.waitForTimeout(500);
  33 |     
  34 |     // Should show filtered results message
  35 |     await expect(page.locator("text=Mostrando")).toBeVisible();
  36 |   });
  37 | 
  38 |   test("clear filters button works", async ({ page }) => {
  39 |     // Apply a filter first
  40 |     const searchInput = page.locator('input[type="search"]');
  41 |     await searchInput.fill("test");
  42 |     await page.waitForTimeout(500);
  43 |     
  44 |     // Click clear filters
  45 |     const clearButton = page.locator("button:has-text('Limpiar filtros')");
  46 |     await clearButton.click();
  47 |     
  48 |     // Search should be cleared
  49 |     await expect(searchInput).toHaveValue("");
  50 |   });
  51 | });
  52 | 
  53 | test.describe("Admin Products Page", () => {
  54 |   test("requires authentication", async ({ page }) => {
  55 |     await page.goto("/admin/products");
  56 |     
  57 |     // Should redirect to login
  58 |     await expect(page).toHaveURL(/\/admin\/login/);
  59 |   });
  60 | });
  61 | 
  62 | test.describe("Home Page", () => {
  63 |   test("loads successfully", async ({ page }) => {
  64 |     await page.goto("/");
  65 |     await expect(page.locator("h1")).toBeVisible();
  66 |   });
  67 | });
```