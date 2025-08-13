import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import Script from "next/script" // Added Script import for proper external script loading
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
  title: "MediScan - AI-Powered Health Misinformation Detection",
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
        <Script
          src="https://widget.cxgenie.ai/widget.js"
          data-aid="cca37d5c-3bbf-4f8f-909d-e8f82cff603a"
          data-lang="en"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
