import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Clients } from "@/components/clients";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "./",
  },
};

export default function Home() {
  return (
    <main className="relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] z-1"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Clients />
      <Contact />
      <Footer />
      <WhatsappFab />
    </main>
  );
}
