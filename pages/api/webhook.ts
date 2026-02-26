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
    // En Pages Router, body ya viene parseado si es JSON (por default)
    body = JSON.stringify(req.body || {});
    console.log("Body length:", body.length);
    console.log("Body preview:", body.substring(0, 200));
  } catch (e) {
    console.error("Error body:", e);
  }

  // Siempre responde 200 rápido
  res.status(200).json({ received: true, router: "pages" });
}
