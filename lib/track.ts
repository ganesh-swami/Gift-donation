import "server-only"
import { randomUUID } from "node:crypto"

import { db, ensureSchema } from "./db"
import { events } from "./db/schema"

export type EventName =
  | "create_started"
  | "treaty_created"
  | "invite_shared"
  | "invite_opened"
  | "treaty_accepted"
  | "treaty_declined"
  | "charity_chosen"
  | "donate_link_clicked"
  | "donation_reported"
  | "treaty_completed"

export async function track(
  name: EventName,
  opts: {
    treatyId?: string
    role?: string
    ipHash?: string
    meta?: Record<string, unknown>
  } = {}
) {
  try {
    await ensureSchema()
    await db.insert(events).values({
      id: randomUUID(),
      name,
      treatyId: opts.treatyId,
      role: opts.role,
      ipHash: opts.ipHash,
      meta: opts.meta ? JSON.stringify(opts.meta) : null,
      createdAt: Date.now(),
    })
  } catch (err) {
    console.error("track failed", err)
  }
}
