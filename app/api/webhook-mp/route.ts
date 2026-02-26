import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { createGoogleCalendarEvent } from "@/lib/google-server";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET; // opcional, pero recomendado

export async function POST(req: NextRequest) {
  try {
    // Validación de firma si tenés secret configurado
    // if (MP_WEBHOOK_SECRET) {
    //   const signatureHeader = req.headers.get("x-signature");

    //   if (!signatureHeader) {
    //     return NextResponse.json({ error: "Firma requerida" }, { status: 401 });
    //   }

    //   const parts = signatureHeader.split(",");
    //   const tsPart = parts.find((p) => p.startsWith("ts="));
    //   const v1Part = parts.find((p) => p.startsWith("v1="));

    //   if (!tsPart || !v1Part) {
    //     return NextResponse.json(
    //       { error: "Formato de firma inválido" },
    //       { status: 401 },
    //     );
    //   }

    //   const ts = tsPart.split("=")[1];
    //   const receivedSignature = v1Part.split("=")[1];

    //   // Check timestamp (anti-replay)
    //   const now = Date.now();
    //   const tsNumber = parseInt(ts, 10);
    //   if (Math.abs(now - tsNumber) > 5 * 60 * 1000) {
    //     return NextResponse.json(
    //       { error: "Timestamp inválido" },
    //       { status: 401 },
    //     );
    //   }

    //   const rawBody = await req.text();
    //   const signedPayload = `${ts}.${rawBody}`;

    //   const computedSignature = crypto
    //     .createHmac("sha256", MP_WEBHOOK_SECRET)
    //     .update(signedPayload)
    //     .digest("hex");

    //   if (
    //     !crypto.timingSafeEqual(
    //       Buffer.from(computedSignature),
    //       Buffer.from(receivedSignature),
    //     )
    //   ) {
    //     return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    //   }
    // }

    // Parsear el body (ahora sí)
    const data = JSON.parse(await req.text()); // o usa el rawBody anterior

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

          // ¡Acá llamás a tu función de agendar en Google Calendar!
          await createGoogleCalendarEvent({ email, date, time });

          console.log(`Turno agendado: ${date} ${time} - ${email}`);
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
