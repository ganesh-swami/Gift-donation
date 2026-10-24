"use client"

import { MODES, type Mode } from "@/lib/modes"
import { cn } from "@/lib/utils"

const OPTIONS: Record<Mode, { title: string; body: string; hint: string }> = {
  both: {
    title: "We both donate",
    body: "Each of you gives to a charity the other chooses.",
    hint: "Classic Treaty",
  },
  creator: {
    title: "Only I donate",
    body: "I give in their honour, to a charity they choose.",
    hint: "Great for birthdays",
  },
  recipient: {
    title: "Only they donate",
    body: "They give to a charity I choose, instead of a gift for me.",
    hint: "Great for your own occasion",
  },
}

export function ModePicker({
  value,
  onChange,
}: {
  value: Mode
  onChange: (mode: Mode) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {MODES.map((m) => (
        <label
          key={m}
          className={cn(
            "relative flex cursor-pointer flex-col gap-1.5 rounded-2xl border bg-background p-4 text-sm transition-all has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
            value === m
              ? "border-primary shadow-md ring-1 shadow-primary/10 ring-primary"
              : "hover:border-primary/40"
          )}
        >
          <input
            type="radio"
            name="mode"
            value={m}
            checked={value === m}
            onChange={() => onChange(m)}
            className="sr-only"
          />
          <span className="w-fit rounded-full bg-accent/50 px-2 py-0.5 text-xs text-accent-foreground">
            {OPTIONS[m].hint}
          </span>
          <span className="font-heading text-lg font-semibold">
            {OPTIONS[m].title}
          </span>
          <span className="leading-relaxed text-muted-foreground">
            {OPTIONS[m].body}
          </span>
        </label>
      ))}
    </div>
  )
}
