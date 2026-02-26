import Link from "next/link";
import { CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_MAP: Record<
  string,
  {
    icon: React.ElementType;
    title: string;
    description: string;
    iconClass: string;
  }
> = {
  approved: {
    icon: CheckCircle2,
    title: "Turno confirmado",
    description:
      "Tu pago fue aprobado. Te enviamos un email con los detalles de tu consulta. Nos vemos pronto.",
    iconClass: "text-accent",
  },
  pending: {
    icon: Clock,
    title: "Pago pendiente",
    description:
      "Tu pago esta siendo procesado. Te notificaremos por email cuando se confirme.",
    iconClass: "text-yellow-500",
  },
  rejected: {
    icon: XCircle,
    title: "Pago rechazado",
    description:
      "No pudimos procesar tu pago. Intenta nuevamente con otro medio de pago o contactanos por WhatsApp.",
    iconClass: "text-destructive",
  },
};

export const metadata = {
  title: "Resultado del pago | SB Estudio Contable",
};

export default function ResultadoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const statusRaw = searchParams.status;
  const status = Array.isArray(statusRaw)
    ? statusRaw[0]
    : statusRaw || "pending";
  const config = STATUS_MAP[status] || STATUS_MAP.pending;
  const Icon = config.icon;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card border border-border">
          <Icon className={`h-10 w-10 ${config.iconClass}`} />
        </div>

        <div>
          <h1 className="font-serif text-2xl text-foreground md:text-3xl">
            {config.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{config.description}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {status === "rejected" && (
            <Button
              asChild
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/agendar">Intentar de nuevo</Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
