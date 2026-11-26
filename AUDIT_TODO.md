# 📋 Auditoría Promarket — Checklist Accionable

> Fuente: auditoría frontend/seguridad/SEO/pulido — 2026-10-29
> Responsable: AI Agent (auto-ejecutable)
> Progreso: 37/38 tareas (1 bloqueado: S-06 requiere NextAuth v5)

---

## 🔴 P0 — Críticos (hacer esta semana)

- [x] **S-01** Rate limit en `/api/auth/*` y `/api/admin/products/import`
  - `middleware.ts` (in-memory) — **DONE 2026-10-29**
  - Test: 10 requests seguidos → 429

- [x] **S-02** CSP headers en `next.config.ts`
  - `script-src 'self' 'unsafe-eval' 'unsafe-inline'` + `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
  - `frame-src https://wa.me` + `connect-src` para Sanity/WA
  - `next.config.ts` lines 56-74 — **DONE 2026-10-29**

- [x] **F-01** Blur placeholder en `ProductCard` + `ProductDetail`
  - `placeholder="blur"` + `blurDataURL` (base64 10px) — **DONE 2026-10-29**

- [x] **SEO-02** `generateStaticParams` real en `/catalogo/[slug]`
  - Retornar slugs de productos activos
  - `revalidate: 3600` (ISR) — **DONE 2026-10-29**

---

## 🟠 P1 — Quick Wins (1-2h c/u) — **SPRINT ACTUAL**

- [x] **QW-01** Migrar `clipPath` inline → `.clip-scalloped` utility
  - Archivos: `Hero.tsx`, `globals.css` — **DONE 2026-10-29**

- [x] **QW-02** `isLoading` real en `Catalog.tsx` (skeleton min 300ms)
  - Archivo: `Catalog.tsx` — **DONE 2026-10-29**

- [x] **QW-03** `useEffect` cleanup en `AdminCategories` (clear timeouts)
  - Archivo: `AdminCategories.tsx` — **DONE 2026-10-29**

- [x] **QW-04** `ToastProvider` → `role="status" aria-live="polite"`
  - Archivo: `toast.tsx` — **YA IMPLEMENTADO** (lines 58-59, 105)

- [x] **QW-05** CSP headers en `next.config.ts` (ver S-02) — **YA IMPLEMENTADO** (lines 56-74)
- [x] **S-02** CSP headers — **DONE 2026-10-29**

- [x] **QW-06** Rate limit `/api/admin/products/import` (5 req/min/IP)
  - Archivo: `middleware.ts` (in-memory) — **DONE 2026-10-29**

- [x] **QW-07** Validar MIME + tamaño en Excel import (2MB, solo .xlsx)
  - Archivo: `import/route.ts` — **DONE 2026-10-29**

- [x] **QW-08** `Footer` año sin `useEffect`
  - Archivo: `Footer.tsx` — **DONE 2026-10-29**

---

## 🟡 P2 — Mejoras Estructurales (medio plazo)

- [x] **ST-01** ISR/SSG real en `/catalogo/[slug]` con `generateStaticParams` + `revalidate: 3600` — **DONE 2026-10-29**
- [x] **ST-02** Image Optimization: `placeholder="blur"`, `blurDataURL`, `sizes` correctos — **DONE 2026-10-29**
- [x] **ST-03** Paginación server-side en catálogo + URL shareable (`?category=bebidas&q=cola`) — **DONE 2026-10-29**
- [x] **ST-04** Service Worker (Workbox) para offline-first catálogo + cache imágenes
  - `scripts/generate-sw.mjs` — Generador de SW con workbox-build, estrategias: StaleWhileRevalidate (páginas catálogo, recursos estáticos), NetworkFirst (API), CacheFirst (imágenes)
  - `public/sw.js` — SW generado en build (1831 bytes)
  - `src/components/providers/SWRegistration.tsx` — Registro condicional en producción, check de updates por ruta y hora
  - `package.json` — Script `build` ejecuta `node scripts/generate-sw.mjs` post-build
  - Estrategias de cache: catálogo 24h, API 5min, imágenes 30 días, estáticos 7 días
  - **DONE 2026-10-31**
