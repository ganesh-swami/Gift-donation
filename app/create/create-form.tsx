"use client"

import { useActionState, useState } from "react"

import { CharityPicker } from "@/components/charity-picker"
import { ModePicker } from "@/components/mode-picker"
import { OccasionPicker } from "@/components/occasion-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { Mode } from "@/lib/modes"

import { createTreatyAction, type CreateState } from "./actions"

const inputClass = "h-11 rounded-xl bg-background"

function Field({
  label,
  name,
  errors,
  children,
}: {
  label: string
  name: string
  errors?: string[]
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {errors?.map((e) => (
        <p key={e} className="text-xs text-destructive">
          {e}
        </p>
      ))}
    </div>
  )
}

function Section({
  n,
  title,
  hint,
  children,
}: {
  n: number
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground">
          {n}
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold">{title}</h2>
          {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

export function CreateForm() {
  const [state, action, pending] = useActionState<CreateState, FormData>(
    createTreatyAction,
    {}
  )
  const v = state.values ?? {}
  const [mode, setMode] = useState<Mode>((v.mode as Mode) ?? "both")
  const both = mode === "both"
  const fe = state.fieldErrors ?? {}

  return (
    <form action={action} className="flex flex-col gap-6">
      {state.error && (
        <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Section
        n={1}
        title="Who is this between?"
        hint="Emails are kept private and never shown on any page."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" name="creatorName" errors={fe.creatorName}>
            <Input
              id="creatorName"
              name="creatorName"
              defaultValue={v.creatorName}
              autoComplete="given-name"
              required
              maxLength={60}
              className={inputClass}
            />
          </Field>
          <Field
            label="Your email"
            name="creatorEmail"
            errors={fe.creatorEmail}
          >
            <Input
              id="creatorEmail"
              name="creatorEmail"
              type="email"
              defaultValue={v.creatorEmail}
              autoComplete="email"
              required
              className={inputClass}
            />
          </Field>
          <Field
            label="Their name"
            name="recipientName"
            errors={fe.recipientName}
          >
            <Input
              id="recipientName"
              name="recipientName"
              defaultValue={v.recipientName}
              required
              maxLength={60}
              className={inputClass}
            />
          </Field>
          <Field
            label="Their email"
            name="recipientEmail"
            errors={fe.recipientEmail}
          >
            <Input
              id="recipientEmail"
              name="recipientEmail"
              type="email"
              defaultValue={v.recipientEmail}
              required
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section n={2} title="What are you skipping gifts for?">
        <OccasionPicker
          defaultOccasion={v.occasion}
          defaultLabel={v.occasionLabel}
          error={fe.occasionLabel?.[0]}
        />
      </Section>

      <Section
        n={3}
        title="Who will donate?"
        hint="Both of you, or just one. For a birthday or a custom occasion, one person giving is perfectly fine."
      >
        <ModePicker value={mode} onChange={setMode} />
      </Section>

      <Section
        n={4}
        title={
          both ? "How much would you each give?" : "How much will be donated?"
        }
        hint="About what you would have spent on a gift."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={both ? "Amount each (USD)" : "Donation amount (USD)"}
            name="amount"
            errors={fe.amount}
          >
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                inputMode="decimal"
                min={1}
                max={10000}
                step="0.01"
                defaultValue={v.amount ?? "25"}
                required
                className={inputClass + " pl-8"}
              />
            </div>
          </Field>
        </div>
        <div className="mt-5">
          <Field
            label="A personal note (optional)"
            name="message"
            errors={fe.message}
          >
            <Textarea
              id="message"
              name="message"
              defaultValue={v.message}
              maxLength={500}
              placeholder="Let us skip the presents this year and do some good instead."
              className="min-h-24 rounded-xl bg-background"
            />
          </Field>
        </div>
      </Section>

      {mode !== "creator" && (
        <Section
          n={5}
          title="Pick a charity for them"
          hint={
            both
              ? "They will donate your agreed amount here. They will choose one for you."
              : "They will donate your agreed amount to this charity."
          }
        >
          <CharityPicker defaultValue={v.charityId} />
          {fe.charityId && (
            <p className="mt-2 text-xs text-destructive">{fe.charityId[0]}</p>
          )}
        </Section>
      )}
      {mode === "creator" && (
        <p className="rounded-2xl bg-muted p-4 text-sm">
          They will choose the charity when they accept your Treaty.
        </p>
      )}

      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <Button
        type="submit"
        size="lg"
        className="h-14 text-base"
        disabled={pending}
      >
        {pending ? "Creating your Treaty..." : "Create Treaty"}
      </Button>
    </form>
  )
}
