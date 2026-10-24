"use client"

import { useState } from "react"

import { CHARITIES } from "@/lib/charities"
import { cn } from "@/lib/utils"

export function CharityPicker({
  name = "charityId",
  defaultValue,
}: {
  name?: string
  defaultValue?: string
}) {
  const causes = ["All", ...Array.from(new Set(CHARITIES.map((c) => c.cause)))]
  const [cause, setCause] = useState("All")
  const [value, setValue] = useState(defaultValue ?? "")
  const visible = CHARITIES.filter((c) => cause === "All" || c.cause === cause)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        role="group"
        aria-label="Filter by cause"
      >
        {causes.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCause(c)}
            aria-pressed={cause === c}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
              cause === c
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((c) => (
          <label
            key={c.id}
            className={cn(
              "relative flex cursor-pointer flex-col gap-1 rounded-2xl border bg-background p-4 text-sm transition-all has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
              value === c.id
                ? "border-primary shadow-md ring-1 shadow-primary/10 ring-primary"
                : "hover:border-primary/40"
            )}
          >
            <input
              type="radio"
              name={name}
              value={c.id}
              checked={value === c.id}
              onChange={() => setValue(c.id)}
              className="sr-only"
              required
            />
            {value === c.id && (
              <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  viewBox="0 0 24 24"
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            )}
            <span className="pr-6 font-medium">{c.name}</span>
            <span className="w-fit rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
              {c.cause}
            </span>
            <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {c.description}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
