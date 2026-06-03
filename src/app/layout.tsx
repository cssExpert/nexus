import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import ScanLine from "@/components/effects/ScanLine";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "NEXUS — Sound Without Boundaries",
  description:
    "AI-powered premium audio. 360° spatial sound, adaptive noise cancellation, 48h battery. Experience the future of listening.",
  keywords: [
    "NEXUS",
    "earbuds",
    "AI audio",
    "spatial sound",
    "premium headphones",
    "noise cancellation",
  ],
  openGraph: {
    title: "NEXUS — Sound Without Boundaries",
    description: "AI-powered premium audio. The future of listening.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-white font-body antialiased overflow-x-hidden">
        <ScanLine />
        {children}
      </body>
    </html>
  );
}
