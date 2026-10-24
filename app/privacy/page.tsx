import type { Metadata } from "next"

import { PageHeading, PageShell } from "@/components/page-shell"

export const metadata: Metadata = { title: "Privacy" }

const sections = [
  [
    "What we store",
    "The names and email addresses of the two people in a Treaty, the occasion, the amount, the chosen charities, and whether each person says they donated. We also keep anonymous step counts (for example, how many Treaties were accepted) and a one-way hash of your network address to limit abuse.",
  ],
  [
    "What we do not do",
    "We do not process payments, ask for card details, create accounts, send marketing email, or share your data. In this version we do not send email at all.",
  ],
  [
    "How access works",
    "A Treaty can only be opened with its short private link. We store only a hash of each link, and email addresses are never shown on any page. Treat your links like a password and share them only with the person concerned.",
  ],
  [
    "Charity websites",
    "When you click through to donate, you leave this site. The charity handles your payment and data under its own policy.",
  ],
]

export default function Page() {
  return (
    <PageShell>
      <PageHeading eyebrow="Trust" title="Your privacy, plainly explained" />
      <div className="flex flex-col gap-4">
        {sections.map(([title, body]) => (
          <section
            key={title}
            className="rounded-3xl border bg-card p-6 sm:p-8"
          >
            <h2 className="font-heading text-2xl font-semibold">{title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
