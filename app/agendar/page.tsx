import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

export const metadata = {
  title: "Agendar Consulta | SB Estudio Contable",
  description:
    "Agenda y paga tu consulta profesional con SB Estudio Contable en Santa Fe.",
}

export default function AgendarPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15">
              <span className="text-[10px] font-bold text-accent">SB</span>
            </div>
            <span className="font-serif text-sm text-foreground">
              SB Estudio
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium tracking-wider text-accent uppercase">
              Consulta profesional
            </p>
            <h1 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Agenda tu turno
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Selecciona fecha, horario y completa el pago para reservar tu
              consulta con nuestros profesionales.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </main>
  )
}
