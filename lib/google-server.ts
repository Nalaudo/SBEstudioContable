// lib/google-server.ts (asumiendo que ya tienes esto configurado, si no, agrégalo)
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export const calendar = google.calendar({ version: "v3", auth });

// Función para crear el evento (nueva implementación)
export async function createGoogleCalendarEvent({
  email,
  date, // Esperamos "YYYY-MM-DD"
  time, // "14:00"
}: {
  email: string;
  date: string;
  time: string;
}) {
  // Parsear fecha base (asumimos UTC o local, pero la tratamos como local)
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  // Crear Date en timezone local (sin offset manual para evitar duplicados)
  const startLocal = new Date(year, month - 1, day, hour, minute, 0);
  const endLocal = new Date(startLocal);
  endLocal.setHours(endLocal.getHours() + 1);

  // Formato RFC3339 sin offset (timeZone lo maneja)
  const startDateTimeStr = startLocal.toISOString().replace(/\.\d{3}Z$/, ""); // quita .000Z
  const endDateTimeStr = endLocal.toISOString().replace(/\.\d{3}Z$/, "");

  const event = {
    summary: `Consulta profesional con ${email}`,
    description: `Turno reservado para ${email} el ${date} a las ${time}.`,
    start: {
      dateTime: startDateTimeStr, // ej: "2026-03-04T14:00:00"
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: endDateTimeStr, // ej: "2026-03-04T15:00:00"
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!, // tu ID real
      conferenceDataVersion: 1,
      requestBody: event,
    });

    const meetLink = response.data.hangoutLink;
    console.log(`Evento creado: ${response.data.htmlLink} | Meet: ${meetLink}`);
    return meetLink;
  } catch (err: any) {
    console.error("Google insert full error:", {
      message: err.message,
      response: err.response?.data,
      requestBody: event, // loguea el body enviado para debug
    });
    throw err;
  }
}

// Función auxiliar para envío de email (opcional, configúrala si es necesario)
async function sendConfirmationEmail(
  email: string,
  date: string,
  time: string,
  meetLink: string,
) {
  // Implementa con tu proveedor de email, ej. nodemailer
  // const transporter = nodemailer.createTransport({...});
  // await transporter.sendMail({...});
  console.log(`Email enviado a ${email} con link: ${meetLink}`);
}
