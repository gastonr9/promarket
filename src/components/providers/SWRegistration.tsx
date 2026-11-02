"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Service Worker Registration Component
 * Registers the Workbox service worker for offline support
 * Only registers in production environment
 */
export function SWRegistration() {
  const [swSupported, setSwSupported] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if service workers are supported (defer to avoid sync setState in effect)
    if ("serviceWorker" in navigator) {
      setTimeout(() => setSwSupported(true), 0);
    }
  }, []);

  useEffect(() => {
    if (!swSupported || process.env.NODE_ENV !== "production") return;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("[ProMarket SW] Registered:", registration.scope);

        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New content is available, notify user
                if (confirm("Hay una nueva versión disponible. ¿Recargar?")) {
                  window.location.reload();
                }
              }
            });
          }
        });

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Every hour

      } catch (error) {
        console.error("[ProMarket SW] Registration failed:", error);
      }
    };

    // Register after page load to not block initial render
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW, { once: true });
    }

    return () => {
      window.removeEventListener("load", registerSW);
    };
  }, [swSupported]);

  // Optional: Check for updates on route change
  useEffect(() => {
    if (!swSupported || process.env.NODE_ENV !== "production") return;

    const checkUpdate = async () => {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      } catch (error) {
        console.debug("[ProMarket SW] Update check failed:", error);
      }
    };

    checkUpdate();
  }, [pathname, swSupported]);

  return null; // This component doesn't render anything
}