import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Log inmediato - debe aparecer SIEMPRE si llega
  console.log("WEBHOOK MP LLEGÓ AL HANDLER -", new Date().toISOString());
  console.log("URL solicitada:", req.url);
  console.log("Method:", req.method);
  console.log("Content-Type header:", req.headers.get("content-type"));
  console.log("x-signature presente?", !!req.headers.get("x-signature"));

  let rawBody = "";
  try {
    rawBody = await req.text();
    console.log("Body recibido OK - longitud:", rawBody.length);
    console.log(
      "Body preview (primeros 200 chars):",
      rawBody.substring(0, 200),
    );
  } catch (readError) {
    console.error("Fallo al leer body:", readError);
  }

  // Respuesta ultra-simple y rápida - SIEMPRE 200
  return NextResponse.json(
    { received: true, debug: "test simplificado" },
    { status: 200 },
  );
}
