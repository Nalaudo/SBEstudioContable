import { google } from "googleapis";

// OAuth2 client using stored refresh token (works with personal Gmail ✅)
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "urn:ietf:wg:oauth:2.0:oob",
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
});

// Auto-refresh access token when it expires
oauth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    console.log("New refresh token issued:", tokens.refresh_token);
    // Optionally persist to DB/env if it rotates
  }
});

export const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function createGoogleCalendarEvent({
  email,
  date,
  time,
}: {
  email: string;
  date: string;
  time: string;
}) {
  const dateOnly = date.split("T")[0];
  const [year, month, day] = dateOnly.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hour) ||
    isNaN(minute)
  ) {
    throw new Error(`Invalid date or time: date=${date}, time=${time}`);
  }

  const startLocal = new Date(year, month - 1, day, hour, minute, 0);
  if (isNaN(startLocal.getTime())) {
    throw new Error(`Could not create valid date from ${date} ${time}`);
  }

  const endLocal = new Date(startLocal);
  endLocal.setHours(endLocal.getHours() + 1);

  // Plain local datetime string — no offset, no Z
  function formatLocalDateTime(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  const event = {
    summary: `Consulta profesional con ${email}`,
    description: `Turno reservado para ${email} el ${dateOnly} a las ${time}.`,
    start: {
      dateTime: formatLocalDateTime(startLocal),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: formatLocalDateTime(endLocal),
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
      calendarId: "primary", // ✅ use "primary" instead of hardcoded email
      conferenceDataVersion: 1,
      requestBody: event,
    });

    const meetLink = response.data.hangoutLink;
    console.log(`Event created - ID: ${response.data.id} | Meet: ${meetLink}`);
    return meetLink;
  } catch (err: any) {
    console.error("Error inserting Google Calendar event:", {
      message: err.message,
      response: err.response?.data,
      sentBody: event,
    });
    throw err;
  }
}
