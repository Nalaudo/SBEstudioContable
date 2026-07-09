import type { Metadata, Viewport } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import AosInit from "@/components/ui/AosInit";

const montserrat = Montserrat({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SB Estudio Contable - Estudio contable en la ciudad de Santa Fe",
  description:
    "Estudio contable en Santa Fe, Argentina. Servicios de contabilidad, impuestos, liquidacion de sueldos y asesoria para empresas y monotributistas.",
  metadataBase: new URL("https://sbestudio.com.ar"),
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${montserrat.className} font-semibold font-sans antialiased`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <AosInit />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
