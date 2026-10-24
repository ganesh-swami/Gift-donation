"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

function track(token: string, meta: string) {
  void fetch("/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "invite_shared", token, meta }),
    keepalive: true,
  })
}

export function ShareInvite({
  token,
  invite,
  recipientName,
  creatorName,
}: {
  token: string
  invite: string
  recipientName: string
  creatorName: string
}) {
  const [copied, setCopied] = useState<"invite" | "mine" | null>(null)
  const origin = typeof window === "undefined" ? "" : window.location.origin
  const inviteUrl = `${origin}/t/${invite}`
  const myUrl = `${origin}/t/${token}`
  const text = `Hi ${recipientName}, ${creatorName} suggests we skip gifts and donate to charity instead. Take a look: ${inviteUrl}`

  async function copy(which: "invite" | "mine") {
    await navigator.clipboard.writeText(which === "invite" ? inviteUrl : myUrl)
    setCopied(which)
    if (which === "invite") track(token, "copy")
  }

  async function share() {
    try {
      await navigator.share({ text, url: inviteUrl })
      track(token, "share")
    } catch {
      // user cancelled
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-4">
      <div>
        <h2 className="font-heading text-xl font-semibold">
          Send the invitation to {recipientName}
        </h2>
        <p className="text-sm text-muted-foreground">
          We do not send email in this version. Share this private link yourself.
        </p>
      </div>
      <input
        readOnly
        value={inviteUrl}
        onFocus={(e) => e.currentTarget.select()}
        aria-label="Invitation link"
        className="w-full rounded-lg border bg-muted px-3 py-2 text-xs"
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => copy("invite")}>
          {copied === "invite" ? "Copied" : "Copy invite link"}
        </Button>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Button variant="outline" onClick={share}>
            Share...
          </Button>
        )}
        <a
          className="inline-flex h-9 items-center rounded-4xl border px-3 text-sm"
          href={`https://wa.me/?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(token, "whatsapp")}
        >
          WhatsApp
        </a>
        <a
          className="inline-flex h-9 items-center rounded-4xl border px-3 text-sm"
          href={`mailto:?subject=${encodeURIComponent("A gift-free idea")}&body=${encodeURIComponent(text)}`}
          onClick={() => track(token, "mailto")}
        >
          Email
        </a>
      </div>
      <div className="rounded-lg bg-muted p-3 text-sm">
        <strong>Save your own link.</strong> It is the only way back to this
        Treaty, and the invite link above is shown only now.
        <div className="mt-2">
          <Button size="sm" variant="secondary" onClick={() => copy("mine")}>
            {copied === "mine" ? "Copied" : "Copy my link"}
          </Button>
        </div>
      </div>
    </div>
  )
}
