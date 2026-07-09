export function Contact() {
  const contactData = [
    {
      icon: "fa-map-marker-alt",
      dataAos: "fade-right",
      dataAosDuration: "1500",
      title: "Dirección",
      content: "Gdor. Freyre 1059 - Santa Fe",
    },
    {
      icon: "fa-phone-alt",
      dataAos: "fade-right",
      dataAosDuration: "1500",
      title: "Teléfono / WhatsApp",
      content: "+54 9 342 4080329",
    },
    {
      icon: "fa-envelope",
      dataAos: "fade-right",
      dataAosDuration: "1500",
      title: "Correos Electrónicos",
      // Pasamos JSX para respetar el salto de línea original
      content: (
        <>
          slbetique@outlook.com
          <br />
          sbetique@gmail.com
        </>
      ),
      // Clases específicas que tenía el texto de los emails
      textClassName: "text-[0.95rem] leading-tight",
    },
    {
      icon: "fa-globe",
      dataAos: "fade-right",
      dataAosDuration: "1500",
      title: "Sitio Web",
      content: "www.sbestudio.com.ar",
    },
  ];

  return (
    <section id="contacto" className="py-24 border-t border-white/5 bg-surface">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h3
            data-aos="fade-left"
            data-aos-duration="1500"
            className="text-4xl font-extrabold mb-8 text-slate-100"
          >
            Contacto{" "}
            <span className="bg-linear-to-br from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Inmediato
            </span>
          </h3>
          <ul className="space-y-7">
            {contactData.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-6 bg-background p-5 rounded-2xl border border-white/5 shadow-md"
                data-aos={item.dataAos}
                data-aos-duration={item.dataAosDuration}
              >
                <i
                  className={`fas ${item.icon} text-3xl text-emerald-500 w-8 text-center`}
                ></i>

                <div>
                  <h4 className="text-[0.85rem] uppercase tracking-wider text-slate-400 mb-1">
                    {item.title}
                  </h4>

                  {/* Si el ítem tiene textClassName la usa, sino aplica 'text-lg' por defecto */}
                  <p
                    className={`font-semibold text-slate-100 ${item.textClassName || "text-lg"}`}
                  >
                    {item.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="flex flex-col items-center justify-center bg-surface p-10 md:p-12 rounded-[28px] border border-blue-500/20 text-center shadow-[0_25px_60px_rgba(0,0,0,0.4)] max-w-lg mx-auto w-full"
        >
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Ubicacion de SB Estudio Contable"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.108!2d-60.7055!3d-31.6347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9a0a0a0a0a0%3A0x0!2sGobernador%20Freyre%201059%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1700000000000"
              width="400"
              height="373.33"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
