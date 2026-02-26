import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("WEBHOOK EN PAGES ROUTER - LLEGÓ", new Date().toISOString());
  console.log("Method:", req.method);
  console.log(
    "x-signature:",
    req.headers["x-signature"] ? "presente" : "ausente",
  );

  let body = "";
  try {
    body = JSON.stringify(req.body || {});
    console.log("Body length:", body.length);
    console.log("Body preview:", body.substring(0, 200));
  } catch (e) {
    console.error("Error body:", e);
  }

  // Respuesta raw - evita json() para no tocar headers read-only
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache"); // opcional, evita cachés
  res.status(200).send(JSON.stringify({ received: true, router: "pages" }));
}
