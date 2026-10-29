import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per instance)
// For production, use Upstash Redis: @upstash/ratelimit
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }
  
  entry.count++;
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

// Cleanup old entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, 60_000);
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || 
               "unknown";

    // Rate limit for auth endpoints (signin, callback, etc.) - 10 req/min
    if (path.startsWith("/api/auth/") && req.method === "POST") {
      const { allowed, remaining, resetAt } = rateLimit(`auth:${ip}`, 10, 60_000);
      if (!allowed) {
        return new NextResponse(JSON.stringify({ error: "Demasiados intentos de inicio de sesión. Intente en un minuto." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((resetAt - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(resetAt / 1000).toString(),
          },
        });
      }
      const response = NextResponse.next();
      response.headers.set("X-RateLimit-Limit", "10");
      response.headers.set("X-RateLimit-Remaining", remaining.toString());
      response.headers.set("X-RateLimit-Reset", Math.ceil(resetAt / 1000).toString());
      return response;
    }

    // Rate limit for admin import endpoint
    if (path === "/api/admin/products/import" && req.method === "POST") {
      const { allowed, remaining, resetAt } = rateLimit(`import:${ip}`, 5, 60_000); // 5 req/min
      if (!allowed) {
        return new NextResponse(JSON.stringify({ error: "Demasiadas solicitudes. Intente en un minuto." }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((resetAt - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(resetAt / 1000).toString(),
          },
        });
      }
      const response = NextResponse.next();
      response.headers.set("X-RateLimit-Limit", "5");
      response.headers.set("X-RateLimit-Remaining", remaining.toString());
      response.headers.set("X-RateLimit-Reset", Math.ceil(resetAt / 1000).toString());
      return response;
    }

    // Allow access to login page without auth
    if (path === "/admin/login") {
      if (token) {
        // Already logged in, redirect to admin dashboard
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // Protect all /admin routes
    if (path.startsWith("/admin")) {
      if (!token) {
        const callbackUrl = encodeURIComponent(path + req.nextUrl.search);
        return NextResponse.redirect(new URL(`/admin/login?callbackUrl=${callbackUrl}`, req.url));
      }

      // Verify admin role
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login?error=Unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow login page without token
        if (path === "/admin/login") {
          return true;
        }
        
        // Require valid token for admin routes
        if (path.startsWith("/admin")) {
          return !!token && token.role === "admin";
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/auth/:path*",
  ],
};