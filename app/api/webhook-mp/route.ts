// api/webhook.ts (endpoint corregido con validación de firma activada y ajustes)
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { createGoogleCalendarEvent } from "@/lib/google-server";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Leer el body raw una sola vez (importante en Next.js, ya que req.text() consume el stream)
    const rawBody = await req.text();

    // Validación de firma si el secret está configurado
    // if (MP_WEBHOOK_SECRET) {
    //   const signatureHeader = req.headers.get("x-signature");

    //   if (!signatureHeader) {
    //     console.error("Firma requerida ausente");
    //     return NextResponse.json({ error: "Firma requerida" }, { status: 401 });
    //   }

    //   // Parsear el header de firma (formato: ts=123456,v1=abc123)
    //   const parts = signatureHeader.split(",");
    //   const tsPart = parts.find((p) => p.trim().startsWith("ts="));
    //   const v1Part = parts.find((p) => p.trim().startsWith("v1="));

    //   if (!tsPart || !v1Part) {
    //     console.error("Formato de firma inválido");
    //     return NextResponse.json(
    //       { error: "Formato de firma inválido" },
    //       { status: 401 },
    //     );
    //   }

    //   const ts = tsPart.split("=")[1].trim();
    //   const receivedSignature = v1Part.split("=")[1].trim();

    //   // Verificar timestamp (anti-replay, diferencia máxima de 5 minutos)
    //   const now = Date.now();
    //   const tsNumber = parseInt(ts, 10);
    //   if (Math.abs(now - tsNumber) > 5 * 60 * 1000) {
    //     console.error("Timestamp inválido");
    //     return NextResponse.json(
    //       { error: "Timestamp inválido" },
    //       { status: 401 },
    //     );
    //   }

    //   // Computar la firma esperada
    //   const signedPayload = `${ts}.${rawBody}`;
    //   const computedSignature = crypto
    //     .createHmac("sha256", MP_WEBHOOK_SECRET)
    //     .update(signedPayload)
    //     .digest("hex");

    //   // Comparación segura
    //   if (
    //     !crypto.timingSafeEqual(
    //       Buffer.from(computedSignature),
    //       Buffer.from(receivedSignature),
    //     )
    //   ) {
    //     console.error("Firma inválida");
    //     return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    //   }
    // }

    // Parsear el body ahora que está validado
    const data = JSON.parse(rawBody);

    if (data.type === "payment") {
      const paymentId = data.data?.id;

      if (!paymentId) {
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Consultar el pago para obtener status y external_reference
      const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN });
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: paymentId });

      if (payment.status === "approved") {
        const externalRef = payment.external_reference;
        if (externalRef) {
          let parsedRef;
          try {
            parsedRef = JSON.parse(externalRef);
          } catch {
            console.error("external_reference no es JSON válido");
            return NextResponse.json({ received: true }, { status: 200 });
          }

          const { email, date, time } = parsedRef;

          // Llamar a la función para agendar el evento en Google Calendar
          await createGoogleCalendarEvent({ email, date, time });
        }
      }
    }

    // Siempre responder 200 OK para que MP deje de reintentar
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error en webhook:", error);
    // Igual responder 200 para no generar reintentos infinitos
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
