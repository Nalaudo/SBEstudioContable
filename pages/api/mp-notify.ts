import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log #1: lo más temprano posible
  console.log("HANDLER INVOCADO - INICIO INMEDIATO", new Date().toISOString());

  try {
    console.log("Method:", req.method);
    console.log("URL completa:", req.url);
    console.log("Query params:", req.query);

    // Headers clave para debug
    console.log("x-signature presente?", !!req.headers["x-signature"]);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log(
      "Número de headers recibidos:",
      Object.keys(req.headers).length,
    );
    console.log(
      "Headers preview (primeros 10):",
      Object.keys(req.headers).slice(0, 10).join(", "),
    );

    // Body (Pages parsea automáticamente si JSON, pero por si acaso)
    const body = req.body || {};
    console.log("Body length (stringified):", JSON.stringify(body).length);
    console.log("Body keys:", Object.keys(body));

    // Si llega hasta aquí, procesa
    if (req.method === "POST") {
      console.log("Procesando como POST OK");
      // Aquí pondrías tu lógica de MP + Google más adelante
    } else {
      console.log("Método no POST");
    }
  } catch (error) {
    console.error(
      "ERROR TEMPRANO EN HANDLER:",
      (error as Error).message || error,
    );
  }

  // Respuesta raw y mínima - evita json() para no tocar headers
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(
    JSON.stringify({
      received: true,
      debug: "logs agregados - chequea CloudWatch",
    }),
  );
}
