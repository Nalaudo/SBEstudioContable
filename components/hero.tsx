import Image from "next/image";

export function Hero() {
  return (
    <article
      id="inicio"
      className="relative pt-40 pb-25 md:pt-55 md:pb-22 bg-background"
    >
      <Image
        className="absolute sm:bottom-0 md:bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-15"
        src="/caduceo.svg"
        alt="Caduceo"
        width={800}
        height={800}
        priority
        fetchPriority="high"
        loading="eager"
      />
      <section>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-500 text-sm font-bold tracking-widest uppercase mb-6">
            Santa Fe & Región
          </span>
          <h1 className="text-4xl md:text-[3.5rem] font-extrabold leading-tight mb-6 tracking-tight text-slate-100">
            Soluciones Contables, Impositivas y Laborales{" "}
            <span className="bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Estratégicas
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-12 font-normal max-w-2xl mx-auto">
            Especialista en brindar soluciones integrales para empresas,
            productores agropecuarios, instituciones y profesionales. Con un
            fuerte enfoque centrado en la sinceridad, el compromiso y la
            eficiencia para potenciar tu crecimiento.
          </p>
          <a
            href="https://wa.me/5493424080329"
            target="_blank"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-linear-to-br from-blue-500 to-emerald-500 text-white font-bold rounded-xl text-lg shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            <i className="fab fa-whatsapp"></i> Consultar Ahora
          </a>
        </div>
      </section>
      <section className="relative z-20 pt-55">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-27.5 md:-mt-35">
          <div className="bg-surface border border-white/5 rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300">
            <div className="text-4xl mb-5 bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-wide text-slate-100">
              Asesoramiento Estratégico
            </h3>
            <p className="text-[0.95rem] text-slate-400">
              Planificación fiscal y financiera diseñada a la medida de los
              objetivos de tu negocio o actividad profesional.
            </p>
          </div>
          <div className="bg-surface border border-white/5 rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300">
            <div className="text-4xl mb-5 bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-wide text-slate-100">
              Sinceridad y Compromiso
            </h3>
            <p className="text-[0.95rem] text-slate-400">
              Garantizamos transparencia absoluta en cada proceso técnico y un
              acompañamiento continuo en tus obligaciones.
            </p>
          </div>
          <div className="bg-surface border border-white/5 rounded-2xl p-10 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-300">
            <div className="text-4xl mb-5 bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-wide text-slate-100">
              Soluciones Eficientes
            </h3>
            <p className="text-[0.95rem] text-slate-400">
              Optimización de procesos administrativos y digitales para que
              enfoques tu tiempo en lo que verdaderamente importa.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
