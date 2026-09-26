import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ONGD SALAAM — Paix et développement au Nord-Ubangi",
  description:
    "Site officiel de l'ONGD SALAAM, organisation non gouvernementale de développement basée à Gbadolite (Nord-Ubangi, RDC), œuvrant pour la paix, la solidarité et le développement communautaire durable.",
  keywords: [
    "ONGD SALAAM",
    "ONG",
    "Nord-Ubangi",
    "Gbadolite",
    "RDC",
    "développement communautaire",
    "paix",
    "humanitaire",
  ],
  openGraph: {
    title: "ONGD SALAAM — Paix et développement au Nord-Ubangi",
    description:
      "Organisation non gouvernementale de développement œuvrant pour la paix et le développement communautaire à Gbadolite, Nord-Ubangi (RDC).",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0f6e5c",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
