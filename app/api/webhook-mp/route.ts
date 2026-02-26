import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { createGoogleCalendarEvent } from "@/lib/google-server";

// Verifica la firma (opcional pero recomendado)
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET; // generá en MP dashboard si usás signature

export async function POST(req: NextRequest) {
  try {
    const body = await req.text(); // Read once
    const data = JSON.parse(body);

    // Verificación simple (x-signature si lo configuraste)
    if (MP_WEBHOOK_SECRET) {
      const signatureHeader = req.headers.get("x-signature");

      if (!signatureHeader) {
        console.warn("Webhook sin x-signature header");
        return NextResponse.json({ error: "Firma requerida" }, { status: 401 });
      }

      // Parsear ts y v1 del header (formato: ts=xxx,v1=yyy)
      const parts = signatureHeader.split(",");
      const tsPart = parts.find((p) => p.startsWith("ts="));
      const v1Part = parts.find((p) => p.startsWith("v1="));

      if (!tsPart || !v1Part) {
        console.warn("Formato inválido en x-signature");
        return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
      }

      const ts = tsPart.split("=")[1];
      const receivedSignature = v1Part.split("=")[1];

      // Opcional: rechazar si el timestamp es muy viejo (ej: > 5 minutos)
      const now = Date.now();
      const tsNumber = parseInt(ts, 10);
      if (Math.abs(now - tsNumber) > 5 * 60 * 1000) {
        console.warn("Webhook timestamp demasiado viejo");
        return NextResponse.json(
          { error: "Timestamp inválido" },
          { status: 401 },
        );
      }

      // Use the already-read body string (no need for another req.text())
      const rawBody = body;

      // Payload a firmar: "timestamp.payload" (string concatenado)
      const signedPayload = `${ts}.${rawBody}`;

      // Calcular HMAC-SHA256 con tu secret
      const crypto = require("crypto");
      const computedSignature = crypto
        .createHmac("sha256", MP_WEBHOOK_SECRET)
        .update(signedPayload)
        .digest("hex");

      // Comparar de forma segura (timing-safe)
      if (
        !crypto.timingSafeEqual(
          Buffer.from(computedSignature),
          Buffer.from(receivedSignature),
        )
      ) {
        console.warn("Firma webhook inválida");
        return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
      }

      console.log("Webhook signature validada OK");
    }

    // Rest of the code remains the same...
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 200 });
  }
}
