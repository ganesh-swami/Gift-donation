import { z } from "zod"

import { CHARITY_IDS } from "./charities"
import { MODES } from "./modes"
import { OCCASIONS } from "./occasions"

const name = z.string().trim().min(1, "Please enter a name").max(60)
const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email")
  .max(254)

/** Dollars (as typed) -> integer cents, $1 to $10,000. */
const amount = z.coerce
  .number("Enter an amount")
  .min(1, "Minimum is $1")
  .max(10000, "Maximum is $10,000")
  .transform((n) => Math.round(n * 100))

const charityId = z.enum(CHARITY_IDS as [string, ...string[]], "Pick a charity")

export const createSchema = z
  .object({
    creatorName: name,
    creatorEmail: email,
    recipientName: name,
    recipientEmail: email,
    occasion: z.enum(OCCASIONS),
    occasionLabel: z.string().trim().max(60).optional(),
    mode: z.enum(MODES),
    amount,
    charityId: charityId.optional(),
    message: z.string().trim().max(500).optional(),
  })
  .refine((d) => d.occasion !== "custom" || !!d.occasionLabel, {
    path: ["occasionLabel"],
    message: "Name your occasion",
  })
  .refine((d) => d.mode === "creator" || !!d.charityId, {
    path: ["charityId"],
    message: "Pick a charity",
  })

export const respondSchema = z.object({
  decision: z.enum(["accept", "decline"]),
  amount: amount.optional(),
  charityId: charityId.optional(),
})
export { amount as amountSchema, charityId as charityIdSchema }
