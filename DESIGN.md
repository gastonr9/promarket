# ProMarket Design System

> Documentación del sistema de diseño para **ProMarket Logística** — E-commerce mayorista para kioscos, almacenes y comercios.

---

## 🎨 Tokens de Diseño

### Colores (CSS Custom Properties)

```css
:root {
  /* Neutros */
  --ink: #0f172a;           /* Texto principal (dark) */
  --paper: #f8fafc;         /* Fondo principal (light) */
  --muted: #f1f5f9;         /* Fondo secundario */
  --border: #e2e8f0;        /* Bordes */

  /* Marca */
  --coral: #f15b42;         /* Acción primaria */
  --coral-dark: #e04d35;    /* Hover primaria */
  --coral-light: #ffe8e3;   /* Background sutil */

  /* Acentos */
  --lime: #a3e635;          /* Tags, promociones, badges */
  --mint: #dcfce7;          /* Success, estados positivos */
  --blue: #3b82f6;          /* Info, links, focus */

  /* Semánticos */
  --success: #16a34a;
  --warning: #f59e0b;
  --destructive: #ef4444;
  --info: #3b82f6;

  /* Radio */
  --radius: 0.75rem;        /* 12px - Base */
  --radius-sm: 0.375rem;    /* 6px */
  --radius-lg: 1rem;        /* 16px */
  --radius-xl: 1.5rem;      /* 24px */
  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-brand: 0 8px 25px rgb(241 91 66 / 0.25);

  /* Transiciones */
  --transition-fast: 120ms ease;
  --transition-base: 180ms ease;
  --transition-slow: 280ms ease;
}
```

### Dark Mode

```css
.dark {
  --ink: #f8fafc;
  --paper: #0f172a;
  --muted: #1e293b;
  --border: #334155;
  --coral-light: #7a2e22;
  --mint: #14532d;
}
```

### Tipografía

| Uso | Clase | Tamaño | Peso |
|-----|-------|--------|------|
| Display | `.text-display` | clamp(2.5rem, 5vw, 4rem) | 800 |
| H1 | `.text-h1` | clamp(2rem, 4vw, 3rem) | 700 |
| H2 | `.text-h2` | clamp(1.5rem, 3vw, 2.25rem) | 700 |
| H3 | `.text-h3` | 1.25rem | 600 |
| Body | `.text-base` | 1rem | 400 |
| Small | `.text-sm` | 0.875rem | 400 |
| Caption | `.text-xs` | 0.75rem | 500 |

**Fuentes:**
- **Display/Heading**: `font-heading` → `var(--font-display)` (Plus Jakarta Sans)
- **Body/UI**: `font-sans` → `var(--font-sans)` (Inter)

### Espaciado (Tailwind scale)

Base: `4px` → `space-1 = 0.25rem`, `space-4 = 1rem`, `space-8 = 2rem`, etc.

---

## 🧩 Componentes

### Button (`src/components/ui/button.tsx`)

**Variantes:** `default` | `secondary` | `outline` | `ghost` | `destructive` | `light` | `link`

**Tamaños:** `xs` | `sm` | `default` | `lg` | `xl` | `icon`

```tsx
<Button variant="default" size="lg" fullWidth>
  Ver catálogo
  <ArrowRight className="h-5 w-5" />
</Button>
```

**Props clave:**
- `asChild` — Render como child (para `<Link>` / `<a>`)
- `fullWidth` — `w-full`
- `disabled` — `opacity-50 pointer-events-none`

---

### Badge (`src/components/ui/badge.tsx`)

**Variantes:** `default` | `secondary` | `outline` | `accent` | `tag`

**Tamaños:** `sm` | `default` | `lg`

```tsx
<Badge variant="tag" size="sm">Promo</Badge>
<Badge variant="accent">Pendiente</Badge>
<Badge variant="outline" className="border-2 border-[var(--coral)] text-[var(--coral)]">
  Personalizado
</Badge>
```

---

### Card (`src/components/ui/card.tsx`)

Compuesto por sub-componentes:

```tsx
<Card className="w-72 hover:shadow-brand transition-shadow">
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción opcional</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Acción</Button>
  </CardFooter>
</Card>
```

---

### Dialog (`src/components/ui/dialog.tsx`)

Modal accesible con portal, Escape para cerrar, focus trap.

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogHeader>
    <DialogTitle>Confirmar</DialogTitle>
    <DialogDescription>¿Eliminar este producto?</DialogDescription>
  </DialogHeader>
  <DialogContent>...</DialogContent>
  <DialogFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={() => setOpen(false)}>Eliminar</Button>
  </DialogFooter>
  <DialogClose />
</Dialog>
```

---

### Toast (`src/components/ui/toast.tsx`)

Sistema global via Context + `useToast()` hook.

```tsx
const { showToast, hideToast } = useToast();

showToast('Producto creado', 'success', 4000);
showToast('Error al guardar', 'error');
showToast('Info importante', 'info');
```

**Tipos:** `default` (dark) | `success` (mint) | `error` (coral) | `info` (blue)

---

## 🌓 Dark Mode

Implementado en `ThemeProvider` + `ThemeToggle`:

- **3 estados**: `light` | `dark` | `system`
- **Persistencia**: `localStorage['promarket-theme']`
- **Sync**: Media query `prefers-color-scheme`
- **SSR-safe**: `suppressHydrationWarning` en `<html>`

---

## ✨ Animaciones (Framer Motion)

### Presets reutilizables

```tsx
// Entrada suave
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
};

