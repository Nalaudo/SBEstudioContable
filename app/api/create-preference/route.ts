import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: NextRequest) {
  try {
    const { email, date, time } = await req.json();

    if (!email || !date || !time) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios." },
        { status: 400 },
      );
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json(
        { error: "Mercado Pago no esta configurado." },
        { status: 500 },
      );
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const formattedDate = new Date(date).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const origin = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

    const result = await preference.create({
      body: {
        items: [
          {
            id: "consulta-profesional",
            title: `Consulta Profesional - ${formattedDate} a las ${time} hs`,
            description: `Consulta Profesional con ${email} programada para el ${formattedDate} a las ${time} hs.`,
            quantity: 1,
            unit_price: Number(process.env.NEXT_PUBLIC_SERVICE_PRICE) || 50000,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${origin}/agendar/resultado`,
          failure: `${origin}/agendar/resultado`,
          pending: `${origin}/agendar/resultado`,
        },
        auto_return: "approved",
        external_reference: JSON.stringify({ email, date, time }),
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error creating MP preference:", error);
    return NextResponse.json(
      { error: "Error al procesar el pago. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
