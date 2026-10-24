"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"

import { reportDonationAction, type ActionState } from "../actions"

export function DonatePanel({
  token,
  amountLabel,
  charityName,
  donateUrl,
  donated,
}: {
  token: string
  amountLabel: string
  charityName: string
  donateUrl: string
  donated: boolean
}) {
  const [state, action, pending] = useActionState<ActionState>(
    reportDonationAction.bind(null, token),
    {}
  )

  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="font-heading text-2xl font-semibold">
        Donate {amountLabel} to {charityName}
      </h2>
      {donated ? (
        <p className="rounded-2xl bg-primary/10 p-4 text-sm text-primary">
          Thank you. You have marked your donation as done. We will show the
          outcome once the other person has done the same.
        </p>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You donate on the charity&apos;s own website, and we never touch the
            money. Come back and tell us once you have done it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                void fetch("/api/track", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ name: "donate_link_clicked", token }),
                  keepalive: true,
                })
              }
              className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Open donation page
            </a>
            <form action={action}>
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
                disabled={pending}
              >
                I have donated
              </Button>
            </form>
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
        </>
      )}
    </div>
  )
}
