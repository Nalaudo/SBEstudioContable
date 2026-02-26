import { calendar } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

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
  });

  const bookedTimes =
    res.data.items?.map((e) => {
      const start = new Date(e.start?.dateTime!);
      return start.toTimeString().slice(0, 5); // "13:00"
    }) || [];

  return NextResponse.json({ booked: bookedTimes });
}
