"use client";

import Link from "next/link";

interface NavBarProps {
  activeSection?: string;
}

export function NavBar({ activeSection }: NavBarProps) {
  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#catalogo", label: "Catálogo Mayorista" },
    { href: "#como-comprar", label: "Cómo Pedir" },
    { href: "#ofertas", label: "Ofertas" },
    { href: "#nosotros", label: "Sobre Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="nav-bar bg-white border-b border-slate-200 sticky top-0 z-30" aria-label="Navegación principal" style={{ top: 'var(--header-height, 88px)' }}>
      <div className="wrap mx-auto px-6 lg:px-8">
        <ul className="flex flex-wrap items-center gap-1 lg:gap-6 py-3" role="menubar">
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={`px-2 py-2 font-body text-sm font-medium transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                }`}
                aria-current={activeSection === item.href.replace('#', '') ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}