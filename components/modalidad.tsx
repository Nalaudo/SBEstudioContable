export function Modalidad() {
  return (
    <section id="modalidad" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="text-center mb-20"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <h2 className="text-4xl md:text-[2.5rem] font-extrabold mb-5 text-slate-100">
            Modalidad de{" "}
            <span className="bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Atención Adaptable
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Diseñamos canales de comunicación ágiles que se acomodan a tus
            tiempos y preferencias geográficas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="bg-surface border border-white/5 border-t-4 border-t-blue-500 rounded-3xl p-10 md:p-14 text-center relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-500 rounded-full text-sm font-bold uppercase tracking-wider text-white">
              Servicio Remoto
            </span>
            <div className="text-6xl text-blue-500 mb-7 mt-2">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="text-3xl font-bold mb-5 text-slate-100">
              Asesoría Digital
            </h3>
            <p className="text-lg text-slate-400">
              Atención remota eficiente, fluida y con la máxima rapidez técnica
              para empresas, instituciones y profesionales desde cualquier punto
              del país.
            </p>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            className="bg-surface border border-white/5 border-t-4 border-t-emerald-500 rounded-3xl p-10 md:p-14 text-center relative shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-emerald-500 rounded-full text-sm font-bold uppercase tracking-wider text-white">
              Servicio Presencial
            </span>
            <div className="text-6xl text-emerald-500 mb-7 mt-2">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="text-3xl font-bold mb-5 text-slate-100">
              Atención en Oficina
            </h3>
            <p className="text-lg text-slate-400">
              Reuniones personalizadas y de trato directo en nuestras oficinas
              ubicadas estratégicamente en la ciudad de Santa Fe para coordinar
              tus proyectos cara a cara.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
