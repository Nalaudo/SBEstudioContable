import { CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "Atención personalizada en forma presencial y remota",
  "Experiencia con monotributistas y PyMEs",
  "Respuesta rápida y comunicación clara",
  "Actualización constante en normativa vigente",
];

const STATS = [
  { value: "+100", label: "Clientes activos" },
  { value: "+28", label: "Años de experiencia" },
  { value: "100%", label: "Compromiso" },
];

export function About() {
  return (
    <section id="nosotros" className="bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div>
            <span className="text-sm font-medium tracking-wide text-accent uppercase">
              Sobre nosotros
            </span>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              Tu estudio contable de confianza en Santa Fe
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground text-justify">
              SB Estudio Contable es un espacio profesional dedicado a brindar
              asesoramiento contable, laboral, impositivo y societario con una
              mirada estratégica, ética y orientada a la toma de decisiones.
              Desde Santa Fe, acompañamos a empresas, emprendedores,
              profesionales y clientes extranjeros que necesitan claridad,
              previsibilidad y comunicación transparente en cada proceso. El
              estudio es dirigido por Sergio Luis Betique, Contador Público
              Nacional, matriculado en el Consejo Profesional de Ciencias
              Económicas de la Provincia de Santa Fe - Cámara Primera, desde
              mayo de 1998. Con más de dos décadas de trayectoria, Sergio cuenta
              con una sólida experiencia en el acompañamiento integral de pymes
              y profesionales, integrando normativa vigente, comparativas
              interprovinciales y automatización de procesos para ofrecer
              soluciones precisas y eficientes.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm"
              >
                <span className="font-serif text-3xl text-primary md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
