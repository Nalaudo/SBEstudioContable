"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      offset: 200, // Desplazamiento (en px) desde el elemento original
      duration: 1000, // Duración base de las animaciones
      easing: "ease-out-cubic", // Curva de aceleración súper suave
    });
  }, []);

  return null; // Este componente no renderiza nada visualmente
}
