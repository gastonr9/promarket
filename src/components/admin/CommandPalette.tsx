"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Tag,
  Settings,
  LogOut,
  Search,
  Command,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { analytics } from "@/lib/analytics";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  section: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useSession(); // Required for signOut to work

  // Handle closing with exit animation
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setQuery("");
    // Wait for exit animation to complete
    setTimeout(() => {
      setIsOpen(false);
      setIsExiting(false);
    }, 150);
  }, []);

  // Build commands list
  const allCommands = useMemo((): Command[] => {
    const cmds: Command[] = [
      // Navigation
      {
        id: "nav-dashboard",
        label: "Dashboard",
        description: "Ver resumen general",
        icon: <LayoutDashboard className="h-4 w-4" />,
        shortcut: "⌘1",
        action: () => router.push("/admin"),
        section: "Navegación",
      },
      {
        id: "nav-products",
        label: "Productos",
        description: "Gestionar catálogo de productos",
        icon: <Package className="h-4 w-4" />,
        shortcut: "⌘2",
        action: () => router.push("/admin/products"),
        section: "Navegación",
      },
      {
        id: "nav-categories",
        label: "Categorías",
        description: "Gestionar categorías",
        icon: <Tag className="h-4 w-4" />,
        shortcut: "⌘3",
        action: () => router.push("/admin/categories"),
        section: "Navegación",
      },
      {
        id: "nav-settings",
        label: "Configuración",
        description: "Ajustes del panel de administración",
        icon: <Settings className="h-4 w-4" />,
        shortcut: "⌘4",
        action: () => router.push("/admin/settings"),
        section: "Navegación",
      },
      // Actions
      {
        id: "action-new-product",
        label: "Nuevo producto",
        description: "Crear un producto en el catálogo",
        icon: <Package className="h-4 w-4" />,
        action: () => router.push("/admin/products/new"),
        section: "Acciones",
      },
      {
        id: "action-import-products",
        label: "Importar productos (Excel)",
        description: "Subir archivo Excel para importación masiva",
        icon: <Package className="h-4 w-4" />,
        action: () => router.push("/admin/products?import=true"),
        section: "Acciones",
      },
      {
        id: "action-new-category",
        label: "Nueva categoría",
        description: "Crear una nueva categoría",
        icon: <Tag className="h-4 w-4" />,
        action: () => router.push("/admin/categories/new"),
        section: "Acciones",
      },
      // External
      {
        id: "ext-view-site",
        label: "Ver sitio público",
        description: "Abrir la tienda en nueva pestaña",
        icon: <ExternalLink className="h-4 w-4" />,
        shortcut: "⌘⇧V",
        action: () => window.open("/", "_blank", "noopener,noreferrer"),
        section: "Externo",
      },
      {
        id: "ext-logout",
        label: "Cerrar sesión",
        description: "Salir del panel de administración",
        icon: <LogOut className="h-4 w-4" />,
        action: () => signOut({ callbackUrl: "/admin/login" }),
        section: "Externo",
      },
    ];
    return cmds;
  }, [router]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const q = query.toLowerCase().trim();
    return allCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.section.toLowerCase().includes(q)
    );
  }, [query, allCommands]);

  // Group commands by section
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.section]) groups[cmd.section] = [];
      groups[cmd.section].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Reset selection when query changes
  useEffect(() => {
    setTimeout(() => setSelectedIndex(0), 0);
  }, [query]);

  // Handle keyboard shortcuts globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setQuery("");
          analytics.commandPaletteOpen();
        }
      }
      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const total = filteredCommands.length;
      if (total === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % total);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + total) % total);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            handleClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          handleClose();
          break;
        default:
          break;
      }
    },
    [filteredCommands, selectedIndex, handleClose]
  );

  // Scroll selected item into view
  useEffect(() => {
    const item = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  // Execute command
  const executeCommand = (cmd: Command) => {
    analytics.commandPaletteExecute(cmd.id, cmd.label, cmd.section);
    cmd.action();
    handleClose();
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className={cn("fixed inset-0 z-50 bg-black/30 backdrop-blur-sm palette-backdrop", isExiting ? "palette-exiting" : "palette-enter")}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Palette */}
          <div
            className={cn("fixed left-1/2 top-20 z-[60] w-full max-w-2xl -translate-x-1/2 pointer-events-auto palette-container", isExiting ? "palette-exiting" : "palette-enter")}
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
          >
            <div className="bg-card border border-border rounded-[var(--radius-xl)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
              {/* Search input */}
              <div className="relative p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un comando o busca..."
                    className="w-full h-11 pl-11 pr-10 text-base bg-background border border-input rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    aria-label="Buscar comandos"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                    <Command className="h-3 w-3 inline-block align-middle mr-1" /> K
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[400px] overflow-y-auto"
                role="listbox"
                aria-label="Comandos disponibles"
              >
                {Object.entries(groupedCommands).length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No se encontraron comandos</p>
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([section, cmds]) => (
                    <div key={section}>
                      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/50 border-b border-border">
                        {section}
                      </div>
                      {cmds.map((cmd) => {
                        const globalIdx = filteredCommands.indexOf(cmd);
                        const isSelected = globalIdx === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            type="button"
                            data-index={globalIdx}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => executeCommand(cmd)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                executeCommand(cmd);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 transition-colors w-full text-left",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent/50"
                            )}
                          >
                            <div className="flex items-center justify-center w-8 h-8">{cmd.icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{cmd.label}</p>
                              <p className="text-[11px] text-muted-foreground/80 truncate">
                                {cmd.description}
                              </p>
                            </div>
                            {cmd.shortcut && (
                              <kbd className="text-[10px] font-mono text-muted-foreground/60 px-2 py-0.5 rounded bg-muted">
                                {cmd.shortcut}
                              </kbd>
                            )}
                            {isSelected && (
                              <ChevronRight className="h-4 w-4 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Hint */}
              <div className="px-4 py-2 border-t border-border bg-muted/30">
                <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" /> <ArrowDown className="h-3 w-3" />
                    Navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↵</kbd>
                    Ejecutar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">Esc</kbd>
                    Cerrar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}