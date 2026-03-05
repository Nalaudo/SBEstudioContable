import { calendar } from "@/lib/google-server";
import { NextRequest, NextResponse } from "next/server";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) return NextResponse.json({ error: "Falta date" }, { status: 400 });

  const start = new Date(date + "T00:00:00-03:00");
  const end = new Date(date + "T23:59:59-03:00");

  const res = await calendar.events.list({
    calendarId: "sbetique@gmail.com",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const bookedTimes = new Set<string>();

  res.data.items?.forEach((e) => {
    if (!e.start?.dateTime || !e.end?.dateTime) return;

    const start = new Date(e.start.dateTime);
    const end = new Date(e.end.dateTime);

    // Recorrer todos los slots y ver cuáles se superponen con el evento
    TIME_SLOTS.forEach((slot) => {
      const [hour, minute] = slot.split(":").map(Number);

      // Construir start/end del slot en la misma fecha del evento
      const slotStart = new Date(start);
      slotStart.setHours(hour, minute, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setHours(slotEnd.getHours() + 1);

      // Se superponen si el slot empieza antes de que termine el evento
      // Y termina después de que empieza el evento
      if (slotStart < end && slotEnd > start) {
        bookedTimes.add(slot);
      }
    });
  });

  return NextResponse.json({ booked: Array.from(bookedTimes) });
}
