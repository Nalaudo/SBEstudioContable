import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { createGoogleCalendarEvent } from "@/lib/google-server";

// Verifica la firma (opcional pero recomendado)

export async function POST(req: NextRequest) {
  console.log("Webhook recibido en:", new Date().toISOString());
  console.log("Headers:", Object.fromEntries(req.headers.entries()));

  let body: string;
  try {
    body = await req.text();
    console.log(body, "Body recibido en webhook");
  } catch (e) {
    console.error("Error leyendo body:", e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch (e) {
    console.error("Error parseando JSON:", e, "Body:", body);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (data.type === "payment") {
      const paymentId = data.data.id;

      const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN!,
      });
      const paymentClient = new Payment(client);

      const payment = await paymentClient.get({ id: paymentId });

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
    return NextResponse.json(
      { error: "Error processing payment" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
