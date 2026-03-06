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
    calendarId: "primary",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const bookedTimes = new Set<string>();

  res.data.items?.forEach((e) => {
    if (!e.start?.dateTime || !e.end?.dateTime) return;

    const eventStart = new Date(e.start.dateTime);
    const eventEnd = new Date(e.end.dateTime);

    // Convertir start y end a minutos desde medianoche en Argentina
    const toARMinutes = (d: Date) => {
      const timeStr = d.toLocaleTimeString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const eventStartMin = toARMinutes(eventStart);
    const eventEndMin = toARMinutes(eventEnd);

    TIME_SLOTS.forEach((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotStartMin = h * 60 + m;
      const slotEndMin = slotStartMin + 60;

      // Bloquear si hay cualquier superposición
      if (slotStartMin < eventEndMin && slotEndMin > eventStartMin) {
        bookedTimes.add(slot);
      }
    });
  });

  return NextResponse.json({ booked: Array.from(bookedTimes) });
}
