"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#clientes", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex justify-start items-center gap-2 md:w-1/3"
        >
          <Image
            src="/logo-letras-negro.svg"
            alt="SB Estudio Contable Logo"
            width={75}
            height={75}
          />
          <div className="flex flex-col font-serif text-[27px] text-foreground">
            <span className="leading-tight">ESTUDIO</span>
            <span className="leading-tight">CONTABLE</span>
          </div>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex justify-center md:w-1/3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground p-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:w-1/3 flex justify-end">
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
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
