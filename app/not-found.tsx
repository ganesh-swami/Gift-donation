import Link from "next/link"

import { PageShell } from "@/components/page-shell"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <PageShell className="text-center">
      <p className="font-heading text-7xl font-semibold text-gold">404</p>
      <h1 className="mt-4 font-heading text-4xl font-semibold">
        We could not find that page
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        If you were following a Treaty link, check that you copied all of it.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-8 h-12 px-8 text-base"
        )}
      >
        Back to home
      </Link>
    </PageShell>
  )
}
