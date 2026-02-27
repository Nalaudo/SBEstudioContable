import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("WEBHOOK LLEGÓ - INTENTANDO VALIDAR FIRMA V1 QUERY");

  const headers = req.headers;
  const xSignature = headers["x-signature"] as string;
  const xRequestId = headers["x-request-id"] as string;
  const dataId = req.query["data.id"] as string; // o req.query.id si es solo ?id=...

  if (!xSignature || !xRequestId || !dataId) {
    console.warn("Faltan headers o query params para validación");
    return res.status(200).json({ received: true }); // responde 200 igual
  }

  const parts = xSignature.split(",");
  let ts = "";
  let hash = "";

  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key?.trim() === "ts") ts = value?.trim() || "";
    if (key?.trim() === "v1") hash = value?.trim() || "";
  });

  const secret = process.env.MP_WEBHOOK_SECRET!;
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  const computed = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  if (computed === hash) {
    console.log("Firma válida (query manifest)");
    // Procesar el pago aquí
  } else {
    console.warn("Firma inválida (query manifest)", {
      computed,
      received: hash,
    });
  }

  res.status(200).json({ received: true });
}
