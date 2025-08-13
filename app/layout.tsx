import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "MediScan - AI-Powered Health Misinformation Detection", // Already updated to MediScan
  description:
    "Fight health misinformation with AI-powered verification. Get instant analysis of health claims with trusted medical sources.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable} antialiased`}>
      <body>
        <AuthProvider>
          <Navigation />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
