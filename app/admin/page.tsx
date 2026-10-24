import { count } from "drizzle-orm"

import { PageHeading, PageShell } from "@/components/page-shell"
import { db, ensureSchema } from "@/lib/db"
import { events } from "@/lib/db/schema"

export const dynamic = "force-dynamic"

const FUNNEL = [
  "create_started",
  "treaty_created",
  "invite_shared",
  "invite_opened",
  "treaty_accepted",
  "charity_chosen",
  "donate_link_clicked",
  "donation_reported",
  "treaty_completed",
]

export default async function Page() {
  await ensureSchema()
  const rows = await db
    .select({ name: events.name, n: count() })
    .from(events)
    .groupBy(events.name)
  const byName = Object.fromEntries(rows.map((r) => [r.name, r.n]))
  const declined = byName["treaty_declined"] ?? 0

  return (
    <PageShell>
      <PageHeading title="Journey funnel" />
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Step</th>
            <th>Count</th>
            <th>vs previous</th>
          </tr>
        </thead>
        <tbody>
          {FUNNEL.map((name, i) => {
            const n = byName[name] ?? 0
            const prev = i > 0 ? (byName[FUNNEL[i - 1]] ?? 0) : 0
            return (
              <tr key={name} className="border-b">
                <td className="py-2">{name}</td>
                <td>{n}</td>
                <td>
                  {i > 0 && prev > 0 ? `${Math.round((n / prev) * 100)}%` : "-"}
                </td>
              </tr>
            )
          })}
          <tr>
            <td className="py-2">treaty_declined</td>
            <td>{declined}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </PageShell>
  )
}
