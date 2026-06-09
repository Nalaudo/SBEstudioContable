export function Services() {
  return (
    <section id="servicios" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-[2.5rem] font-extrabold mb-5 text-slate-100">
            Nuestros{" "}
            <span className="bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Servicios Especializados
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Respuestas técnicas y normativas robustas ante las demandas fiscales
            y operativas actuales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>
            <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
              <i className="fas fa-calculator text-2xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-5 text-slate-100">
              Asesoría Impositiva
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Liquidación de Impuestos Anuales y Mensuales.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Ganancias y Bienes Personales.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                IVA, Ingresos Brutos y Monotributo.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Monitoreo de normativas nacionales y provinciales.
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>
            <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
              <i className="fas fa-users text-2xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-5 text-slate-100">
              Asesoría Laboral
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Liquidación de sueldos y jornales integrales.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Cargas Sociales y Declaraciones Juradas.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Seguimiento exhaustivo de paritarias de convenios.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Empleados de Comercio y Casas Particulares.
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>
            <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
              <i className="fas fa-tractor text-2xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-5 text-slate-100">
              Sector Agropecuario
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Gestión contable y administrativa para el agro.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Control de Cartas de Porte y regímenes de información.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Seguimiento de mercados y evolución sectorial.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Clasificación y gestión de hacienda.
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group lg:col-span-1 md:col-span-2">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>
            <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
              <i className="fas fa-briefcase text-2xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-5 text-slate-100">
              Gestión Societaria
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Constitución de Sociedades por Acciones Simplificadas (SAS).
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Estructuración corporativa e inscripciones legales.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Asesoramiento a medida para nuevos emprendimientos.
              </li>
            </ul>
          </div>

          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group lg:col-span-2 md:col-span-2">
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>
            <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
              <i className="fas fa-laptop-code text-2xl text-blue-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-5 text-slate-100">
              Soluciones Tecnológicas
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Implementación y parametrización de Facturación Electrónica.
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                Adecuación digital para profesionales y comercios.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
