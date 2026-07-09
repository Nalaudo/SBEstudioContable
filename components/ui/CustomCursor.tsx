// components/CustomCursor.tsx
"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBlur = cursorBlurRef.current;

    if (!cursor || !cursorBlur) return;

    const moveCursor = (e: MouseEvent) => {
      // Modificamos el DOM directamente para máximo rendimiento
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      cursorBlur.style.left = `${e.clientX}px`;
      cursorBlur.style.top = `${e.clientY}px`;
    };

    // Efecto para agrandar el cursor al pasar sobre enlaces o botones
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Si el elemento o su contenedor es un link, botón o tiene la clase hover-target
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-target")
      ) {
        cursor.classList.add("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover");
      }
    };

    // Ocultar al salir de la ventana
    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
      cursorBlur.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
      cursorBlur.style.opacity = "1";
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        id="custom-cursor"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 transition-[transform,opacity] duration-150 ease-out"
      />
      <div
        ref={cursorBlurRef}
        className="pointer-events-none fixed left-0 top-0 z-9998 h-62.5 w-62.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[60px] transition-[top,left,opacity] duration-300 ease-out"
      />
    </>
  );
}
