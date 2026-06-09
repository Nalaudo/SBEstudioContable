"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#modalidad", label: "Modalidad" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section comes into view, set it as active
          if (entry.isIntersecting) {
            const currentId = entry.target.id;

            // 1. Update your React state
            setActiveSection(currentId);

            // 2. Update the browser URL without adding to history stack
            window.history.replaceState(null, "", `#${currentId}`);
          }
        });
      },
      // Trigger when 50% of the section is visible
      { threshold: 0.5 },
    );

    // Observe all sections passed in the array
    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.href.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 border-b border-white/5 backdrop-blur-sm flex flex-row justify-center">
      <nav className="flex max-w-7xl items-center justify-between h-20 px-6 w-full">
        <Link href="#inicio" className="flex items-center gap-3">
          <div className="text-3xl font-extrabold bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent tracking-tighter drop-shadow-md">
            SB
          </div>
          <div className="text-sm uppercase tracking-[0.15em] font-bold text-slate-100 border-l-2 border-emerald-500 pl-3">
            Estudio
            <br />
            Contable
          </div>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex justify-center md:w-1/3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  activeSection === l.href.substring(1)
                    ? "text-emerald-500"
                    : "text-slate-300 hover:text-emerald-500"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <Button asChild className="hidden md:inline-flex" size="sm">
            <Link
              href="https://wa.me/5493424080329?text=Hola%20SB%20Estudio%20Contable%2C%20quiero%20consultar%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribinos
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-card px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === l.href.substring(1)
                      ? "text-emerald-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4 w-full" size="sm">
            <Link
              href="https://wa.me/5493424080329?text=Hola%20SB%20Estudio%20Contable%2C%20quiero%20consultar%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribinos
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
