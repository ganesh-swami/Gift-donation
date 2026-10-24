import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy" }

export default function Page() {
  return (
    <div className="flex max-w-prose flex-col gap-4 text-sm leading-relaxed">
      <h1 className="font-heading text-3xl font-bold">Privacy</h1>
      <p>
        <strong>What we store:</strong> the names and email addresses of the two
        people in a Treaty, the occasion, the amount, the chosen charities, and
        whether each person says they donated. We also keep anonymous step
        counts (for example, how many Treaties were accepted) and a one-way
        hash of your network address to limit abuse.
      </p>
      <p>
        <strong>What we do not do:</strong> we do not process payments, ask for
        card details, create accounts, send marketing email, or share your data.
        In this version we do not send email at all.
      </p>
      <p>
        <strong>Access:</strong> a Treaty can only be opened with its private
        link. We store only a hash of each link. Email addresses are never shown
        on any page. Keep your links private.
      </p>
      <p>
        <strong>Charity sites:</strong> when you click through to donate, you
        leave this site. The charity handles your payment and data under its own
        policy.
      </p>
    </div>
  )
}
