import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getCharity } from "@/lib/charities"
import { formatMoney } from "@/lib/format"
import { getTreatyByToken } from "@/lib/treaty"
import { cn } from "@/lib/utils"

import { DonatePanel } from "./_components/donate-panel"
import { RespondForm } from "./_components/respond-form"
import { ShareInvite } from "./_components/share-invite"

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Your Treaty",
  robots: { index: false, follow: false },
}

const STATUS_LABEL = {
  pending: "Waiting for a reply",
  accepted: "Agreed",
  declined: "Declined",
  completed: "Completed",
} as const

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ invite?: string }>
}) {
  const { token } = await params
  const { invite } = await searchParams
  const t = await getTreatyByToken(token)
  if (!t) notFound()

  const isCreator = t.role === "creator"
  const amount = t.agreedAmount ?? t.proposedAmount
  const occasion = t.occasionLabel || t.occasion
  // Where I donate = the charity the OTHER person picked.
  const myCharity = getCharity(t.other.charityId)
  const theirCharity = getCharity(t.me.charityId)
  const showInvite =
    isCreator && t.status === "pending" && invite && /^[A-Za-z0-9_-]{20,64}$/.test(invite)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          {STATUS_LABEL[t.status]}
        </Badge>
        <h1 className="font-heading text-3xl font-bold">
          {isCreator
            ? `Your Treaty with ${t.other.name}`
            : `${t.other.name} invites you to skip gifts`}
        </h1>
        <p className="text-muted-foreground">
          For: {occasion}. Instead of presents, each donates{" "}
          {formatMoney(amount)} to a charity the other chose.
        </p>
        {t.message && (
          <blockquote className="border-l-4 pl-3 text-sm italic">
            {t.message}
          </blockquote>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { who: t.me, label: "You", charity: myCharity },
          { who: t.other, label: t.other.name, charity: theirCharity },
        ].map(({ who, label, charity }, i) => (
          <div key={i} className="rounded-2xl border p-4 text-sm">
            <div className="font-medium">{i === 0 ? `You (${who.name})` : label}</div>
            <div className="text-muted-foreground">
              {t.status === "pending" && !charity
                ? "Charity to be chosen"
                : charity
                  ? `Donates ${formatMoney(amount)} to ${charity.name}`
                  : "Charity to be chosen"}
            </div>
            {(t.status === "accepted" || t.status === "completed") && (
              <div className="mt-1">
                {who.donatedAt ? "Donation reported" : "Not donated yet"}
              </div>
            )}
          </div>
        ))}
      </div>

      {showInvite && (
        <ShareInvite
          token={token}
          invite={invite}
          recipientName={t.other.name}
          creatorName={t.me.name}
        />
      )}
      {isCreator && t.status === "pending" && !showInvite && (
        <p className="rounded-lg bg-muted p-3 text-sm">
          Waiting for {t.other.name} to reply. Your invite link was shown when
          you created this Treaty.
        </p>
      )}

      {!isCreator && t.status === "pending" && (
        <RespondForm
          token={token}
          creatorName={t.other.name}
          proposedDollars={t.proposedAmount / 100}
        />
      )}

      {t.status === "accepted" && myCharity && (
        <DonatePanel
          token={token}
          amountLabel={formatMoney(amount)}
          charityName={myCharity.name}
          donateUrl={myCharity.donateUrl}
          donated={!!t.me.donatedAt}
        />
      )}

      {t.status === "completed" && (
        <div className="flex flex-col gap-3 rounded-2xl bg-muted p-5">
          <h2 className="font-heading text-xl font-semibold">Treaty complete</h2>
          <p>
            You and {t.other.name} each gave {formatMoney(amount)}, that is{" "}
            {formatMoney(amount * 2)} to charity instead of two gifts nobody
            needed. Thank you.
          </p>
        </div>
      )}

      {t.status === "declined" && (
        <p className="rounded-lg bg-muted p-3 text-sm">
          {isCreator
            ? `${t.other.name} chose not to take part this time. No worries.`
            : "You declined this Treaty. No worries."}
        </p>
      )}

      {(t.status === "completed" || t.status === "declined") && (
        <div>
          <Link
            href="/create?ref=treaty"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Make another Treaty
          </Link>
        </div>
      )}
    </div>
  )
}
