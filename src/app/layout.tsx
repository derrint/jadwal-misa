import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jadwal Misa Indonesia",
  description: "Direktori jadwal misa Katolik seluruh Indonesia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body className={`min-h-screen ${plusJakarta.className}`}>{children}</body>
    </html>
  )
}
