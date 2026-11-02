/**
 * Service Worker Template for Workbox
 * This file is used as a base and extended by workbox-build
 * Do not import modules here - workbox-build injects the manifest
 */

// Self-skip waiting to activate new SW immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Optional: Listen for push notifications (future use)
// self.addEventListener("push", (event) => { ... });

// Optional: Background sync for offline actions (future use)
// self.addEventListener("sync", (event) => { ... });

console.log("[ProMarket SW] Service worker template loaded");