"use server"

import { revalidatePath } from "next/cache"

import { reportDonation, respond, TreatyError } from "@/lib/treaty"
import { respondSchema } from "@/lib/validation"

export type ActionState = { error?: string }

export async function respondAction(
  token: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = respondSchema.safeParse({
    decision: formData.get("decision"),
    amount: formData.get("amount") || undefined,
    charityId: formData.get("charityId") || undefined,
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form" }
  }
  try {
    await respond(token, parsed.data)
  } catch (e) {
    if (e instanceof TreatyError) return { error: e.message }
    throw e
  }
  revalidatePath(`/t/${token}`)
  return {}
}

export async function reportDonationAction(
  token: string,
  _prev: ActionState
): Promise<ActionState> {
  try {
    await reportDonation(token)
  } catch (e) {
    if (e instanceof TreatyError) return { error: e.message }
    throw e
  }
  revalidatePath(`/t/${token}`)
  return {}
}
