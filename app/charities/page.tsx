import type { Metadata } from "next"

import { PageHeading, PageShell } from "@/components/page-shell"
import { CHARITIES } from "@/lib/charities"

export const metadata: Metadata = { title: "Charities" }

export default function Page() {
  return (
    <PageShell width="max-w-6xl">
      <PageHeading
        eyebrow="Curated causes"
        title={`${CHARITIES.length} charities you can trust`}
      >
        Every Treaty donation goes to one of these. You give on each
        charity&apos;s own website, so the money never passes through us.
      </PageHeading>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHARITIES.map((c) => (
          <li
            key={c.id}
            className="flex flex-col gap-2 rounded-3xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="w-fit rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
              {c.cause}
            </span>
            <h2 className="font-heading text-xl font-semibold">{c.name}</h2>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {c.description}
            </p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-fit text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Visit website
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