// Stagger para listas
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

// Hover/tap feedback
const tapScale = {
  whileTap: { scale: 0.97 },
  whileHover: { scale: 1.02 }
};
```

### Usos en la app

| Componente | Animación |
|------------|-----------|
| `Catalog.tsx` | `LayoutGroup` + `AnimatePresence` + `popLayout` para filtros |
| `ProductCard.tsx` | Entrada escalonada (opacity, y, scale) |
| `Toast` | Slide + scale + fade con `AnimatePresence` |
| `FilterButtons` | `motion.button` con `whileHover`/`whileTap` |
| `SearchInput` | Focus scale 1.01 |
| `CommandPalette` | Modal slide + fade |

---

## ♿ Accesibilidad

### Estándar: **WCAG 2.1 AA**

**Checklist cumplido:**
- ✅ Contraste mínimo 4.5:1 (texto), 3:1 (UI)
- ✅ Focus visible en todos los interactivos (`focus-visible:ring-3`)
- ✅ Navegación completa por teclado
- ✅ ARIA labels en iconos-only buttons
- ✅ `role="status" aria-live="polite"` en Toasts
- ✅ `role="dialog" aria-modal="true"` en Dialogs
- ✅ Heading hierarchy correcta (h1 → h2 → h3)
- ✅ Labels asociados a inputs (`htmlFor` / `id`)

**Lint:** `eslint-plugin-jsx-a11y` en modo **error** (14 reglas)

---

## 📱 Responsive Breakpoints

| Breakpoint | Clase | Ancho |
|------------|-------|-------|
| Mobile | (default) | < 640px |
| Tablet | `sm:` | 640px |
| Laptop | `md:` | 768px |
| Desktop | `lg:` | 1024px |
| Large | `xl:` | 1280px |
| 2XL | `2xl:` | 1536px |

**Container:** `.wrap` → `max-w-7xl mx-auto px-6 lg:px-8`

---

## 🛠 Utilidades CSS Personalizadas

```css
/* globals.css */

/* Scalloped clip-path para Hero */
.clip-scalloped {
  clip-path: polygon(
    0% 0%, 100% 0%, 100% 85%,
    98% 88%, 95% 92%, 90% 95%,
    85% 97%, 75% 98%, 60% 98%,
    40% 98%, 25% 97%, 15% 95%,
    10% 92%, 7% 88%, 5% 85%,
    0% 82%
  );
}

/* Radius anidado con clamp mínimo 2px */
.radius-nested-sm { border-radius: max(2px, calc(var(--radius) - 4px)); }
.radius-nested-md { border-radius: max(2px, calc(var(--radius) - 2px)); }
.radius-nested-lg { border-radius: max(2px, calc(var(--radius) + 2px)); }
.radius-nested-xl { border-radius: max(2px, calc(var(--radius) + 6px)); }

/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--muted) 25%, var(--border) 50%, var(--muted) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## 📦 Estructura de Archivos

```
src/
├── components/
│   ├── ui/                 # Design system components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── label.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts        # Barrel export
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   └── SWRegistration.tsx
│   ├── catalog/            # Catalog-specific components
│   │   ├── ProductCard.tsx
│   │   ├── FilterButtons.tsx
│   │   ├── SearchInput.tsx
│   │   └── ProductDialog.tsx
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Catalog.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── TrustStrip.tsx
│   │   └── ContactBand.tsx
│   └── admin/              # Admin components
│       ├── AdminLayout.tsx
│       └── CommandPalette.tsx
├── stories/                # Storybook stories
│   ├── Button.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Card.stories.tsx
│   ├── Dialog.stories.tsx
│   ├── Toast.stories.tsx
│   └── DesignSystem.stories.tsx
├── lib/
│   ├── analytics.ts        # Vercel Analytics helpers
│   ├── exportPdf.ts        # PDF generation
│   └── utils.ts            # cn(), formatPrice(), etc.
└── app/
    └── globals.css         # Tokens + utilities
```

---

## 🚀 Comandos de Desarrollo

```bash
# Storybook (documentación interactiva)
npm run storybook        # http://localhost:6006

# Tests
npm run test             # Vitest (unit)
npm run test:e2e         # Playwright (e2e)

# Bundle analysis
npm run analyze          # ANALYZE=true next build

# Build & Lint
npm run build            # Production build + SW generation
npm run lint             # ESLint (0 errors target)
```

---

## 📚 Referencias

- **Storybook**: `npm run storybook` → Component playground + Autodocs
- **Tokens**: `src/app/globals.css` → Single source of truth
- **Componentes**: `src/components/ui/*.tsx` → Implementación
- **A11y**: `eslint.config.mjs` → Reglas jsx-a11y configuradas
- **Animaciones**: `framer-motion` v14+ → API declarativa

---

*Última actualización: 2026-10-31*
*Versión: 1.0.0*