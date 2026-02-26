import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { createGoogleCalendarEvent } from "@/lib/google-server";

// Verifica la firma (opcional pero recomendado)
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET; // generá en MP dashboard si usás signature

export async function POST(req: NextRequest) {
  console.log("Webhook recibido en:", new Date().toISOString());
  console.log("Headers:", Object.fromEntries(req.headers.entries()));

  let body: string;
  try {
    body = await req.text();
    console.log("Raw body recibido (longitud):", body.length);
    console.log("Body preview:", body.substring(0, 200)); // no todo para no spamear
  } catch (e) {
    console.error("Error leyendo body:", e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  let data;
  try {
    data = JSON.parse(body);
    console.log("Data parseada:", data);
  } catch (e) {
    console.error("Error parseando JSON:", e, "Body:", body);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
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

    try {
      if (data.type === "payment") {
        const paymentId = data.data.id;
        console.log("Consultando payment ID:", paymentId);

        const client = new MercadoPagoConfig({
          accessToken: process.env.MP_ACCESS_TOKEN!,
        });
        const paymentClient = new Payment(client);

        const payment = await paymentClient.get({ id: paymentId });
        console.log("Payment obtenido:", payment.status);

        if (payment.status === "approved") {
          const externalRef = payment.external_reference;
          if (externalRef) {
            const { email, date, time } = JSON.parse(externalRef);

            // ¡Acá agendamos!
            await createGoogleCalendarEvent({ email, date, time });

            // Opcional: enviá email de confirmación con Resend/Nodemailer
          }
        }
      }
    } catch (e) {
      console.error("Error procesando payment:", e);
      // NO devuelvas 200 aquí si falla gravemente → mejor 500 para debug, pero MP prefiere 200 siempre
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 200 });
  }
}
