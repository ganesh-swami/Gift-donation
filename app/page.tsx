import Link from "next/link"

import {
  GivingIllustration,
  Icon,
  type IconName,
} from "@/components/illustrations"
import { buttonVariants } from "@/components/ui/button"
import { CHARITIES } from "@/lib/charities"
import { OCCASION_META } from "@/lib/occasions"
import { cn } from "@/lib/utils"

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "edit",
    title: "Propose",
    body: "Pick the occasion, who will donate and how much. Choose a charity if you like.",
  },
  {
    icon: "check",
    title: "Agree",
    body: "They open a private link and accept, decline, or adjust the amount.",
  },
  {
    icon: "heart",
    title: "Give",
    body: "Donate on the charity's own website, then mark it done. We never touch the money.",
  },
  {
    icon: "award",
    title: "Celebrate",
    body: "Download your personal Certificate of Giving to print, share or frame.",
  },
]

const causes: { icon: IconName; cause: string; line: string; names: string }[] =
  [
    {
      icon: "water",
      cause: "Clean water",
      line: "Safe drinking water changes health, school attendance and daily life for a whole community.",
      names: "charity: water, Water.org",
    },
    {
      icon: "health",
      cause: "Health",
      line: "Nets, medicines and emergency care protect families from preventable illness.",
      names: "Against Malaria Foundation, MSF",
    },
    {
      icon: "book",
      cause: "Education",
      line: "Books, literacy programmes and free knowledge open doors that last a lifetime.",
      names: "Room to Read, Wikimedia",
    },
    {
      icon: "leaf",
      cause: "Planet",
      line: "Protecting forests, oceans and wildlife keeps our shared home healthy.",
      names: "WWF, Rainforest Trust",
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
              Gift Treaty: skip the gifts and donate what you would have spent
              to a charity that means something. Both of you, or just one.
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
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm tracking-wide text-primary uppercase">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
              Four simple steps, one thoughtful outcome.
            </h2>
          </div>
          <ol className="relative mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden
              className="absolute top-7 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-gold/70 lg:block"
            />
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-8 shadow-primary/25 ring-muted">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <div className="mt-6 w-full flex-1 rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
                  <span className="text-xs font-medium tracking-widest text-gold uppercase">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
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

      {/* Impact: encourage donating */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-4 rounded-[2.5rem] bg-gold/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border bg-card p-4 shadow-xl shadow-primary/5">
              <GivingIllustration />
            </div>
          </div>
          <div>
            <p className="text-sm tracking-wide text-primary uppercase">
              Small gifts, real difference
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
              What you would spend on a present can do far more somewhere else.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The scarf, the candle, the third mug. Most gifts are forgotten in
              weeks. A donation can help a family get clean water, a child learn
              to read, or a patient reach care.
            </p>
            <Link
              href="/create"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 px-8 text-base"
              )}
            >
              Give instead
            </Link>
          </div>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {causes.map((c) => (
            <div
              key={c.cause}
              className="rounded-3xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/50 text-accent-foreground">
                <Icon name={c.icon} />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold">
                {c.cause}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.line}
              </p>
              <p className="mt-3 text-xs text-primary">{c.names}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Give in their honour: single donor */}
      <section className="bg-forest-deep text-primary-foreground dark:text-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm tracking-wide text-gold uppercase">
              Your occasion, your way
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
              Sometimes one person giving is the whole gift.
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">
              For a birthday or a custom occasion you do not need to match each
              other. Give in someone&apos;s honour, or ask a friend to donate to
              a cause you care about instead of buying you something.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "We both donate",
                "Each gives to a charity the other picks.",
                "Classic",
              ],
              [
                "Only I donate",
                "A gift in their honour, to the cause they choose.",
                "Birthdays",
              ],
              [
                "Only they donate",
                "Ask them to give to your cause instead of a gift.",
                "Your day",
              ],
            ].map(([title, body, tag]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
              >
                <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-medium text-forest-deep">
                  {tag}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rotate-[-2deg] rounded-[1.75rem] border-4 border-gold bg-card p-2 shadow-2xl shadow-primary/10">
              <div className="hero-glow rounded-[1.25rem] border border-gold/60 px-6 py-10 text-center">
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Gift Treaty
                </p>
                <p className="mt-2 font-heading text-3xl font-semibold text-primary">
                  Certificate of Giving
                </p>
                <div className="mx-auto my-4 h-px w-16 bg-gold" />
                <p className="text-xs text-muted-foreground">
                  This certifies that
                </p>
                <p className="mt-1 font-heading text-3xl font-semibold italic">
                  Asha Rao
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed">
                  chose generosity over a gift and donated{" "}
                  <span className="font-semibold text-primary">$25</span> to
                  UNICEF in honour of Ben.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm tracking-wide text-primary uppercase">
              A keepsake for your kindness
            </p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance">
              Get a personal Certificate of Giving.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Once you mark your donation as done, we create a certificate with
              your name, the cause and the occasion. Print it, save it as a PDF,
              or hand it over in place of a gift.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm">
              {[
                "Ready the moment you report your donation",
                "Print or save as PDF in one click",
                "A thoughtful thing to give instead of a present",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t bg-muted/60">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-8 px-5 py-20 sm:grid-cols-2 lg:grid-cols-4">
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
