"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Newspaper } from "lucide-react";
import Link from "next/link";

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Gobernador Freyre 1059, Santa Fe, Argentina",
    link: "https://www.google.com/maps/place/Gobernador+Freyre+1059,+Santa+Fe/@-31.6347,-60.7055,17z",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+54 342 408-0329",
    link: "tel:+543424080329",
  },
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "slbetique@outlook.com",
    link: "mailto:slbetique@outlook.com",
  },
  {
    icon: Newspaper,
    label: "Newsletter",
    value: "Suscribite para recibir novedades y consejos contables",
    link: "https://www.instagram.com/channel/AbYqv9casTQc7jDK/",
  },
];

export function Contact() {
  return (
    <section id="contacto" className="py-24 bg-primary-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-base font-medium tracking-wide text-white uppercase">
            Contacto
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
            Hablemos de tu consulta
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-foreground flex flex-col">
            <span>
              Contáctanos por WhatsApp, correo electrónico o redes sociales.
            </span>
            <span>
              Suscribite al Newsletter para recibir novedades y consejos
              contables.
            </span>
            <span>¡Estamos para ayudarte a crecer!</span>
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Info cards */}
          <div className="flex flex-col gap-4">
            {INFO_ITEMS.map((item) => (
              <Link
                key={item.label}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{item.value}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Ubicacion de SB Estudio Contable"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.108!2d-60.7055!3d-31.6347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9a0a0a0a0a0%3A0x0!2sGobernador%20Freyre%201059%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1700000000000"
              width="100%"
              height="373,33"
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
