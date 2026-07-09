export function Services() {
  const servicesData = [
    {
      title: "Asesoría Impositiva",
      icon: "fa-calculator",
      dataAos: "fade-down-right",
      dataAosDuration: "1500",
      items: [
        "Liquidación de Impuestos Anuales y Mensuales.",
        "Ganancias y Bienes Personales.",
        "IVA, Ingresos Brutos y Monotributo.",
        "Monitoreo de normativas nacionales y provinciales.",
      ],
    },
    {
      title: "Asesoría Laboral",
      icon: "fa-users",
      dataAos: "fade-down",
      dataAosDuration: "1500",
      items: [
        "Liquidación de sueldos y jornales integrales.",
        "Cargas Sociales y Declaraciones Juradas.",
        "Seguimiento exhaustivo de paritarias de convenios.",
        "Empleados de Comercio y Casas Particulares.",
      ],
    },
    {
      title: "Sector Agropecuario",
      icon: "fa-tractor",
      dataAos: "fade-down-left",
      dataAosDuration: "1500",
      items: [
        "Gestión contable y administrativa para el agro.",
        "Control de Cartas de Porte y regímenes de información.",
        "Seguimiento de mercados y evolución sectorial.",
        "Clasificación y gestión de hacienda.",
      ],
    },
    {
      title: "Gestión Societaria",
      icon: "fa-briefcase",
      dataAos: "fade-up-right",
      dataAosDuration: "1500",
      className: "lg:col-span-1 md:col-span-2", // Clases extra para el grid
      items: [
        "Constitución de Sociedades por Acciones Simplificadas (SAS).",
        "Estructuración corporativa e inscripciones legales.",
        "Asesoramiento a medida para nuevos emprendimientos.",
      ],
    },
    {
      title: "Soluciones Tecnológicas",
      icon: "fa-laptop-code",
      dataAos: "fade-up",
      dataAosDuration: "1500",
      className: "lg:col-span-2 md:col-span-2", // Clases extra para el grid
      items: [
        "Implementación y parametrización de Facturación Electrónica.",
        "Adecuación digital para profesionales y comercios.",
      ],
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
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
          {servicesData.map((service, index) => (
            <div
              data-aos={service.dataAos}
              data-aos-duration={service.dataAosDuration}
              key={index}
            >
              <div
                className={`h-full bg-background rounded-2xl p-8 lg:p-12 border border-white/5 relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group ${service.className || ""}`}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-emerald-500 opacity-80"></div>

                <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center mb-7">
                  <i
                    className={`fas ${service.icon} text-2xl text-blue-500`}
                  ></i>
                </div>

                <h3 className="text-2xl font-bold mb-5 text-slate-100">
                  {service.title}
                </h3>

                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-slate-400"
                    >
                      <i className="fas fa-check text-emerald-500 mt-1 text-sm"></i>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
