import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator or label component with multiple variants and sizes. Used for tags, status indicators, and categorization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'accent', 'tag'],
      description: 'Visual style variant of the badge',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the badge',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge label/content',
      table: {
        category: 'Content',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// Default badge
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
}

// Secondary badge
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

// Outline badge
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

// Accent badge
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
}

// Tag badge (special for product tags)
export const Tag: Story = {
  args: {
    children: 'Promo',
    variant: 'tag',
  },
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="tag">Tag</Badge>
    </div>
  ),
}

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" variant="default">Small</Badge>
      <Badge size="default" variant="default">Default</Badge>
      <Badge size="lg" variant="default">Large</Badge>
    </div>
  ),
}

// Product tag examples
export const ProductTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="tag" size="sm">Promo</Badge>
      <Badge variant="tag" size="sm">Nuevo</Badge>
      <Badge variant="tag" size="sm">Oferta</Badge>
      <Badge variant="tag" size="sm">Destacado</Badge>
      <Badge variant="tag" size="sm">Agotado</Badge>
    </div>
  ),
}

// Status badges (using available variants)
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Activo</Badge>
      <Badge variant="secondary">Inactivo</Badge>
      <Badge variant="accent">Pendiente</Badge>
      <Badge variant="outline" className="border-2 border-[var(--coral)] text-[var(--coral)]">Error</Badge>
      <Badge variant="outline">Borrador</Badge>
    </div>
  ),
}

// With custom className
export const CustomStyled: Story = {
  args: {
    children: 'Personalizado',
    variant: 'outline',
    className: 'border-2 border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)] hover:text-white transition-colors',
  },
}