import {
  Wheat,
  ShoppingBag,
  GraduationCap,
  BrushCleaning,
  CarFront,
  Car,
  RockingChair,
  Pipette,
  Atom,
  DoorClosed,
  Siren,
  Globe,
  Plane,
} from "lucide-react";

const CURRENT_CLIENTS = [
  { name: "AR-ZAP", icon: BrushCleaning },
  { name: "Agroganaderos Don Jose SRL", icon: Wheat },
  { name: "Daniel Faisal SA", icon: Car },
  { name: "Diaz Servicios SRL", icon: BrushCleaning },
  { name: "Don Mariano SRL", icon: ShoppingBag },
  { name: "Los 4 Cardos SAS", icon: GraduationCap },
  { name: "Norli Amoblamientos", icon: DoorClosed },
  { name: "Sucesores de Gerardo R. Mehring SA", icon: RockingChair },
  { name: "THéZ SRL", icon: Pipette },
  { name: "Asociación Cooperadora Policial, Esperanza, Santa Fe", icon: Siren },
];

const PAST_CLIENTS = [
  { name: "Lipomize SRL", icon: Atom },
  { name: "Colegio Traductores, Provincia de Santa Fe", icon: Globe },
  { name: "Taller Aeronáutico Santo Tomé", icon: Plane },
  { name: "Sattler SA", icon: CarFront },
  { name: "Sattler Hermanos SA", icon: CarFront },
];

function ClientCard({
  name,
  icon: Icon,
  className = "",
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={`group flex flex-col md:flex-row items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 ${className}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-foreground text-center md:text-left">
        {name}
      </span>
    </div>
  );
}

export function Clients() {
  return (
    <section id="clientes" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Quienes confian en nosotros
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            Clientes que nos eligen
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-foreground">
            Trabajamos con personas particulares, profesionales, monotributistas
            y empresas de distintos rubros, construyendo relaciones de largo
            plazo basadas en la confianza y el compromiso.
          </p>
        </div>

        {/* Current clients */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-xs font-semibold tracking-widest text-foreground uppercase">
            Clientes actuales
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-6 ">
            {CURRENT_CLIENTS.map((client) => (
              <ClientCard
                key={client.name}
                name={client.name}
                icon={client.icon}
                className="lg:w-64 lg:shrink-0 h-fit"
              />
            ))}
          </div>
        </div>

        {/* Past clients */}
        <div className="mt-14">
          <h3 className="mb-6 text-center text-xs font-semibold tracking-widest text-foreground uppercase">
            Clientes anteriores
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-6 ">
            {PAST_CLIENTS.map((client) => (
              <ClientCard
                key={client.name}
                name={client.name}
                icon={client.icon}
                className="lg:w-64 lg:shrink-0 h-fit"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
