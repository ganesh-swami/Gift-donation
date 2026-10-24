"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { hashIp } from "@/lib/tokens"
import { createTreaty, TreatyError } from "@/lib/treaty"
import { createSchema } from "@/lib/validation"

export type CreateState = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
  values?: Record<string, string>
}

export async function createTreatyAction(
  _prev: CreateState,
  formData: FormData
): Promise<CreateState> {
  const raw = Object.fromEntries(formData) as Record<string, string>
  const values = Object.fromEntries(
    Object.entries(raw).filter(([k]) => !k.startsWith("$ACTION"))
  )

  // Honeypot: real users never fill this in.
  if (raw.website) redirect("/")

  const parsed = createSchema.safeParse({
    ...values,
    occasionLabel: values.occasionLabel || undefined,
    message: values.message || undefined,
  })
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors, values }
  }

  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"

  let tokens: { creatorToken: string; recipientToken: string }
  try {
    tokens = await createTreaty(parsed.data, hashIp(ip))
  } catch (e) {
    if (e instanceof TreatyError) return { error: e.message, values }
    throw e
  }
  // Only hashes are stored, so the invite token travels once in this redirect.
  redirect(`/t/${tokens.creatorToken}?invite=${tokens.recipientToken}`)
}