- [x] **ST-05** Tests: Vitest (unit) + Playwright (e2e: login, CRUD, import Excel)
  - `vitest.config.ts` — Vitest config with React, jsdom, coverage (v8)
  - `test/setup.tsx` — Test setup with mocks (next/navigation, next-auth, next/image, framer-motion, lucide-react, vercel/analytics)
  - `test/utils/helpers.test.ts` — Unit tests for cn, generateSlug, formatPrice
  - `test/components/ProductCard.test.tsx` — 8 unit tests for ProductCard component
  - `test/components/Catalog.test.tsx` — 5 unit tests for Catalog component (filtering, search, empty state)
  - `test/lib/analytics.test.ts` — 13 unit tests for all analytics helpers (productView, whatsappClick, filterUse, searchQuery, categoryChange, pdfExport, CRUD, import, commandPalette)
  - `playwright.config.ts` — Playwright config with webServer, chromium project, trace on retry
  - `test/e2e/catalog.spec.ts` — 7 E2E tests (catalog page, filtering, search, clear filters, admin auth, home page)
  - `package.json` — Scripts: `test`, `test:watch`, `test:coverage`, `test:e2e`, `test:e2e:ui`
  - **DONE 2026-10-31** (31 unit tests + 7 E2E tests passing)
- [x] **ST-06** Storybook para design system (Button, Card, Badge, Dialog, Toast)
  - `.storybook/main.ts` — Configuración Storybook con addons (a11y, vitest, docs, mcp, chromatic)
  - `.storybook/preview.tsx` — Preview global con ThemeProvider, ToastProvider, globals.css, temas light/dark
  - `src/stories/Button.stories.tsx` — 12 historias (variants, sizes, disabled, loading, fullWidth)
  - `src/stories/Badge.stories.tsx` — 10 historias (variants, sizes, product tags, status)
  - `src/stories/Card.stories.tsx` — 8 historias (basic, product, image, interactive, grid)
  - `src/stories/Dialog.stories.tsx` — 7 historias (default, confirmation, form, large, alert)
  - `src/stories/Toast.stories.tsx` — 8 historias (all types, multiple, duration, real-world)
  - `src/stories/DesignSystem.stories.tsx` — Página principal de documentación
  - **DONE 2026-10-31** (45 stories, 74 tests passing via @storybook/addon-vitest)
- [x] **ST-07** Bundle analysis: `@next/bundle-analyzer` → tree-shake lucide-react
  - `package.json` — `@next/bundle-analyzer` devDependency, `analyze` script (`ANALYZE=true next build`)
  - `next.config.ts` — Bundle analyzer wrapper with `enabled: process.env.ANALYZE === "true"`
  - `.next/analyze/client.html` — Client bundle report (1023KB stat, 242KB parsed, 67KB gzipped)
  - Tree-shaking: Next.js `optimizePackageImports: ["lucide-react", "framer-motion"]` already configured (line 87), 30+ specific icons imported selectively across 18 components
  - **DONE 2026-10-31**

- [x] **F-02** Revisar `@import "shadcn/tailwind.css"` (vendor local) — **DONE 2026-10-29** (shadcn package installed, import works)
- [x] **F-03** `Hero.tsx` usar `.clip-scalloped` class (ver QW-01) — **DONE 2026-10-29**
- [x] **F-04** `isLoading` real en `Catalog.tsx` (ver QW-02)
  - `Catalog.tsx` — `triggerLoading()` con `minLoadingTimeoutRef` (300ms mínimo) + `loadingTimeoutRef` (2s máximo)
  - Skeleton mostrado durante transiciones de filtro/búsqueda para perceived performance
  - **DONE 2026-10-29**
- [x] **F-05** `SearchInput.tsx` `debounceMs` tipado como prop — **YA IMPLEMENTADO** (line 11)
- [x] **F-06** `AdminProductsPage` cleanup `useEffect` (AbortController) — **DONE 2026-10-29**
- [x] **F-07** `ProductCard` `will-change: transform` en hover
  - Archivos: `ProductCard.tsx`, `globals.css` — **DONE 2026-10-29**
- [x] **F-08** `Footer` año sin `useEffect` (ver QW-08) — **DONE 2026-10-29**
- [x] **F-09** `AdminCategories` cleanup `debounceRefs` Map (ver QW-03) — **DONE 2026-10-29**
- [x] **F-10** `Button` variante `link` gap heredado → fix — **DONE 2026-10-29** (`gap-0` added)
- [x] **F-11** `ToastProvider` `role="status" aria-live="polite"` (ver QW-04) — **DONE 2026-10-29** (ToastContainer: aria-live="polite", ToastItem: role="alert")
- [x] **F-12** `.radius-nested*` clamp min 2px
  - Archivo: `globals.css` — **DONE 2026-10-29** (`max(2px, calc(...))`)

