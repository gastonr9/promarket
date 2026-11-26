import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Fix output file tracing for monorepo setup
  outputFileTracingRoot: __dirname,
  
  // Minimize polyfills for modern browsers
  compiler: {
    // Enable SWC minification (default in Next.js 14+)
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  
  // Webpack configuration to reduce polyfills for modern browsers
  webpack: (config, { dev, isServer }) => {
    // Target modern browsers to reduce polyfills
    if (!dev && !isServer) {
      config.target = "web";
      // Use ES2022 target to avoid unnecessary polyfills
      config.output.environment = {
        ...config.output.environment,
        arrowFunction: true,
        bigIntLiteral: true,
        const: true,
        destructuring: true,
        dynamicImport: true,
        forOf: true,
        module: true,
      };
    }
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // DNS prefetch for third-party origins used on specific pages
          {
            key: "Link",
            value: [
              '<https://cdn.sanity.io>; rel=dns-prefetch',
              '<https://wa.me>; rel=dns-prefetch',
              '<https://vitals.vercel-insights.com>; rel=dns-prefetch',
            ].join(", "),
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vitals.vercel-insights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://cdn.sanity.io https://api.sanity.io https://wa.me https://vitals.vercel-insights.com",
              "frame-src https://wa.me",
              "base-uri 'self'",
              "form-action 'self' https://wa.me",
            ].join("; "),
          },
        ],
      },
      // Cache static assets for performance
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/catalogo/:slug",
        destination: "/catalogo/:slug",
      },
    ];
  },

  // Performance optimizations
  experimental: {
    agentUpgrade: "security",
    optimizePackageImports: ["lucide-react"],
  },

  // Turbopack config for Tailwind v4
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  
  // Enable compression
  compress: true,
};

export default withBundleAnalyzer(nextConfig);