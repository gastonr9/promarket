import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Dialog, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Dialog> = {
  title: 'Design System/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with portal rendering, keyboard accessibility (Escape to close), and smooth animations. Composable with Header, Title, Description, Content, Footer, and Close sub-components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      action: 'openChange',
      description: 'Callback when open state changes',
      table: {
        category: 'Events',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

// Basic dialog
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Abrir Diálogo</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Título del Diálogo</DialogTitle>
            <DialogDescription>Descripción opcional con información adicional sobre la acción.</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <p className="text-sm text-muted-foreground">
              Contenido principal del diálogo. Aquí puedes poner formularios, información o cualquier contenido necesario.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </DialogFooter>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}

// Confirmation dialog
export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button variant="destructive" onClick={() => setOpen(true)}>Eliminar Elemento</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>¿Eliminar elemento?</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer. El elemento será eliminado permanentemente.</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <p className="text-sm text-muted-foreground">¿Estás seguro de que quieres continuar?</p>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Eliminar</Button>
          </DialogFooter>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}

// Form dialog
export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Nuevo Producto</Button>
        <Dialog open={open} onOpenChange={setOpen} className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crear Producto</DialogTitle>
            <DialogDescription>Completa la información para crear un nuevo producto.</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  id="product-name"
                  type="text"
                  className="w-full h-10 px-3 rounded-[var(--radius)] border border-input bg-background placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="Nombre del producto"
                />
              </div>
              <div>
                <label htmlFor="product-category" className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  id="product-category"
                  className="w-full h-10 px-3 rounded-[var(--radius)] border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option>Bebidas</option>
                  <option>Snacks</option>
                  <option>Golosinas</option>
                </select>
              </div>
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium mb-1">Precio</label>
                <input
                  id="product-price"
                  type="number"
                  className="w-full h-10 px-3 rounded-[var(--radius)] border border-input bg-background placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="0"
                />
              </div>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Crear</Button>
          </DialogFooter>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}

// Large dialog
export const LargeDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Ver Detalles Completos</Button>
        <Dialog open={open} onOpenChange={setOpen} className="max-w-2xl max-h-[86vh]">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
            <DialogDescription>Información completa del producto seleccionado.</DialogDescription>
          </DialogHeader>
          <DialogContent className="overflow-y-auto">
            <div className="space-y-6">
              <div className="aspect-video bg-muted rounded-[var(--radius)] flex items-center justify-center">
                <span className="text-6xl opacity-30">📦</span>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Información General</h4>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <dt className="text-muted-foreground">Nombre</dt>
                  <dd className="font-medium">Producto Premium</dd>
                  <dt className="text-muted-foreground">Categoría</dt>
                  <dd>Bebidas</dd>
                  <dt className="text-muted-foreground">Marca</dt>
                  <dd>Marca Premium</dd>
                  <dt className="text-muted-foreground">Precio</dt>
                  <dd className="font-medium">$2.500</dd>
                </dl>
              </div>
              <div>
                <h4 className="font-semibold">Descripción</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Especificaciones</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Contenido: 500ml</li>
                  <li>Material: PET reciclable</li>
                  <li>Origen: Argentina</li>
                  <li>Vencimiento: 12 meses</li>
                </ul>
              </div>
            </div>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cerrar</Button>
            <Button onClick={() => setOpen(false)}>Editar</Button>
          </DialogFooter>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}

// Dialog without header
export const SimpleDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Diálogo Simple</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <p className="text-sm text-center py-4">Contenido simple sin cabecera ni pie.</p>
          </DialogContent>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}

// Alert dialog style
export const AlertDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <Button variant="outline" onClick={() => setOpen(true)}>Mostrar Alerta</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--coral)]/10 text-[var(--coral)]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <DialogTitle>Atención Requerida</DialogTitle>
            <DialogDescription>Se ha detectado una acción que requiere tu confirmación.</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <p className="text-sm text-muted-foreground text-center">¿Deseas proceder con esta acción?</p>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Continuar</Button>
          </DialogFooter>
          <DialogClose />
        </Dialog>
      </div>
    )
  },
}