"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { OCCASIONS, OCCASION_META, type Occasion } from "@/lib/occasions"
import { cn } from "@/lib/utils"

export function OccasionPicker({
  defaultOccasion = "birthday",
  defaultLabel,
  error,
}: {
  defaultOccasion?: string
  defaultLabel?: string
  error?: string
}) {
  const [value, setValue] = useState<Occasion>(
    (OCCASIONS as readonly string[]).includes(defaultOccasion)
      ? (defaultOccasion as Occasion)
      : "birthday"
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {OCCASIONS.map((o) => (
          <label
            key={o}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border bg-card px-3 py-4 text-sm transition-all has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
              value === o
                ? "border-primary shadow-md ring-1 shadow-primary/10 ring-primary"
                : "hover:border-primary/40"
            )}
          >
            <input
              type="radio"
              name="occasion"
              value={o}
              checked={value === o}
              onChange={() => setValue(o)}
              className="sr-only"
            />
            <span className="text-2xl" aria-hidden>
              {OCCASION_META[o].emoji}
            </span>
            <span className="font-medium">{OCCASION_META[o].label}</span>
          </label>
        ))}
      </div>
      {value === "custom" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="occasionLabel" className="text-sm font-medium">
            Name your occasion
          </label>
          <Input
            id="occasionLabel"
            name="occasionLabel"
            defaultValue={defaultLabel}
            placeholder="e.g. Diwali, Eid, Graduation"
            maxLength={60}
            required
            className="h-11 rounded-xl"
          />
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