- [x] **S-03** Credenciales admin → `.env` (no JSON) — **DONE 2026-10-29**
- [x] **S-04** Excel import validación MIME + tamaño (ver QW-07) — **DONE 2026-10-29**
- [x] **S-05** NextAuth secret rotación documentada (90 días) — **DONE 2026-10-29** (README.md)
- [ ] **S-06** Middleware migrar a `proxy` convention — **PENDING**: NextAuth v5 required for full proxy support

- [x] **SEO-01** JSON-LD `Product` schema en `ProductDetail`
  - Archivo: `ProductDetail.tsx` — **DONE 2026-10-29**
- [x] **SEO-03** `alt` descriptivo + `width`/`height` en `Image`
  - `ProductCard`, `ProductDetail`, `Hero` con descripciones robustas y dimensiones explícitas — **DONE 2026-10-29**
- [x] **SEO-04** `preload` hero image + `fetchPriority="high"` — **DONE 2026-10-29**
- [x] **SEO-05** Paginación server-side + URL shareable (ver ST-03)
- [x] **SEO-06** `/catalogo` metadata propia y página dedicada
  - Creado `/catalogo/page.tsx` con metadatos específicos y soporte SSR/Suspense — **DONE 2026-10-29**
- [x] **SEO-07** `robots.ts` bloquear `/admin*`, `/api*`, `/_next*` — **DONE 2026-10-29** (lines 10)

---

## 🟢 P3 — Polish "Premium" (nice-to-have)

- [x] **P-01** Micro-interacciones: `framer-motion` en tabs admin, drawer móvil, toast enter/exit
  - `Catalog.tsx` — `LayoutGroup` + `AnimatePresence` para transiciones de filtrado con `popLayout`
  - `ProductCard.tsx` — Animaciones de entrada/salida con `motion.div` wrapper (opacity, y, scale)
  - `toast.tsx` — `AnimatePresence` + `motion.div` para enter/exit suave (slide + scale + fade)
  - `FilterButtons.tsx` — `motion.button` con `whileHover`/`whileTap` feedback táctil
  - `SearchInput.tsx` — `motion.div` wrapper con animación de focus (scale 1.01)
  - **DONE 2026-10-31**
- [x] **P-02** Dark mode toggle (persistir en localStorage + cookie)
  - `ThemeProvider.tsx` — lazy init from localStorage, system media query listener
  - `ThemeToggle.tsx` — 3-state toggle (light/dark/system) in Footer
  - `globals.css` — enhanced dark palette with WCAG AA contrast
  - `layout.tsx` — `ThemeProvider` wrapper with `suppressHydrationWarning`
  - **DONE 2026-10-30**
- [x] **P-03** Command palette (⌘K) en admin para navegar rápido
  - `CommandPalette.tsx` — Modal flotante interactivo con filtros, categorización por secciones y atajos (⌘1, ⌘2, ⌘3, ⌘4, ⌘⇧V)
  - `AdminLayout.tsx` — Integración global del componente en la plantilla de administración
  - Interacciones — `framer-motion` para animación modal y navegación completa con teclado
  - **DONE 2026-10-31**
- [x] **P-04** Export catálogo a PDF (hoja de pedido) desde `/admin/products`
  - `exportPdf.ts` — Generador dinámico de documento imprimible (A4, estilos de marca ProMarket, agrupación por categoría, campo para pedido de cliente)
  - `/admin/products/page.tsx` — Botón "Exportar PDF" en el header de productos con activación nativa de `window.print()`
  - **DONE 2026-10-31**
- [x] **P-05** Analytics eventos: `product_view`, `whatsapp_click`, `filter_use`, `search_query`
  - `analytics.ts` — Módulo centralizado con tipado estricto para Vercel Analytics, helpers tipados por evento
  - `ProductCard.tsx` — `product_view` al click en tarjeta de producto
  - `Catalog.tsx` — `filter_use` (categoría/búsqueda), `search_query`, `category_change`
  - `/admin/products/page.tsx` — `product_create`, `product_update`, `product_delete`, `import_products`, `pdf_export`
  - `CommandPalette.tsx` — `command_palette_open`, `command_palette_execute`
  - **DONE 2026-10-31**
