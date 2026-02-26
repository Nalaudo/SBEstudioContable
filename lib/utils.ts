import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { google } from "googleapis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const auth = new google.auth.GoogleAuth({
  keyFile:
    process.env.GOOGLE_SERVICE_ACCOUNT_PATH || "./google-service-account.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export const calendar = google.calendar({ version: "v3", auth });

export async function createGoogleCalendarEvent({
  email,
  date,
  time,
}: {
  email: string;
  date: string;
  time: string;
}) {
  const startDateTime = new Date(`${date}T${time}:00-03:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hora de duración, ajustá

  const event = {
    summary: `Consulta Profesional - ${email}`,
    description: `Turno pagado. Email: ${email}\nHorario: ${time} hs`,
    start: { dateTime: startDateTime.toISOString() },
    end: { dateTime: endDateTime.toISOString() },
    attendees: [{ email }],
    reminders: { useDefault: true },
  };

  await calendar.events.insert({
    calendarId: "primary", // o el ID de tu calendario dedicado
    requestBody: event,
  });

  console.log("Turno agendado en Google Calendar");
}
