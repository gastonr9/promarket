"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, Package, Tag, Settings, Eye, LogOut, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Productos", icon: Package },
  { href: "/admin/categories", label: "Categorías", icon: Tag },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
];

function AdminLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar skeleton */}
      <aside className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col">
        <div className="h-16 px-4 border-b border-border animate-shimmer" />
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 rounded-lg animate-shimmer" />
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <div className="h-10 rounded-lg animate-shimmer" />
          <div className="h-10 rounded-lg animate-shimmer" />
        </div>
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 lg:ml-0 min-w-0">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="h-16 px-4 lg:px-8 animate-shimmer" />
        </header>
        <div className="p-4 lg:p-8 space-y-6">
          <div className="h-8 w-48 rounded-lg animate-shimmer" />
          <div className="h-4 w-64 rounded animate-shimmer" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-[var(--radius)] border border-border bg-card animate-shimmer" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  // Show loading state while checking auth
  if (status === "loading") {
    return <AdminLayoutSkeleton />;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/admin" className="font-heading font-extrabold text-xl text-[var(--coral-dark)]">
            Promarket Admin
          </Link>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Eye className="h-5 w-5" aria-hidden="true" />
            Ver sitio público
          </Link>
          
          {/* User info and logout */}
          {session?.user && (
            <div className="px-3 py-2">
              <p className="text-xs text-muted-foreground">Conectado como</p>
              <p className="text-sm font-medium truncate">{session.user.email}</p>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-0 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="font-heading font-bold text-xl lg:text-2xl">Promarket Logística</h1>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Sitio
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Cerrar sesión">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}