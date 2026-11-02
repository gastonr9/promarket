import { generateSW } from "workbox-build";
import { readFileSync, writeFileSync } from "fs";

async function generateServiceWorker() {
  // First generate the base SW
  const { count, size, warnings } = await generateSW({
    swDest: "public/sw.js",
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.pathname.startsWith("/catalogo"),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "catalog-pages",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "api-responses",
          networkTimeoutSeconds: 5,
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 5 * 60, // 5 minutes
          },
        },
      },
      {
        urlPattern: ({ url }) => url.pathname.match(/\.(?:png|jpg|jpeg|webp|avif|svg|gif)$/),
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ url }) => url.pathname.match(/\.(?:js|css|woff2?)$/),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
    ],
  });

  if (warnings.length > 0) {
    console.warn("Workbox warnings:", warnings);
  }

  // Append custom template code to the generated SW
  const templateCode = `
// Self-skip waiting to activate new SW immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

console.log("[ProMarket SW] Service worker loaded");
`;

  const existingSW = readFileSync("public/sw.js", "utf-8");
  writeFileSync("public/sw.js", existingSW + templateCode);

  console.log(`Service worker generated: ${count} files, ${(size / 1024).toFixed(2)} KB`);
}

generateServiceWorker().catch((error) => {
  console.error("Error generating service worker:", error);
  process.exit(1);
});