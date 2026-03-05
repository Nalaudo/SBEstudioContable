import { calendar } from "@/lib/google-server";
import { NextRequest, NextResponse } from "next/server";

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

  const bookedTimes =
    res.data.items
      ?.map((e) => {
        if (!e.start?.dateTime) return null;
        const start = new Date(e.start.dateTime);

        // ✅ Extraer hora en timezone Argentina, no en UTC
        return start.toLocaleTimeString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      })
      .filter(Boolean) || [];
  return NextResponse.json({ booked: bookedTimes });
}
