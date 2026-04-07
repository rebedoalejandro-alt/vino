import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Casa del Vino | Tu tienda de vinos online",
  description:
    "Descubre nuestra selección de vinos premium de las mejores bodegas de España. Envío gratis a partir de 150€. Compra vinos de calidad con garantía de satisfacción.",
  keywords:
    "vinos online, tienda de vinos, vinos españoles, bodega online, comprar vinos",
  authors: [{ name: "Casa del Vino" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.casadelvino.es"
  ),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.casadelvino.es",
    siteName: "Casa del Vino",
    title: "Casa del Vino | Tu tienda de vinos online",
    description:
      "Descubre nuestra selección de vinos premium de las mejores bodegas de España. Envío gratis a partir de 150€.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Casa del Vino - Tienda de Vinos Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa del Vino | Tu tienda de vinos online",
    description:
      "Descubre nuestra selección de vinos premium de las mejores bodegas de España.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://www.casadelvino.es",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5C518" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 font-sans`}>
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <Header />
          <Navigation />
        </div>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
