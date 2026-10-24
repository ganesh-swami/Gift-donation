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

const linkBtn =
  "inline-flex h-10 items-center rounded-full border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"

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
    <div className="flex flex-col gap-5 rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold">
          Send the invitation to {recipientName}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We do not send email in this version. Share this short private link
          yourself.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-2xl border bg-muted p-1.5 pl-4">
        <input
          readOnly
          value={inviteUrl}
          onFocus={(e) => e.currentTarget.select()}
          aria-label="Invitation link"
          className="min-w-0 flex-1 bg-transparent font-mono text-sm outline-none"
        />
        <Button onClick={() => copy("invite")} className="shrink-0">
          {copied === "invite" ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button type="button" className={linkBtn} onClick={share}>
            Share...
          </button>
        )}
        <a
          className={linkBtn}
          href={`https://wa.me/?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(token, "whatsapp")}
        >
          WhatsApp
        </a>
        <a
          className={linkBtn}
          href={`mailto:?subject=${encodeURIComponent("A gift-free idea")}&body=${encodeURIComponent(text)}`}
          onClick={() => track(token, "mailto")}
        >
          Email
        </a>
      </div>
      <div className="rounded-2xl bg-accent/40 p-4 text-sm">
        <strong>Save your own link.</strong> It is the only way back to this
        Treaty, and the invite link above is shown only now.
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary" onClick={() => copy("mine")}>
            {copied === "mine" ? "Copied" : "Copy my link"}
          </Button>
          <span className="font-mono text-xs text-muted-foreground">
            {myUrl}
          </span>
        </div>
      </div>
    </div>
  )
}
