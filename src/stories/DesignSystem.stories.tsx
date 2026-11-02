import type { Meta } from '@storybook/nextjs-vite'
import React from 'react'

const meta: Meta = {
  title: 'Design System/Overview',
  parameters: {
    docs: {
      description: {
        component: `
# ProMarket Design System

Bienvenido al sistema de diseño de **ProMarket Logística**. Esta documentación cubre los componentes UI reutilizables construidos para la aplicación mayorista.

## Principios de Diseño

- **Consistencia**: Componentes con API unificada y tokens de diseño centralizados
- **Accesibilidad**: Cumplimiento WCAG AA, navegación por teclado, ARIA labels
- **Performance**: Componentes optimizados, lazy loading, animaciones suaves (60fps)
- **Developer Experience**: TypeScript completo, autodocs, stories interactivos
- **Theming**: Soporte nativo light/dark mode con CSS custom properties

## Componentes Disponibles

| Componente | Descripción | Estado |
|------------|-------------|--------|
| **Button** | Botones con 7 variantes, 6 tamaños, estados de carga | ✅ |
| **Badge** | Etiquetas y estados con 5 variantes, 3 tamaños | ✅ |
| **Card** | Tarjetas compuestas (Header, Content, Footer) | ✅ |
| **Dialog** | Modales accesibles con portal y animaciones | ✅ |
| **Toast** | Notificaciones globales con 4 tipos | ✅ |

## Tokens de Diseño

Los componentes usan variables CSS definidas en \`globals.css\`:

\`\`\`css
:root {
  --ink: #0f172a;           /* Texto principal dark */
  --paper: #f8fafc;         /* Fondo principal light */
  --coral: #f15b42;         /* Acción principal */
  --coral-dark: #e04d35;    /* Hover acción principal */
  --mint: #dcfce7;          /* Acento secundario light */
  --lime: #a3e635;          /* Acento tags/promo */
  --blue: #3b82f6;          /* Info/success */
  --radius: 0.75rem;        /* Border radius base */
}
\`\`\`

## Uso Básico

\`\`\`tsx
import { Button, Badge, Card, Dialog, ToastProvider, useToast } from '@/components/ui'

// En layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}

// En cualquier componente
function MiComponente() {
  const { showToast } = useToast()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Tarjeta</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => showToast('¡Hola!', 'success')}>
          Click me
        </Button>
      </CardContent>
    </Card>
  )
}
\`\`\`

## Storybook

Explora todos los componentes y sus variantes en las pestañas laterales. Cada historia incluye:
- Controles interactivos para props
- Documentación automática (Autodocs)
- Tests de accesibilidad (addon-a11y)
- Tests visuales (Chromatic)

## Testing

\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Storybook
npm run storybook
\`\`\`
        `,
      },
    },
  },
}

export default meta

export const Overview = () => (
  <div className="max-w-2xl">
    <h1 className="text-3xl font-bold mb-4 text-foreground">ProMarket Design System</h1>
    <p className="text-muted-foreground mb-8">
      Bienvenido al sistema de diseño de ProMarket. Explora los componentes en la barra lateral izquierda.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-bold mb-2">Accesibilidad</h3>
        <p className="text-sm text-muted-foreground">Todos los componentes cumplen con estándares WCAG AA.</p>
      </div>
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-bold mb-2">TypeScript</h3>
        <p className="text-sm text-muted-foreground">Tipado fuerte para una mejor experiencia de desarrollo.</p>
      </div>
    </div>
  </div>
)
