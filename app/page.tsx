import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { CHARITIES } from "@/lib/charities"
import { OCCASION_META } from "@/lib/occasions"
import { cn } from "@/lib/utils"

const steps = [
  {
    n: "01",
    title: "Propose",
    body: "Choose the occasion and an amount, and pick a charity you would love them to support.",
  },
  {
    n: "02",
    title: "Agree",
    body: "They open a private link. They can accept, decline, or adjust the amount and choose a cause for you.",
  },
  {
    n: "03",
    title: "Give",
    body: "Each of you donates on the charity's own website, then marks it done. That is the whole Treaty.",
  },
]

const pillars = [
  [
    "No accounts",
    "No sign-ups or passwords. Each Treaty lives behind a private link.",
  ],
  [
    "We never touch money",
    "You donate directly to the charity. Nothing passes through us.",
  ],
  [
    "Private by design",
    "Names only on the page. Email addresses are never displayed.",
  ],
  ["Free to use", "No fees, no upsell. Just a better way to mark an occasion."],
]

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden border-b">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)] opacity-40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border bg-card/70 px-3.5 py-1 text-xs tracking-wide text-muted-foreground uppercase">
              A kinder way to celebrate
            </span>
            <h1 className="font-heading text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              The best gift is the one that{" "}
              <span className="text-primary italic">matters.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Unwanted presents waste time, money and fill landfills. Make a
              Gift Treaty: two people agree to skip the gifts, and each donates
              what they would have spent to a charity the other chose.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/create"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-7 text-base"
                )}
              >
                Make a Treaty
              </Link>
              <Link
                href="#how"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 px-7 text-base"
                )}
              >
                How it works
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Free. No account needed. Takes about two minutes.
            </p>
          </div>

          {/* Treaty preview card */}
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-gold/30 blur-sm" />
            <div className="relative rounded-[1.75rem] border bg-card p-6 shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between text-xs tracking-wide text-muted-foreground uppercase">
                <span>Gift Treaty</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary normal-case">
                  Agreed
                </span>
              </div>
              <h2 className="mt-4 font-heading text-2xl font-semibold">
                Asha &amp; Ben
              </h2>
              <p className="text-sm text-muted-foreground">
                {OCCASION_META.birthday.emoji} Birthday, instead of presents
              </p>
              <div className="my-5 h-px bg-border" />
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Asha gives $25 to
                  </span>
                  <span className="font-medium">UNICEF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Ben gives $25 to
                  </span>
                  <span className="font-medium">charity: water</span>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-muted p-3 text-center text-sm">
                <span className="font-heading text-xl font-semibold text-primary">
                  $50
                </span>{" "}
                to causes that matter
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm tracking-wide text-primary uppercase">
            Why a Treaty
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
            Nobody wants to be the first to say &ldquo;let us skip gifts.&rdquo;
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            It can feel awkward or even rude. A Treaty gives you both
            permission, at the same moment, so nobody is embarrassed and nobody
            is left holding an unwanted gift.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 border-y bg-muted/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm tracking-wide text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight">
            Three simple steps, one thoughtful outcome.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border bg-card p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="font-heading text-4xl font-semibold text-gold">
                  {s.n}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {Object.values(OCCASION_META).map((o) => (
              <span
                key={o.label}
                className="rounded-full border bg-card px-4 py-1.5 text-sm"
              >
                {o.emoji} {o.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([title, body]) => (
            <div key={title} className="border-t-2 border-gold pt-4">
              <h3 className="font-heading text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Charities */}
      <section className="bg-forest-deep text-primary-foreground dark:text-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm tracking-wide text-gold uppercase">
            Curated causes
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight">
            {CHARITIES.length} trusted charities, one for every heart.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {CHARITIES.map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm"
              >
                {c.name}
              </span>
            ))}
          </div>
          <Link
            href="/charities"
            className="mt-8 inline-block text-sm text-gold underline underline-offset-4"
          >
            Browse all charities
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-glow">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Start a Treaty for the next occasion.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Less clutter, less waste, more good. It takes two minutes.
          </p>
          <Link
            href="/create"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-12 px-8 text-base"
            )}
          >
            Make a Treaty
          </Link>
        </div>
      </section>
    </div>
  )
}
