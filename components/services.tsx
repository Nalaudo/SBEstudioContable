import {
  Calculator,
  FileText,
  Users,
  Briefcase,
  Building2,
  ClipboardCheck,
} from "lucide-react";

const SERVICES = [
  {
    icon: Calculator,
    title: "Contabilidad",
    description:
      "Registros contables, balances e informes financieros para que tengas el control de tu empresa.",
  },
  {
    icon: FileText,
    title: "Impuestos - Régimen General",
    description:
      "Liquidación de impuestos nacionales, provinciales y municipales. IIBB, IVA, Ganancias y más.",
  },
  {
    icon: ClipboardCheck,
    title: "Monotributo",
    description:
      "Inscripciones, recategorizaciones, exclusiones y todo lo que necesites.",
  },
  {
    icon: Briefcase,
    title: "Asesoría",
    description:
      "Asesoramiento integral para la toma de decisiones y planificación fiscal.",
  },
  {
    icon: Building2,
    title: "Sociedades",
    description:
      "Constitución de sociedades, actas, rúbrica de libros y trámites ante IGJ.",
  },
  {
    icon: Users,
    title: "Sueldos",
    description:
      "Liquidación de haberes, cargas sociales, altas y bajas en ARCA.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-wide text-accent uppercase">
            Nuestros servicios
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            Todo lo que necesitás en un solo lugar
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Servicio integral y actualizado para personas particulares,
            monotributistas, profesionales y empresas.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
