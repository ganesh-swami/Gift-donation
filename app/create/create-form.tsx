"use client"

import { useActionState } from "react"

import { CharityPicker } from "@/components/charity-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { createTreatyAction, type CreateState } from "./actions"

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

export function CreateForm() {
  const [state, action, pending] = useActionState<CreateState, FormData>(
    createTreatyAction,
    {}
  )
  const v = state.values ?? {}
  const fe = state.fieldErrors ?? {}

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="creatorName" errors={fe.creatorName}>
          <Input id="creatorName" name="creatorName" defaultValue={v.creatorName} autoComplete="given-name" required maxLength={60} />
        </Field>
        <Field label="Your email" name="creatorEmail" errors={fe.creatorEmail}>
          <Input id="creatorEmail" name="creatorEmail" type="email" defaultValue={v.creatorEmail} autoComplete="email" required />
        </Field>
        <Field label="Their name" name="recipientName" errors={fe.recipientName}>
          <Input id="recipientName" name="recipientName" defaultValue={v.recipientName} required maxLength={60} />
        </Field>
        <Field label="Their email" name="recipientEmail" errors={fe.recipientEmail}>
          <Input id="recipientEmail" name="recipientEmail" type="email" defaultValue={v.recipientEmail} required />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Occasion" name="occasion" errors={fe.occasion}>
          <select
            id="occasion"
            name="occasion"
            defaultValue={v.occasion ?? "birthday"}
            className="h-9 rounded-4xl border bg-input/30 px-3 text-sm"
          >
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="festival">Festival</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Occasion detail (optional)" name="occasionLabel" errors={fe.occasionLabel}>
          <Input id="occasionLabel" name="occasionLabel" defaultValue={v.occasionLabel} placeholder="e.g. Diwali 2026" maxLength={60} />
        </Field>
        <Field label="Amount each (USD)" name="amount" errors={fe.amount}>
          <Input id="amount" name="amount" type="number" inputMode="decimal" min={1} max={10000} step="0.01" defaultValue={v.amount ?? "25"} required />
        </Field>
      </div>

      <Field label="Optional message" name="message" errors={fe.message}>
        <Textarea id="message" name="message" defaultValue={v.message} maxLength={500} placeholder="Let us skip the presents this year..." />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">
          Which charity would you like them to donate to?
        </legend>
        <CharityPicker defaultValue={v.charityId} />
        {fe.charityId && <p className="text-xs text-destructive">{fe.charityId[0]}</p>}
      </fieldset>

      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <Button type="submit" size="lg" className="h-12" disabled={pending}>
        {pending ? "Creating..." : "Create Treaty"}
      </Button>
    </form>
  )
}
