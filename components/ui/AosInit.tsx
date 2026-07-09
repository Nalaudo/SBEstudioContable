"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      once: true, // La animación ocurre solo una vez al bajar
      offset: 100, // Desplazamiento (en px) desde el elemento original
      duration: 800, // Duración base de las animaciones
      easing: "ease-out-cubic", // Curva de aceleración súper suave
    });
  }, []);

  return null; // Este componente no renderiza nada visualmente
}
