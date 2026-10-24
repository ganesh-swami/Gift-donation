import type { Metadata, Viewport } from "next"
import { Fraunces, Geist_Mono, Outfit } from "next/font/google"

import "./globals.css"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: { default: "Gift Treaty", template: "%s | Gift Treaty" },
  description:
    "Agree with someone not to buy each other gifts. Each donates what they would have spent to a charity the other chose.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#10201a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        outfit.variable,
        heading.variable
      )}
    >
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
