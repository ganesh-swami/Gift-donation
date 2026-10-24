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
    <div className="flex flex-col gap-3 rounded-2xl border p-4">
      <h2 className="font-heading text-xl font-semibold">
        Donate {amountLabel} to {charityName}
      </h2>
      {donated ? (
        <p className="text-sm">Thank you. You have marked your donation as done.</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            You donate on the charity&apos;s own website. We never touch the
            money. Come back and tell us once you have done it.
          </p>
          <div className="flex flex-wrap gap-2">
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
              className="inline-flex h-10 items-center rounded-4xl bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Open donation page
            </a>
            <form action={action}>
              <Button type="submit" variant="outline" size="lg" disabled={pending}>
                I have donated
              </Button>
            </form>
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        </>
      )}
    </div>
  )
}
