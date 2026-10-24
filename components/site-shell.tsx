import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-heading text-lg font-semibold">
          Gift Treaty
        </Link>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/charities">Charities</Link>
          <Link href="/create" className="text-foreground">
            Make a Treaty
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-2 px-4 py-6 text-xs text-muted-foreground">
        <span>We never handle money. Donations go straight to the charity.</span>
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </div>
    </footer>
  )
}
