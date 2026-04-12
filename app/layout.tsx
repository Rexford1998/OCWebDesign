import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Rexford Ray - Web Development Portfolio",
  description:
    "Professional web development services in Orange County by Rexford Ray. Cutting-edge websites, mobile apps, Reddit game dev, Roblox games, and transparent pricing.",
  keywords: [
    "Rexford Ray",
    "Rex Orange County web developer",
    "Orange County web development",
    "mobile app development",
    "SwiftUI developer",
    "Reddit game development",
    "Roblox game development",
    "web development pricing",
    "SEO web developer",
    "California software developer",
  ],
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <Analytics />
        <Script
          defer
          data-domain="ocwebdesign.tech"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
          }}
        />
      </body>
    </html>
  )
}
