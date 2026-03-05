// app/api/get-booked-slots/route.ts
import { NextRequest, NextResponse } from "next/server";
import { graphClient } from "@/lib/microsoft-server"; // tu archivo con graphClient y refresh logic

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return NextResponse.json(
      { error: "Falta date (formato YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  // Validar formato YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json(
      { error: "Formato de fecha inválido" },
      { status: 400 },
    );
  }

  try {
    const client = await graphClient();

    // Construir rango del día en UTC (Graph usa UTC internamente)
    const startDate = new Date(`${dateParam}T00:00:00-03:00`);
    const endDate = new Date(`${dateParam}T23:59:59-03:00`);
    const userIdOrEmail = "slbetique@outlook.com";

    const events = await client
      .api(`/users/${userIdOrEmail}/calendar/calendarView`)
      .filter(
        `start/dateTime ge '${startDate.toISOString()}' and end/dateTime le '${endDate.toISOString()}'`,
      )
      .select("start,end,subject")
      .orderby("start/dateTime")
      .get();

    // Extraer horarios de inicio (solo los que tienen hora)
    const bookedTimes =
      events.value
        ?.map((event: any) => {
          if (!event.start?.dateTime) return null;

          // Convertir a hora local Argentina
          const startLocal = new Date(event.start.dateTime);
          // Ajustar timezone si Graph no lo devolvió en local (raro, pero por si acaso)
          const offset = startLocal.getTimezoneOffset() * -1; // minutos
          startLocal.setMinutes(startLocal.getMinutes() + offset);

          const hours = startLocal.getHours().toString().padStart(2, "0");
          const minutes = startLocal.getMinutes().toString().padStart(2, "0");

          return `${hours}:${minutes}`;
        })
        .filter(Boolean) || [];

    // Opcional: remover duplicados si hay eventos superpuestos
    const uniqueBooked = [...new Set(bookedTimes)];

    return NextResponse.json({ booked: uniqueBooked });
  } catch (err: any) {
    console.error("Error consultando booked slots en Outlook:", {
      message: err.message,
      response: err.response?.data || err,
    });

    return NextResponse.json(
      { error: "Error al consultar horarios ocupados", details: err.message },
      { status: 500 },
    );
  }
}