- [x] **P-06** A11y audit automatizado: Storybook addon-a11y + `eslint-plugin-jsx-a11y`
  - `eslint.config.mjs` — `eslint-plugin-jsx-a11y` reglas estrictas (error level): anchor-is-valid, click-events-have-key-events, no-noninteractive-element-interactions, role-has-required-aria-props, aria-props, alt-text, heading-has-content, label-has-associated-control, no-redundant-roles, tabindex-no-positive, iframe-has-title, mouse-events-have-key-events, no-static-element-interactions
  - `package.json` — `@storybook/addon-a11y` y `eslint-plugin-jsx-a11y` como devDependencies
  - Fixes aplicados: drag-drop zone → button, CommandPalette options → buttons, Dialog backdrop → button, Label component eslint-disable, effects setState deferred
  - **DONE 2026-10-31**

---

## ✅ Hechos (registro)

- [x] 2026-10-31: Bundle Analysis (ST-07) — @next/bundle-analyzer integrated, tree-shaking verified for lucide-react (30+ icons imported across 18 components), optimizePackageImports already configured
- [x] 2026-10-31: Storybook (ST-06) — Design system documentation for Button, Card, Badge, Dialog, Toast (45 stories, 74 automated tests)
- [x] 2026-10-31: Tests (ST-05) — Vitest (31 unit tests) + Playwright (7 E2E tests) all passing
- [x] 2026-10-31: Service Worker (ST-04) — Workbox offline-first SW with StaleWhileRevalidate/NetworkFirst/CacheFirst strategies, auto-update checks, production-only registration
- [x] 2026-10-31: A11y Audit (P-06) — ESLint jsx-a11y strict rules + Storybook addon-a11y, all accessibility errors resolved (interactive elements, keyboard support, labels, roles)
- [x] 2026-10-31: Analytics Events (P-05) — Vercel Analytics integration with typed events: product_view, whatsapp_click, filter_use, search_query, category_change, pdf_export, product_create/update/delete, import_products, command_palette_open/execute
- [x] 2026-10-31: Export PDF (P-04) — Printable wholesale catalog order sheet export module with A4 layout and category grouping
- [x] 2026-10-31: Command Palette ⌘K (P-03) — Interactive modal floating command menu with navigation shortcuts, live filtering, and keyboard control
- [x] 2026-10-31: Micro-interacciones (P-01) — Catalog LayoutGroup+AnimatePresence, ProductCard motion, Toast AnimatePresence, FilterButtons motion.button, SearchInput motion.div focus
- [x] 2026-10-30: Dark mode toggle (P-02) — ThemeProvider, ThemeToggle, enhanced dark palette WCAG AA, localStorage persistence, system preference sync
- [x] 2026-10-31: Service Worker (ST-04) — Workbox offline-first SW with StaleWhileRevalidate/NetworkFirst/CacheFirst strategies, auto-update checks, production-only registration
- [x] 2026-10-31: A11y Audit (P-06) — ESLint jsx-a11y strict rules + Storybook addon-a11y, all accessibility errors resolved (interactive elements, keyboard support, labels, roles)
- [x] 2026-10-31: Analytics Events (P-05) — Vercel Analytics integration with typed events: product_view, whatsapp_click, filter_use, search_query, category_change, pdf_export, product_create/update/delete, import_products, command_palette_open/execute
- [x] 2026-10-31: Export PDF (P-04) — Printable wholesale catalog order sheet export module with A4 layout and category grouping
- [x] 2026-10-31: Command Palette ⌘K (P-03) — Interactive modal floating command menu with navigation shortcuts, live filtering, and keyboard control
- [x] 2026-10-31: Micro-interacciones (P-01) — Catalog LayoutGroup+AnimatePresence, ProductCard motion, Toast AnimatePresence, FilterButtons motion.button, SearchInput motion.div focus
- [x] 2026-10-30: Dark mode toggle (P-02) — ThemeProvider, ThemeToggle, enhanced dark palette WCAG AA, localStorage persistence, system preference sync
- [x] 2026-10-29: Contenedor `.wrap` max-w-7xl + centrado
- [x] 2026-10-29: Colores `bg-ink`, `text-lime`, etc. mapeados en `@theme`
- [x] 2026-10-29: Hero floating box ancho corregido (220→260px)
- [x] 2026-10-29: HowItWorks gap/alineación + colores contraste AA
- [x] 2026-10-29: `radius-nested` utilities + shimmer skeleton
- [x] 2026-10-29: `--step-head` clamp corregido
- [x] 2026-10-29: Button `light` hover contraste AA
- [x] 2026-10-29: `llms.txt` + Organization JSON-LD + `/api/llms-full.txt` para AI/agent crawling