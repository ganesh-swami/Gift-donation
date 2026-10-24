import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageShell } from "@/components/page-shell"
import { buttonVariants } from "@/components/ui/button"
import { getCharity } from "@/lib/charities"
import { formatMoney } from "@/lib/format"
import { occasionEmoji, occasionName } from "@/lib/occasions"
import { TOKEN_PATTERN } from "@/lib/tokens"
import { getTreatyByToken, type TreatyView } from "@/lib/treaty"
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
  pending: "Awaiting reply",
  accepted: "Agreed",
  declined: "Declined",
  completed: "Completed",
} as const

const STEPS = ["Proposed", "Agreed", "Donated", "Complete"]

function stepIndex(t: TreatyView) {
  if (t.status === "pending" || t.status === "declined") return 0
  if (t.status === "completed") return 3
  return t.me.donatedAt || t.other.donatedAt ? 2 : 1
}

function summary(t: TreatyView, amount: string) {
  if (t.me.donates && t.other.donates) {
    return `Instead of presents, each of you donates ${amount} to a charity the other chose.`
  }
  if (t.me.donates) {
    return `Instead of a gift, you donate ${amount} to a charity ${t.other.name} chooses.`
  }
  return `Instead of a gift, ${t.other.name} donates ${amount} to a charity you choose.`
}

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
  const occasion = occasionName(t.occasion, t.occasionLabel)
  // Where a person donates = the charity the OTHER person picked.
  const myCharity = getCharity(t.other.charityId)
  const theirCharity = getCharity(t.me.charityId)
  const showInvite =
    isCreator &&
    t.status === "pending" &&
    !!invite &&
    TOKEN_PATTERN.test(invite.toLowerCase())
  const step = stepIndex(t)
  const donorCount = Number(t.me.donates) + Number(t.other.donates)
  const certificateHref = `/t/${token}/certificate`

  const people = [
    {
      label: "You",
      who: t.me,
      charity: myCharity,
    },
    {
      label: "Them",
      who: t.other,
      charity: theirCharity,
    },
  ]

  return (
    <PageShell>
      {/* Hero card */}
      <div className="hero-glow overflow-hidden rounded-[2rem] border bg-card p-7 shadow-xl shadow-primary/5 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm tracking-wide text-muted-foreground uppercase">
            {occasionEmoji(t.occasion)} {occasion}
          </span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              t.status === "declined"
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
            )}
          >
            {STATUS_LABEL[t.status]}
          </span>
        </div>
        <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {isCreator
            ? `Your Treaty with ${t.other.name}`
            : `${t.other.name} invites you to skip the gifts`}
        </h1>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {summary(t, formatMoney(amount))}
        </p>
        {t.message && (
          <blockquote className="mt-5 border-l-2 border-gold pl-4 font-heading text-lg italic">
            &ldquo;{t.message}&rdquo;
            <footer className="mt-1 font-sans text-sm text-muted-foreground not-italic">
              {isCreator ? "Your note" : t.other.name}
            </footer>
          </blockquote>
        )}

        {t.status !== "declined" && (
          <ol className="mt-8 grid grid-cols-4 gap-2" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-col gap-2">
                <span
                  className={cn(
                    "h-1.5 rounded-full",
                    i <= step ? "bg-primary" : "bg-border"
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    i <= step
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {s}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Participants */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {people.map(({ label, who, charity }) => (
          <div key={label} className="rounded-3xl border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {who.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <div className="font-medium">{who.name}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
            <div className="my-4 h-px bg-border" />
            {who.donates ? (
              <>
                <div className="text-xs tracking-wide text-muted-foreground uppercase">
                  Donates
                </div>
                <div className="mt-1 font-heading text-2xl font-semibold">
                  {formatMoney(amount)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {charity
                    ? `to ${charity.name}`
                    : "to a charity yet to be chosen"}
                </div>
                {(t.status === "accepted" || t.status === "completed") && (
                  <div
                    className={cn(
                      "mt-4 w-fit rounded-full px-3 py-1 text-xs",
                      who.donatedAt
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {who.donatedAt ? "Donation reported" : "Not donated yet"}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-xs tracking-wide text-muted-foreground uppercase">
                  Celebrating
                </div>
                <div className="mt-1 font-heading text-2xl font-semibold">
                  Choosing the cause
                </div>
                <div className="text-sm text-muted-foreground">
                  Not donating in this Treaty
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {showInvite && (
          <ShareInvite
            token={token}
            invite={invite!}
            recipientName={t.other.name}
            creatorName={t.me.name}
          />
        )}
        {isCreator && t.status === "pending" && !showInvite && (
          <p className="rounded-2xl bg-muted p-4 text-sm">
            Waiting for {t.other.name} to reply. Your invite link was shown when
            you created this Treaty.
          </p>
        )}

        {!isCreator && t.status === "pending" && (
          <RespondForm
            token={token}
            creatorName={t.other.name}
            proposedDollars={t.proposedAmount / 100}
            needsCharity={t.other.donates}
            meDonates={t.me.donates}
          />
        )}

        {t.status === "accepted" && t.me.donates && myCharity && (
          <DonatePanel
            token={token}
            amountLabel={formatMoney(amount)}
            charityName={myCharity.name}
            donateUrl={myCharity.donateUrl}
            donated={!!t.me.donatedAt}
            certificateHref={certificateHref}
          />
        )}
        {t.status === "accepted" && !t.me.donates && (
          <p className="rounded-2xl bg-muted p-4 text-sm">
            {t.other.name} is donating to the charity you chose. You will see
            the outcome here once they have reported their donation.
          </p>
        )}

        {t.status === "completed" && (
          <div className="rounded-3xl bg-forest-deep p-8 text-center text-primary-foreground dark:text-foreground">
            <div className="text-4xl" aria-hidden>
              🎉
            </div>
            <h2 className="mt-3 font-heading text-3xl font-semibold">
              Treaty complete
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed opacity-80">
              {donorCount === 2
                ? `You and ${t.other.name} each gave ${formatMoney(amount)}, that is `
                : `${t.me.donates ? "You" : t.other.name} gave `}
              <span className="font-semibold text-gold">
                {formatMoney(amount * donorCount)}
              </span>{" "}
              to charity instead of gifts nobody needed. Thank you.
            </p>
            {t.me.donatedAt && (
              <Link
                href={certificateHref}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 h-12 bg-gold px-8 text-base text-forest-deep hover:bg-gold/85"
                )}
              >
                Get your certificate
              </Link>
            )}
          </div>
        )}

        {t.status === "declined" && (
          <p className="rounded-2xl bg-muted p-4 text-sm">
            {isCreator
              ? `${t.other.name} chose not to take part this time. No worries.`
              : "You declined this Treaty. No worries."}
          </p>
        )}

        {(t.status === "completed" || t.status === "declined") && (
          <div className="text-center">
            <Link
              href="/create?ref=treaty"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 text-base"
              )}
            >
              Make another Treaty
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  )
}
