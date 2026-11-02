import type { Preview } from '@storybook/nextjs-vite'
import { ToastProvider } from '@/components/ui/toast'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f7f1' },
        { name: 'muted', value: '#e1e5dd' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="p-4">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export default preview