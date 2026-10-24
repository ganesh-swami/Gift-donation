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
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by cause">
        {causes.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCause(c)}
            aria-pressed={cause === c}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-xs",
              cause === c
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {visible.map((c) => (
          <label
            key={c.id}
            className={cn(
              "flex cursor-pointer flex-col gap-1 rounded-xl border p-3 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
              value === c.id ? "border-primary bg-muted" : "hover:bg-muted/50"
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
            <span className="font-medium">{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.cause}</span>
            <span className="text-xs">{c.description}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
