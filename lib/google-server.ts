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
  date, // puede llegar como "2026-03-04" o "2026-03-04T03:00:00.000Z"
  time, // "14:00"
}: {
  email: string;
  date: string;
  time: string;
}) {
  // Normalizar date a solo YYYY-MM-DD
  const dateOnly = date.split("T")[0]; // quita hora y Z si existen

  // Parsear componentes
  const [year, month, day] = dateOnly.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hour) ||
    isNaN(minute)
  ) {
    throw new Error(`Fecha u hora inválida: date=${date}, time=${time}`);
  }

  // Crear Date local (mes -1 porque JS Date usa 0-11)
  const startLocal = new Date(year, month - 1, day, hour, minute, 0);

  // Validar que no sea Invalid Date
  if (isNaN(startLocal.getTime())) {
    throw new Error(
      `No se pudo crear fecha válida a partir de ${date} ${time}`,
    );
  }

  const endLocal = new Date(startLocal);
  endLocal.setHours(endLocal.getHours() + 1);

  // Formato RFC3339 sin milisegundos ni Z (timeZone lo indica)
  function formatLocalDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    // ✅ No offset, no Z — timeZone field handles interpretation
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  const event = {
    summary: `Consulta profesional con ${email}`,
    description: `Turno reservado para ${email} el ${dateOnly} a las ${time}.`,
    start: {
      dateTime: formatLocalDateTime(startLocal), // "2026-03-06T13:00:00"
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: formatLocalDateTime(endLocal), // "2026-03-06T14:00:00"
      timeZone: "America/Argentina/Buenos_Aires",
    },
    // attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: "meet" },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "sbetique@gmail.com",
      conferenceDataVersion: 1,
      requestBody: event,
    });

    const meetLink = response.data.hangoutLink;
    console.log(
      `Evento creado OK - ID: ${response.data.id} | Meet: ${meetLink}`,
    );
    return meetLink;
  } catch (err: any) {
    console.error("Error al insertar en Google Calendar:", {
      message: err.message,
      response: err.response?.data,
      sentBody: event,
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
