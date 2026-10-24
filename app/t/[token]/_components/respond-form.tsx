"use client"

import { useActionState } from "react"

import { CharityPicker } from "@/components/charity-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { respondAction, type ActionState } from "../actions"

export function RespondForm({
  token,
  creatorName,
  proposedDollars,
}: {
  token: string
  creatorName: string
  proposedDollars: number
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    respondAction.bind(null, token),
    {}
  )

  return (
    <form
      action={action}
      className="flex flex-col gap-7 rounded-3xl border bg-card p-6 shadow-sm sm:p-8"
    >
      <div>
        <h2 className="font-heading text-2xl font-semibold">Your answer</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Accept as proposed, change the amount, or politely decline.
        </p>
      </div>
      {state.error && (
        <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex max-w-xs flex-col gap-1.5">
        <Label htmlFor="amount">Amount you will donate (USD)</Label>
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
            defaultValue={proposedDollars}
            required
            className="h-11 rounded-xl bg-background pl-8"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Whatever you accept becomes the agreed amount for both of you.
        </p>
      </div>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium">
          Which charity should {creatorName} donate to?
        </legend>
        <CharityPicker />
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          name="decision"
          value="accept"
          size="lg"
          className="h-12 px-8 text-base"
          disabled={pending}
        >
          Accept Treaty
        </Button>
        <Button
          type="submit"
          name="decision"
          value="decline"
          variant="outline"
          size="lg"
          className="h-12 px-8 text-base"
          formNoValidate
          disabled={pending}
        >
          Decline
        </Button>
      </div>
    </form>
  )
}
