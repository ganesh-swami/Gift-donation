import type { Metadata } from "next"

import { CHARITIES } from "@/lib/charities"

export const metadata: Metadata = { title: "Charities" }

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Our 20 charities</h1>
        <p className="text-muted-foreground">
          A curated list. Donations are made on each charity&apos;s own site.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {CHARITIES.map((c) => (
          <li key={c.id} className="flex flex-col gap-1 rounded-2xl border p-4 text-sm">
            <span className="font-medium">{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.cause}</span>
            <span>{c.description}</span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-fit underline"
            >
              Visit website
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
