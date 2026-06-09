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
    <section id="clientes" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-500 text-sm font-bold tracking-widest uppercase mb-4">
            Quienes confían en nosotros
          </span>
          <h2 className="text-4xl md:text-[2.5rem] font-extrabold mb-5 text-slate-100">
            Clientes que{" "}
            <span className="bg-gradient-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              nos eligen
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Trabajamos con personas particulares, profesionales, monotributistas
            y empresas de distintos rubros, construyendo relaciones de largo
            plazo basadas en la confianza y el compromiso.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-white/10 flex-1"></div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
              Clientes Actuales
            </h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-tools"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                AR-ZAP
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-seedling"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Agroganaderos Don Jose SRL
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-truck"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Daniel Faisal SA
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-broom"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Diaz Servicios SRL
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-box"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Don Mariano SRL
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-leaf"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Los 4 Cardos SAS
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-couch"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Norli Amoblamientos
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-tractor"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Sucesores de Gerardo R. Mehring SA
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-tint"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                THéZ SRL
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full md:w-auto md:min-w-[350px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i className="fas fa-shield-alt"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Asoc. Cooperadora Policial, Esperanza
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-white/10 flex-1"></div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
              Clientes Anteriores
            </h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 opacity-80">
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:opacity-100 transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-flask"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Lipomize SRL
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:opacity-100 transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-globe"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Colegio Traductores, Santa Fe
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:opacity-100 transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-plane"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Taller Aeronáutico Santo Tomé
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:opacity-100 transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-car"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Sattler SA
              </span>
            </div>
            <div className="bg-surface border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:opacity-100 transition-all duration-300 w-full md:w-auto md:min-w-[260px]">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i className="fas fa-car"></i>
              </div>
              <span className="text-slate-300 font-semibold text-sm">
                Sattler Hermanos SA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
