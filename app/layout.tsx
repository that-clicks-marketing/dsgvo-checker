import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSGVO Website Checker – Kostenloser Check für Ihre Website",
  description:
    "Prüfen Sie Ihre Website kostenlos auf DSGVO-Risiken: Cookie-Banner, Tracking-Scripts, Datenschutzerklärung, Impressum und mehr. Für kleine Unternehmen, Handwerker und lokale Dienstleister.",
  metadataBase: new URL("https://dsgvo-check.that-clicks.de"),
  openGraph: {
    title: "DSGVO Website Checker",
    description: "Kostenloser DSGVO-Schnellcheck für Ihre Website",
    url: "https://dsgvo-check.that-clicks.de",
    siteName: "DSGVO Checker – That Clicks Marketing",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
