import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useToast, ToastProvider } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

// Since Toast uses context, we need a wrapper component for stories
const ToastDemo = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
)

const meta: Meta = {
  title: 'Design System/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toast notification system with multiple types (default, success, error, info), animations via framer-motion, and auto-dismiss. Uses React Context for global access via `useToast()` hook.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => <ToastProvider><Story /></ToastProvider>,
  ],
}

export default meta
type Story = StoryObj<typeof ToastDemo>

// Default toast
export const Default: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-2">
        <Button onClick={() => showToast('Esta es una notificación por defecto', 'default')}>
          Mostrar Default
        </Button>
        <p className="text-sm text-muted-foreground">Click para mostrar toast tipo default (fondo oscuro)</p>
      </div>
    )
  },
}

// Success toast
export const Success: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-2">
        <Button onClick={() => showToast('¡Operación completada con éxito!', 'success')}>
          Mostrar Success
        </Button>
        <p className="text-sm text-muted-foreground">Click para mostrar toast tipo success (fondo azul)</p>
      </div>
    )
  },
}

// Error toast
export const Error: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-2">
        <Button onClick={() => showToast('Ha ocurrido un error inesperado', 'error')}>
          Mostrar Error
        </Button>
        <p className="text-sm text-muted-foreground">Click para mostrar toast tipo error (fondo coral/rojo)</p>
      </div>
    )
  },
}

// Info toast
export const Info: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-2">
        <Button onClick={() => showToast('Información importante para el usuario', 'info')}>
          Mostrar Info
        </Button>
        <p className="text-sm text-muted-foreground">Click para mostrar toast tipo info (fondo azul)</p>
      </div>
    )
  },
}

// All toast types
export const AllTypes: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => showToast('Notificación por defecto', 'default')}>Default</Button>
        <Button onClick={() => showToast('¡Éxito! Operación completada', 'success')}>Success</Button>
        <Button onClick={() => showToast('Error: algo salió mal', 'error')}>Error</Button>
        <Button onClick={() => showToast('Información relevante', 'info')}>Info</Button>
      </div>
    )
  },
}

// Multiple toasts
export const Multiple: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <Button onClick={() => {
        showToast('Primera notificación', 'default')
        setTimeout(() => showToast('Segunda notificación', 'success'), 200)
        setTimeout(() => showToast('Tercera notificación', 'error'), 400)
        setTimeout(() => showToast('Cuarta notificación', 'info'), 600)
      }}>
        Mostrar 4 Toasts
      </Button>
    )
  },
}

// Custom duration
export const CustomDuration: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-2">
        <Button onClick={() => showToast('Toast corto (1 segundo)', 'default', 1000)}>
          Duración 1s
        </Button>
        <Button onClick={() => showToast('Toast largo (10 segundos)', 'default', 10000)}>
          Duración 10s
        </Button>
        <p className="text-sm text-muted-foreground">Los toasts se auto-dismiss después de la duración especificada</p>
      </div>
    )
  },
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const { showToast } = useToast()
    return (
      <div className="space-y-3">
        <div>
          <h4 className="font-medium mb-2">Ejemplos de Casos Reales</h4>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => showToast('Producto agregado al carrito', 'success')}>
              Agregar al Carrito
            </Button>
            <Button onClick={() => showToast('Sesión expirada, inicia sesión nuevamente', 'error')}>
              Sesión Expirada
            </Button>
            <Button onClick={() => showToast('Cambios guardados correctamente', 'success')}>
              Guardar Cambios
            </Button>
            <Button onClick={() => showToast('Nueva versión disponible. Recarga la página', 'info')}>
              Actualización
            </Button>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Operaciones de Catálogo</h4>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => showToast('Producto "Coca Cola 500ml" creado exitosamente', 'success')}>
              Crear Producto
            </Button>
            <Button onClick={() => showToast('Producto actualizado correctamente', 'success')}>
              Actualizar Producto
            </Button>
            <Button onClick={() => showToast('No se pudo eliminar el producto', 'error')}>
              Error al Eliminar
            </Button>
            <Button onClick={() => showToast('Importación completada: 45 productos, 2 errores', 'info')}>
              Importar Excel
            </Button>
          </div>
        </div>
      </div>
    )
  },
}