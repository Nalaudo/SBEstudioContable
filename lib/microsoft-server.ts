import { Client } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";

const clientId = process.env.MS_CLIENT_ID!;
const clientSecret = process.env.MS_CLIENT_SECRET!;
const tenantId = process.env.MS_TENANT_ID!; // 'common' para personal accounts, o tu tenant

async function getAccessToken() {
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    },
  );

  const data = await tokenResponse.json();
  if (!tokenResponse.ok)
    throw new Error(data.error_description || "Token failed");
  return data.access_token;
}

export const graphClient = async () => {
  const token = await getAccessToken();
  return Client.init({
    authProvider: (done) => done(null, token),
  });
};

export async function createOutlookCalendarEvent({
  email,
  date, // "2026-03-04"
  time, // "14:00"
}: {
  email: string;
  date: string;
  time: string;
}) {
  const client = await graphClient();

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const startDateTime = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const endDateTime = new Date(startDateTime);
  endDateTime.setUTCHours(endDateTime.getUTCHours() + 1);

  const event = {
    subject: `Consulta profesional con ${email}`,
    body: {
      contentType: "HTML",
      content: `Turno reservado para ${email} el ${date} a las ${time}.`,
    },
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [
      {
        emailAddress: { address: email, name: email },
        type: "required",
      },
    ],
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  try {
    const response = await client.api("/me/events").post(event); // O /users/{tu-email}/events si es app-only
    const meetLink = response.onlineMeeting?.joinUrl;

    console.log(
      `Evento creado en Outlook: ${response.id} | Teams Link: ${meetLink}`,
    );

    // Opcional: envía email custom como antes
    await sendConfirmationEmail({ to: email, date, time, meetLink });

    return meetLink;
  } catch (err: any) {
    console.error(
      "Error creando evento Outlook:",
      err.response?.data || err.message,
    );
    throw err;
  }
}

export async function sendConfirmationEmail({
  to,
  date, // "2026-03-04"
  time, // "14:00"
  meetLink, // joinUrl de Teams
}: {
  to: string;
  date: string;
  time: string;
  meetLink: string;
}) {
  const client = await graphClient();

  const message = {
    subject: `Tu turno confirmado - ${date} a las ${time} hs`,
    body: {
      contentType: "HTML",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0078d4;">¡Turno confirmado!</h2>
          <p>Hola,</p>
          <p>Tu consulta profesional ha sido reservada con éxito.</p>
          
          <div style="background: #f3f2f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <strong>Detalles del turno:</strong><br><br>
            <strong>Fecha:</strong> ${date}<br>
            <strong>Hora:</strong> ${time} hs<br>
            <strong>Reunión Teams:</strong> <a href="${meetLink}" style="color: #0078d4;">Ingresar a la reunión</a>
          </div>
          
          <p>Por favor, conectate unos minutos antes. Si tenés alguna duda, respondé este email.</p>
          <p>¡Te esperamos!</p>
          <p>Saludos,<br>Estudio Contable / Tu Nombre</p>
        </div>
      `,
    },
    toRecipients: [
      {
        emailAddress: {
          address: to,
        },
      },
    ],
    // Opcional: from (si querés que salga desde otra cuenta, usa /users/{from-email}/sendMail)
    // from: { emailAddress: { address: 'tu-cuenta@dominio.com' } },
  };

  try {
    // Enviar desde la cuenta principal (/me/sendMail) o desde una específica (/users/{email}/sendMail)
    // Usa /me si es delegated o la cuenta del token
    const response = await client.api("/me/sendMail").post({ message });

    console.log(`Email de confirmación enviado a ${to} - Response:`, response);

    return { success: true, messageId: response?.id };
  } catch (err: any) {
    console.error("Error enviando email con Microsoft Graph:", {
      message: err.message,
      response: err.response?.data || err,
    });
    // No tiramos error para no bloquear el webhook (el turno ya está creado)
    return { success: false, error: err.message };
  }
}
