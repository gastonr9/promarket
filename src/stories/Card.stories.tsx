import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with composable sub-components (Header, Title, Description, Content, Footer). Ideal for product cards, content blocks, and information panels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Card content',
      table: {
        category: 'Content',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Título de la Tarjeta</CardTitle>
        <CardDescription>Descripción opcional de la tarjeta con información adicional.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Contenido principal de la tarjeta. Aquí puede ir cualquier información relevante.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Ver más</Button>
      </CardFooter>
    </Card>
  ),
}

// Product card (similar to ProductCard)
export const ProductCard: Story = {
  render: () => (
    <Card className="w-72 hover:shadow-brand transition-shadow">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-t-[var(--radius)]">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl opacity-30">🥤</span>
        </div>
        <Badge variant="tag" className="absolute left-3 top-3 z-10">Promo</Badge>
      </div>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
            Marca Test
          </p>
          <CardTitle className="text-base">Producto Ejemplo</CardTitle>
          <p className="text-[11px] font-medium text-muted-foreground">Botella 500ml</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-bold uppercase">Precio Lista</span>
            <span className="text-sm font-black text-foreground">$1.500</span>
          </div>
          <Button variant="light" size="sm">Ver más</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

// Simple card with just content
export const Simple: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p className="text-sm">Tarjeta simple solo con contenido.</p>
      </CardContent>
    </Card>
  ),
}

// Card with image placeholder
export const WithImage: Story = {
  render: () => (
    <Card className="w-80">
      <div className="aspect-video bg-muted rounded-t-[var(--radius)]">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl opacity-30">📷</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Tarjeta con Imagen</CardTitle>
        <CardDescription>Ejemplo de tarjeta con área de imagen superior.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Contenido descriptivo debajo de la imagen.</p>
      </CardContent>
    </Card>
  ),
}

// Interactive card (hover effects)
export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-64 hover:shadow-brand transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>Interactiva 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Hover para ver efecto de sombra.</p>
        </CardContent>
      </Card>
      <Card className="w-64 hover:shadow-brand transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>Interactiva 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Hover para ver efecto de sombra.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Card with actions in footer
export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Confirmar Acción</CardTitle>
        <CardDescription>¿Estás seguro de que quieres continuar?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer.</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-2 w-full">
          <Button variant="ghost" size="sm">Cancelar</Button>
          <Button variant="destructive" size="sm">Eliminar</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

// Grid of cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {['Tarjeta 1', 'Tarjeta 2', 'Tarjeta 3', 'Tarjeta 4', 'Tarjeta 5', 'Tarjeta 6'].map((title, i) => (
        <Card key={i} className="hover:shadow-brand transition-shadow">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Descripción breve de la tarjeta {i + 1}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Contenido de ejemplo para {title.toLowerCase()}.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
}