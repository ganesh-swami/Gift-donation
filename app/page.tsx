import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { CHARITIES } from "@/lib/charities"
import { cn } from "@/lib/utils"

const steps = [
  ["Propose", "Pick an occasion, an amount, and a charity you would like them to support."],
  ["Agree", "They get a private link. They can accept, decline, or change the amount."],
  ["Give", "Each of you donates to the charity the other chose, then marks it done."],
]

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4 py-6">
        <h1 className="font-heading text-4xl leading-tight font-bold sm:text-5xl">
          Skip the gifts. Give to charity instead.
        </h1>
        <p className="text-lg text-muted-foreground">
          Unwanted presents waste time, money and fill landfills. Make a Gift
          Treaty: two people agree not to buy each other gifts, and each donates
          what they would have spent to a charity the other chose.
        </p>
        <div>
          <Link href="/create" className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}>
            Make a Treaty
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {steps.map(([title, body], i) => (
          <div key={title} className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">Step {i + 1}</div>
            <h2 className="font-heading text-xl font-semibold">{title}</h2>
            <p className="mt-1 text-sm">{body}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2 rounded-2xl bg-muted p-5 text-sm">
        <h2 className="font-heading text-xl font-semibold">Safe and simple</h2>
        <p>No accounts. No payments through us: you donate directly on the charity&apos;s own website. Treaties are only reachable through private links.</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">20 trusted charities to choose from</h2>
        <p className="text-sm text-muted-foreground">
          {CHARITIES.slice(0, 6).map((c) => c.name).join(", ")} and more.{" "}
          <Link href="/charities" className="underline">See the full list</Link>
        </p>
      </section>
    </div>
  )
}
