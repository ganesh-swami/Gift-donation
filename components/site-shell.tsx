import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      </span>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Gift Treaty
      </span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="flex items-center gap-1 text-sm sm:gap-3">
          <Link
            href="/#how"
            className="hidden px-3 py-2 text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            How it works
          </Link>
          <Link
            href="/charities"
            className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Charities
          </Link>
          <Link
            href="/create"
            className={cn(buttonVariants({ size: "default" }), "px-4")}
          >
            Make a Treaty
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-primary-foreground dark:text-foreground print:hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo className="[&>span:first-child]:bg-gold [&>span:first-child]:text-forest-deep" />
          <p className="max-w-xs text-sm opacity-70">
            Give meaning instead of more stuff. A simple agreement between two
            people, and a better outcome for everyone else.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Explore</span>
          <Link href="/#how" className="opacity-70 hover:opacity-100">
            How it works
          </Link>
          <Link href="/charities" className="opacity-70 hover:opacity-100">
            Charities
          </Link>
          <Link href="/create" className="opacity-70 hover:opacity-100">
            Make a Treaty
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Trust</span>
          <Link href="/privacy" className="opacity-70 hover:opacity-100">
            Privacy
          </Link>
          <span className="opacity-70">We never handle your money.</span>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs opacity-60">
        Donations are made directly on each charity&apos;s own website.
      </div>
    </footer>
  )
}
