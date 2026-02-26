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
    <section id="nosotros" className="overflow-x-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-center lg:justify-between items-center gap-16 lg:grid-cols-2">
          <span className="text-sm font-medium tracking-wide text-accent uppercase">
            Sobre nosotros
          </span>
          {/* Text */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
              <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
                Tu estudio contable de confianza en Santa Fe
              </h2>

              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="mt-3 font-serif text-3xl text-foreground md:text-2xl">
                    ¿Quiénes somos?
                  </h3>
                  <p className="mt-1">
                    SB Estudio Contable es tu estudio contable de confianza en
                    Santa Fe.
                  </p>
                  <p>
                    Somos un espacio profesional dedicado a brindar
                    asesoramiento contable, laboral, impositivo y societario con
                    una mirada estratégica, ética y orientada a la toma de
                    decisiones inteligentes.
                  </p>
                  <p>
                    Desde Santa Fe acompañamos a empresas, emprendedores,
                    profesionales y clientes extranjeros que buscan claridad,
                    previsibilidad y comunicación transparente en cada paso del
                    proceso.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="mt-3 font-serif text-3xl text-foreground md:text-2xl">
                    Profesional a cargo
                  </h3>
                  <p className="mt-1">
                    El estudio está dirigido por Sergio Luis Betique, Contador
                    Público Nacional, matriculado en el Consejo Profesional de
                    Ciencias Económicas de la Provincia de Santa Fe - Cámara
                    Primera, desde mayo de 1998.
                  </p>
                  <p>
                    Con más de 28 años de experiencia, Sergio cuenta con una
                    sólida trayectoria en el acompañamiento integral de PyMEs y
                    profesionales, integrando normativa vigente, comparativas
                    interprovinciales y automatización de procesos para ofrecer
                    soluciones precisas y eficientes.
                  </p>
                </div>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm text-foreground text-left">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm w-37.5 h-37.5 border-2 hover:shadow-md hover:border-accent transition-all"
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
      </div>
    </section>
  );
}
