# 📋 Auditoría Promarket — Checklist Accionable

> Fuente: auditoría frontend/seguridad/SEO/pulido — 2026-10-29
> Responsable: AI Agent (auto-ejecutable)
> Progreso: 0/38 tareas

---

## 🔴 P0 — Críticos (hacer esta semana)

- [x] **S-01** Rate limit en `/api/auth/*` y `/api/admin/products/import`
  - `middleware.ts` (in-memory) — **DONE 2026-10-29**
  - Test: 10 requests seguidos → 429

- [ ] **S-02** CSP headers en `next.config.ts`
  - `script-src 'self' 'unsafe-inline' https://vercel.live`
  - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
  - Test: `curl -I` → `Content-Security-Policy` presente

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
- [ ] **ST-04** Service Worker (Workbox) para offline-first catálogo + cache imágenes
- [ ] **ST-05** Tests: Vitest (unit) + Playwright (e2e: login, CRUD, import Excel)
- [ ] **ST-06** Storybook para design system (Button, Card, Badge, Dialog, Toast)
- [ ] **ST-07** Bundle analysis: `@next/bundle-analyzer` → tree-shake lucide-react, date-fns

- [x] **F-02** Revisar `@import "shadcn/tailwind.css"` (vendor local) — **DONE 2026-10-29** (shadcn package installed, import works)
- [ ] **F-03** `Hero.tsx` usar `.clip-scalloped` class (ver QW-01) — **DONE 2026-10-29**
- [ ] **F-04** `isLoading` real en `Catalog.tsx` (ver QW-02)
- [x] **F-05** `SearchInput.tsx` `debounceMs` tipado como prop — **YA IMPLEMENTADO** (line 11)
- [ ] **F-06** `AdminProductsPage` cleanup `useEffect` (AbortController) — **DONE 2026-10-29**
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

- [ ] **P-01** Micro-interacciones: `framer-motion` en tabs admin, drawer móvil, toast enter/exit
- [ ] **P-02** Dark mode toggle (persistir en localStorage + cookie)
- [ ] **P-03** Command palette (⌘K) en admin para navegar rápido
- [ ] **P-04** Export catálogo a PDF (hoja de pedido) desde `/admin/products`
- [ ] **P-05** Analytics eventos: `product_view`, `whatsapp_click`, `filter_use`, `search_query`
- [ ] **P-06** A11y audit automatizado: `axe-core` en CI + `eslint-plugin-jsx-a11y`

---

## ✅ Hechos (registro)

- [x] 2026-10-29: Contenedor `.wrap` max-w-7xl + centrado
- [x] 2026-10-29: Colores `bg-ink`, `text-lime`, etc. mapeados en `@theme`
- [x] 2026-10-29: Hero floating box ancho corregido (220→260px)
- [x] 2026-10-29: HowItWorks gap/alineación + colores contraste AA
- [x] 2026-10-29: `radius-nested` utilities + shimmer skeleton
- [x] 2026-10-29: `--step-head` clamp corregido
- [x] 2026-10-29: Button `light` hover contraste AA
- [x] 2026-10-29: `llms.txt` + Organization JSON-LD + `/api/llms-full.txt` para AI/agent crawling