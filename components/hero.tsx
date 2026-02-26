import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-170 sm:min-h-215 md:min-h-237.5 items-center overflow-hidden pt-[100.17px] bg-primary"
    >
      <Image
        className="absolute sm:bottom-0 md:bottom-10 left-1/2 -translate-x-1/2 opacity-15"
        src="/caduceo.svg"
        alt="Caduceo"
        width={650}
        height={650}
        priority
        fetchPriority="high"
        loading="eager"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
        <span className="mb-6 inline-block rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/70 uppercase">
          Estudio contable en Santa Fe
        </span>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-4xl leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Soluciones contables y tributarias para vos
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          Nos encargamos de tus impuestos, contabilidad y asesoramiento para que
          puedas dedicarte a lo que realmente importa.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="#contacto">
              Contáctanos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link href="#servicios">Ver servicios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
