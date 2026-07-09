export function About() {
  return (
    <section id="nosotros" className="py-24 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-8">
          <div className="mb-10" data-aos="fade-left" data-aos-duration="1500">
            <span className="inline-block px-4 py-1.5 bg-blue-500/15 border border-blue-500/30 rounded-full text-blue-500 text-sm font-bold tracking-widest uppercase mb-4">
              Sobre Nosotros
            </span>
            <h2 className="text-4xl md:text-[2.5rem] font-extrabold mb-5 text-slate-100 leading-tight">
              Tu estudio contable de confianza en{" "}
              <span className="bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                Santa Fe
              </span>
            </h2>
          </div>

          <div className="space-y-10">
            <div data-aos="fade-right" data-aos-duration="1500">
              <h3 className="text-2xl font-bold mb-4 text-slate-100 flex items-center gap-3">
                <i className="fas fa-info-circle text-emerald-500"></i> ¿Quiénes
                somos?
              </h3>
              <p className="text-slate-400 mb-4 text-lg leading-relaxed">
                <strong className="text-slate-200">SB Estudio Contable</strong>{" "}
                es tu estudio contable de confianza en Santa Fe. Somos un
                espacio profesional dedicado a brindar asesoramiento contable,
                laboral, impositivo y societario con una mirada estratégica,
                ética y orientada a la toma de decisiones inteligentes.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Desde Santa Fe acompañamos a empresas, emprendedores,
                profesionales y clientes extranjeros que buscan claridad,
                previsibilidad y comunicación transparente en cada paso del
                proceso.
              </p>
            </div>

            <div data-aos="fade-right" data-aos-duration="1500">
              <h3 className="text-2xl font-bold mb-4 text-slate-100 flex items-center gap-3">
                <i className="fas fa-user-tie text-blue-500"></i> Profesional a
                cargo
              </h3>
              <p className="text-slate-400 mb-4 text-lg leading-relaxed">
                El estudio está dirigido por{" "}
                <strong className="text-slate-200">Sergio Luis Betique</strong>,
                Contador Público Nacional, matriculado en el Consejo Profesional
                de Ciencias Económicas de la Provincia de Santa Fe - Cámara
                Primera, desde mayo de 1998.
              </p>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                Con más de 28 años de experiencia, Sergio cuenta con una sólida
                trayectoria en el acompañamiento integral de PyMEs y
                profesionales, integrando normativa vigente, comparativas
                interprovinciales y automatización de procesos para ofrecer
                soluciones precisas y eficientes.
              </p>
            </div>
            <div data-aos="fade-right" data-aos-duration="1500">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 text-slate-300 font-medium bg-background p-4 rounded-xl border border-white/5 transition-colors hover:border-emerald-500/30">
                  <i className="fas fa-check-circle text-emerald-500 text-lg"></i>
                  <span className="text-sm">
                    Atención personalizada en forma presencial y remota
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium bg-background p-4 rounded-xl border border-white/5 transition-colors hover:border-emerald-500/30">
                  <i className="fas fa-check-circle text-emerald-500 text-lg"></i>
                  <span className="text-sm">
                    Experiencia con monotributistas y PyMEs
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium bg-background p-4 rounded-xl border border-white/5 transition-colors hover:border-emerald-500/30">
                  <i className="fas fa-check-circle text-emerald-500 text-lg"></i>
                  <span className="text-sm">
                    Respuesta rápida y comunicación clara
                  </span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium bg-background p-4 rounded-xl border border-white/5 transition-colors hover:border-emerald-500/30">
                  <i className="fas fa-check-circle text-emerald-500 text-lg"></i>
                  <span className="text-sm">
                    Actualización constante en normativa vigente
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div
            data-aos="fade-down-left"
            data-aos-duration="1500"
            className="bg-background border border-white/5 rounded-3xl p-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -right-6 -top-6 text-emerald-500/5 text-8xl group-hover:text-emerald-500/10 transition-all duration-300">
              <i className="fas fa-users"></i>
            </div>
            <div className="text-5xl font-extrabold bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              +100
            </div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Clientes activos
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            className="bg-background border border-white/5 rounded-3xl p-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -right-6 -top-6 text-blue-500/5 text-8xl group-hover:text-blue-500/10 transition-all duration-300">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="text-5xl font-extrabold bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              +28
            </div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Años de experiencia
            </div>
          </div>

          <div
            data-aos="fade-up-left"
            data-aos-duration="1500"
            className="bg-background border border-white/5 rounded-3xl p-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -right-6 -top-6 text-emerald-500/5 text-8xl group-hover:text-emerald-500/10 transition-all duration-300">
              <i className="fas fa-handshake"></i>
            </div>
            <div className="text-5xl font-extrabold bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-sm">
              Compromiso
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
