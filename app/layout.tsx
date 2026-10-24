import type { Metadata } from "next"
import { Geist_Mono, Outfit, Raleway } from "next/font/google"

import "./globals.css"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const ralewayHeading = Raleway({ subsets: ["latin"], variable: "--font-heading" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: { default: "Gift Treaty", template: "%s | Gift Treaty" },
  description:
    "Agree with someone not to buy each other gifts. Each donates what they would have spent to a charity the other chose.",
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
        ralewayHeading.variable
      )}
    >
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
