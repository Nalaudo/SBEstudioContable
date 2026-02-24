import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SB Estudio Contable | Servicios contables e impositivos en Santa Fe",
  description:
    "Estudio contable en Santa Fe, Argentina. Servicios de contabilidad, impuestos, liquidacion de sueldos y asesoria para empresas y monotributistas.",
};

export const viewport: Viewport = {
  themeColor: "#1a1f3d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-semibold font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
