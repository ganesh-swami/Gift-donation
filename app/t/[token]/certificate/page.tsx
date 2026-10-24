import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { PageShell } from "@/components/page-shell"
import { getCharity } from "@/lib/charities"
import { formatMoney } from "@/lib/format"
import { occasionName } from "@/lib/occasions"
import { track } from "@/lib/track"
import { getTreatyByToken } from "@/lib/treaty"

import { PrintButton } from "./print-button"

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Certificate of Giving",
  robots: { index: false, follow: false },
}

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const t = await getTreatyByToken(token)
  if (!t) notFound()
  // Only people who have reported a donation get a certificate.
  if (!t.me.donatedAt || !t.me.donates) redirect(`/t/${token}`)

  await track("certificate_viewed", { treatyId: t.id, role: t.role })

  const charity = getCharity(t.other.charityId)
  const amount = formatMoney(t.agreedAmount ?? t.proposedAmount)
  const occasion = occasionName(t.occasion, t.occasionLabel)
  const date = new Date(t.me.donatedAt).toLocaleDateString("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  })
  const together = t.other.donates
    ? `alongside ${t.other.name}`
    : `in honour of ${t.other.name}`

  return (
    <PageShell width="max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href={`/t/${token}`}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Back to your Treaty
        </Link>
        <PrintButton />
      </div>

      <div className="rounded-[2rem] border-4 border-gold bg-card p-3 shadow-xl [print-color-adjust:exact] print:shadow-none">
        <div className="hero-glow rounded-[1.5rem] border border-gold/60 px-6 py-14 text-center sm:px-14">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Gift Treaty
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
            Certificate of Giving
          </h1>
          <div className="mx-auto my-6 h-px w-24 bg-gold" />
          <p className="text-muted-foreground">This certifies that</p>
          <p className="mt-3 font-heading text-4xl font-semibold italic sm:text-5xl">
            {t.me.name}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            chose generosity over a gift for{" "}
            <span className="font-medium">{occasion}</span>, and donated{" "}
            <span className="font-heading text-2xl font-semibold text-primary">
              {amount}
            </span>{" "}
            to{" "}
            <span className="font-medium">{charity?.name ?? "a charity"}</span>{" "}
            {together}.
          </p>
          <div className="mx-auto mt-10 flex max-w-md items-end justify-between gap-6 text-sm">
            <div className="flex-1 border-t border-foreground/30 pt-2">
              {date}
              <div className="text-xs text-muted-foreground">Date</div>
            </div>
            <div className="flex-1 border-t border-foreground/30 pt-2">
              Gift Treaty
              <div className="text-xs text-muted-foreground">Issued by</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Based on your own report of your donation. This certificate is issued by
        Gift Treaty and is not a receipt from the charity or valid for tax
        purposes.
      </p>
    </PageShell>
  )
}
