import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Clients } from "@/components/clients";
import { Metadata } from "next";
import { Modalidad } from "@/components/modalidad";

export const metadata: Metadata = {
  alternates: {
    canonical: "./",
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Modalidad />
      <About />
      <Clients />
      <Contact />
      <Footer />
      <WhatsappFab />
    </main>
  );
}
