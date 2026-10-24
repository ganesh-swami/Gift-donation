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
    <form action={action} className="flex flex-col gap-5 rounded-2xl border p-4">
      <h2 className="font-heading text-xl font-semibold">Your answer</h2>
      {state.error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex max-w-xs flex-col gap-1.5">
        <Label htmlFor="amount">Amount you will donate (USD)</Label>
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
        />
        <p className="text-xs text-muted-foreground">
          Change it if you like. Whatever you accept becomes the agreed amount.
        </p>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">
          Which charity should {creatorName} donate to?
        </legend>
        <CharityPicker />
      </fieldset>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="decision" value="accept" size="lg" disabled={pending}>
          Accept Treaty
        </Button>
        <Button
          type="submit"
          name="decision"
          value="decline"
          variant="outline"
          size="lg"
          formNoValidate
          disabled={pending}
        >
          Decline
        </Button>
      </div>
    </form>
  )
}
