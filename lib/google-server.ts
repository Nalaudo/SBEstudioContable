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
  date,
  time,
}: {
  email: string;
  date: string; // Formato YYYY-MM-DD
  time: string; // Formato HH:MM
}) {
  // Construir las fechas de inicio y fin (asumiendo turnos de 1 hora y timezone Argentina)
  const startDateTime = new Date(`${date}T${time}:00-03:00`);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + 1);

  // Definir el evento
  const event = {
    summary: `Consulta profesional con ${email}`,
    description: `Turno reservado para ${email} el ${date} a las ${time}.`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [
      { email }, // Agregar al usuario como attendee (recibirá invitación por email automáticamente si el calendario lo permite)
    ],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).substring(2)}`, // ID único para la solicitud
        conferenceSolutionKey: {
          type: "hangoutsMeet", // Crea una reunión en Google Meet
        },
      },
    },
  };

  // Insertar el evento en el calendario
  const response = await calendar.events.insert({
    calendarId: "primary", // Calendario principal
    conferenceDataVersion: 1, // Requerido para crear conferencias
    requestBody: event,
  });

  const meetLink = response.data.hangoutLink;
  console.log(`Evento creado: ${response.data.htmlLink}`);
  console.log(`Link de Google Meet: ${meetLink}`);

  // Opcional: Aquí podrías integrar envío de email con el meetLink (ej. usando nodemailer o SendGrid)
  // Por ahora, solo lo agendamos y logueamos. Si necesitas enviar email, agrega lógica aquí.
  // Ejemplo básico (requiere configurar nodemailer):
  // await sendConfirmationEmail(email, date, time, meetLink);

  return meetLink; // Retorna el link por si lo necesitas en otro lugar
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
