# Promarket Logística - Wholesale Catalog

Next.js 16 App Router wholesale catalog with admin dashboard, local JSON persistence, and WhatsApp ordering.

## Features

- **Public Catalog**: Product listing with filtering, search, and WhatsApp integration
- **Admin Dashboard**: Protected `/admin` routes for products, categories, and settings
- **Excel Import/Export**: Bulk product management via `.xlsx` files
- **Local JSON Storage**: No external database required - `src/data/products.json`
- **Authentication**: NextAuth.js with credentials provider
- **WCAG AA**: Accessible components with proper contrast and ARIA
- **Design System**: Tailwind v4 with CSS custom properties

## Getting Started

### Prerequisites

- Node.js 20+
- npm/pnpm/yarn

### Installation

```bash
cd ProMarket
npm install
```

### Environment Variables

Create `.env.local` with:

```env
# Admin credentials (keep out of git!)
ADMIN_EMAIL=admin@promarket.com.ar
ADMIN_PASSWORD_HASH=$2b$12$zxmLHXGjb0ZwJgaOJAXYCezJ3aXyJtoULKvPqOb4EeXAv7ej3CFcO

# NextAuth - CHANGE IN PRODUCTION!
NEXTAUTH_SECRET=your-super-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
```

### Default Admin Credentials

- **Email**: `admin@promarket.com.ar`
- **Password**: `admin123`

> ⚠️ **Important**: Change the default password immediately in production!

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## NextAuth Secret Rotation (S-05)

### Security Policy

The `NEXTAUTH_SECRET` **must be rotated every 90 days** in production environments.

### Rotation Procedure

1. **Generate new secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Update environment variable** in your deployment platform (Vercel, AWS, etc.):
   ```env
   NEXTAUTH_SECRET=<new-generated-secret>
   ```

3. **Redeploy** the application

4. **Effect**: All existing sessions will be invalidated. Users will need to log in again.

### Why Rotate?

- **Session security**: Invalidates potentially compromised JWT tokens
- **Compliance**: Meets common security standards (SOC2, ISO27001)
- **Best practice**: Limits blast radius of secret exposure

### Automation

Consider automating rotation via:
- **Vercel**: Cron job + Vercel API to update env vars
- **AWS**: Secrets Manager rotation + Lambda to update ECS/EC2
- **GitHub Actions**: Scheduled workflow with deployment

### Emergency Rotation

If secret is compromised:
1. Generate new secret immediately
2. Update in deployment platform
3. Force redeploy
4. Notify team
5. Audit recent admin activity

## Project Structure

```
ProMarket/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── admin/              # Admin dashboard (protected)
│   │   ├── api/admin/          # Admin API routes
│   │   ├── catalogo/[slug]/    # Product detail pages (ISR)
│   │   ├── globals.css         # Design tokens & utilities
│   │   ├── layout.tsx
│   │   └── page.tsx            # Home with embedded catalog
│   ├── components/
│   │   ├── admin/              # Admin-specific components
│   │   ├── catalog/            # Public catalog components
│   │   ├── sections/           # Page sections (Hero, Catalog, etc.)
│   │   └── ui/                 # Base UI components
│   ├── lib/
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── sanity/             # Local JSON data layer
│   │   ├── utils.ts            # Classnames utility
│   │   └── validation.ts       # Zod schemas
│   ├── middleware.ts           # Route protection + rate limiting
│   └── types/                  # TypeScript types
├── src/data/
│   └── products.json           # Primary data store
├── .env.local                  # Local environment (gitignored)
└── AUDIT_TODO.md               # Audit checklist
```

## Admin Dashboard

Access `/admin` with credentials:

- **Products**: `/admin/products` - CRUD + Excel import/export
- **Categories**: `/admin/categories` - Category management
- **Settings**: `/admin/settings` - Site configuration

## Data Management

### Excel Import Template

GET `/api/admin/products/template` - Downloads `.xlsx` template

### Excel Import

POST `/api/admin/products/import` - Upload `.xlsx` (max 2MB, rate limited 5/min)

## Security

- **Rate limiting**: 5 req/min on import endpoint (in-memory, use Upstash for production)
- **CSP headers**: Configured in `next.config.ts`
- **Admin credentials**: Stored in environment variables (not JSON)
- **Password hashing**: bcryptjs with 12 rounds

## Design System

CSS custom properties in `globals.css` mapped to Tailwind via `@theme inline`:
- Colors: `--ink`, `--coral`, `--lime`, `--mint`, `--blue`
- Spacing: `--space-*`, `--container-max`
- Radius: `--radius-*`, `.radius-nested*` utilities
- Typography: `--font-heading`, `--font-body`, `--step-*` fluid type scale
- Motion: `.animate-shimmer`, `.will-change-*`

## Accessibility (WCAG AA)

- Semantic HTML5 landmarks
- Focus management with visible outlines
- ARIA labels on interactive elements
- Color contrast ratios ≥ 4.5:1
- Keyboard navigation support
- Reduced motion support

## Deployment

### Vercel (Recommended)

1. Connect repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Audit Checklist

See `AUDIT_TODO.md` for detailed task tracking (P0-P3 priorities).

## License

Private - Promarket Logística