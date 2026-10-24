import "server-only"
import { randomUUID } from "node:crypto"
import { and, count, eq, gt, isNull } from "drizzle-orm"

import { db, ensureSchema } from "./db"
import { events, participants, treaties } from "./db/schema"
import { donorRoles, type Mode, type Role } from "./modes"
import { generateToken, hashToken, TOKEN_PATTERN } from "./tokens"
import { track } from "./track"

export type { Role }
export type Status = "pending" | "accepted" | "declined" | "completed"

export type CreateInput = {
  creatorName: string
  creatorEmail: string
  recipientName: string
  recipientEmail: string
  occasion: string
  occasionLabel?: string
  mode: Mode
  amount: number // cents
  charityId?: string // picked by creator, for the recipient to donate to
  message?: string
}

type Person = {
  name: string
  donates: boolean
  charityId: string | null // charity this person picked for the other
  donatedAt: number | null
}

/** What a page may see. Never includes email addresses or token hashes. */
export type TreatyView = {
  id: string
  role: Role
  status: Status
  mode: Mode
  occasion: string
  occasionLabel: string | null
  proposedAmount: number
  agreedAmount: number | null
  message: string | null
  createdAt: number
  me: Person
  other: Person
}

const HOUR = 60 * 60 * 1000
const MAX_CREATES_PER_HOUR = 5

export class TreatyError extends Error {}

export async function createTreaty(input: CreateInput, ipHash?: string) {
  await ensureSchema()

  if (ipHash) {
    const [{ n }] = await db
      .select({ n: count() })
      .from(events)
      .where(
        and(
          eq(events.name, "treaty_created"),
          eq(events.ipHash, ipHash),
          gt(events.createdAt, Date.now() - HOUR)
        )
      )
    if (n >= MAX_CREATES_PER_HOUR) {
      throw new TreatyError(
        "Too many Treaties from this device. Please try again later."
      )
    }
  }

  // The creator only picks a charity when the other person is donating.
  const creatorPick =
    input.mode === "creator" ? null : (input.charityId ?? null)
  if (input.mode !== "creator" && !creatorPick) {
    throw new TreatyError("Pick a charity")
  }

  // Ids are short, so retry on the rare collision (token_hash is unique).
  for (let attempt = 0; ; attempt++) {
    const treatyId = randomUUID()
    const creatorToken = generateToken()
    const recipientToken = generateToken()
    if (creatorToken === recipientToken) continue
    try {
      await db.batch([
        db.insert(treaties).values({
          id: treatyId,
          occasion: input.occasion,
          occasionLabel: input.occasionLabel || null,
          mode: input.mode,
          proposedAmount: input.amount,
          message: input.message || null,
          status: "pending",
          createdAt: Date.now(),
        }),
        db.insert(participants).values({
          id: randomUUID(),
          treatyId,
          role: "creator",
          name: input.creatorName,
          email: input.creatorEmail,
          tokenHash: hashToken(creatorToken),
          charityId: creatorPick,
        }),
        db.insert(participants).values({
          id: randomUUID(),
          treatyId,
          role: "recipient",
          name: input.recipientName,
          email: input.recipientEmail,
          tokenHash: hashToken(recipientToken),
        }),
      ])

      await track("treaty_created", {
        treatyId,
        role: "creator",
        ipHash,
        meta: { mode: input.mode },
      })
      return { treatyId, creatorToken, recipientToken }
    } catch (e) {
      if (attempt >= 4) throw e
    }
  }
}

async function findByToken(token: string) {
  token = token.toLowerCase()
  if (!TOKEN_PATTERN.test(token)) return null
  await ensureSchema()
  const me = await db.query.participants.findFirst({
    where: eq(participants.tokenHash, hashToken(token)),
  })
  if (!me) return null
  const treaty = await db.query.treaties.findFirst({
    where: eq(treaties.id, me.treatyId),
  })
  const other = await db.query.participants.findFirst({
    where: and(
      eq(participants.treatyId, me.treatyId),
      eq(participants.role, me.role === "creator" ? "recipient" : "creator")
    ),
  })
  if (!treaty || !other) return null
  return { me, other, treaty }
}

type Found = NonNullable<Awaited<ReturnType<typeof findByToken>>>

function toView(r: Found): TreatyView {
  const donors = donorRoles(r.treaty.mode)
  const person = (p: Found["me"]): Person => ({
    name: p.name,
    donates: donors.includes(p.role as Role),
    charityId: p.charityId,
    donatedAt: p.donatedAt,
  })
  return {
    id: r.treaty.id,
    role: r.me.role as Role,
    status: r.treaty.status as Status,
    mode: r.treaty.mode as Mode,
    occasion: r.treaty.occasion,
    occasionLabel: r.treaty.occasionLabel,
    proposedAmount: r.treaty.proposedAmount,
    agreedAmount: r.treaty.agreedAmount,
    message: r.treaty.message,
    createdAt: r.treaty.createdAt,
    me: person(r.me),
    other: person(r.other),
  }
}

export async function getTreatyByToken(token: string) {
  const r = await findByToken(token)
  if (!r) return null
  if (r.me.role === "recipient" && !r.me.firstViewedAt) {
    const res = await db
      .update(participants)
      .set({ firstViewedAt: Date.now() })
      .where(
        and(eq(participants.id, r.me.id), isNull(participants.firstViewedAt))
      )
    if (res.rowsAffected) {
      await track("invite_opened", { treatyId: r.treaty.id, role: "recipient" })
    }
  }
  return toView(r)
}

/** Resolves a token to ids for tracking; null if invalid. */
export async function resolveToken(token: string) {
  const r = await findByToken(token)
  return r ? { treatyId: r.treaty.id, role: r.me.role as Role } : null
}

export async function respond(
  token: string,
  input: { decision: "accept" | "decline"; amount?: number; charityId?: string }
) {
  const r = await findByToken(token)
  if (!r) throw new TreatyError("Treaty not found")
  if (r.me.role !== "recipient") {
    throw new TreatyError("Only the invited person can respond")
  }

  const now = Date.now()
  const pending = and(
    eq(treaties.id, r.treaty.id),
    eq(treaties.status, "pending")
  )

  if (input.decision === "decline") {
    const res = await db
      .update(treaties)
      .set({ status: "declined", respondedAt: now })
      .where(pending)
    if (res.rowsAffected === 0) {
      throw new TreatyError("This Treaty has already been answered")
    }
    await track("treaty_declined", { treatyId: r.treaty.id, role: "recipient" })
    return
  }

  // The recipient picks a charity only when the creator is the one donating.
  const picksCharity = r.treaty.mode !== "recipient"
  if (picksCharity && !input.charityId) {
    throw new TreatyError(`Pick a charity for ${r.other.name}`)
  }
  const agreed = input.amount ?? r.treaty.proposedAmount
  const res = await db
    .update(treaties)
    .set({ status: "accepted", agreedAmount: agreed, respondedAt: now })
    .where(pending)
  if (res.rowsAffected === 0) {
    throw new TreatyError("This Treaty has already been answered")
  }
  if (picksCharity) {
    await db
      .update(participants)
      .set({ charityId: input.charityId })
      .where(eq(participants.id, r.me.id))
  }
  await track("treaty_accepted", {
    treatyId: r.treaty.id,
    role: "recipient",
    meta: { amountAdjusted: agreed !== r.treaty.proposedAmount },
  })
  if (picksCharity) {
    await track("charity_chosen", { treatyId: r.treaty.id, role: "recipient" })
  }
}

export async function reportDonation(token: string) {
  const r = await findByToken(token)
  if (!r) throw new TreatyError("Treaty not found")
  if (r.treaty.status !== "accepted") {
    throw new TreatyError("This Treaty is not active")
  }
  const donors = donorRoles(r.treaty.mode)
  if (!donors.includes(r.me.role as Role)) {
    throw new TreatyError("You are not donating in this Treaty")
  }

  const res = await db
    .update(participants)
    .set({ donatedAt: Date.now() })
    .where(and(eq(participants.id, r.me.id), isNull(participants.donatedAt)))
  if (res.rowsAffected === 0) return // already reported
  await track("donation_reported", { treatyId: r.treaty.id, role: r.me.role })

  const othersDone = donors.every(
    (role) => role === r.me.role || (r.other.role === role && r.other.donatedAt)
  )
  if (othersDone) {
    const done = await db
      .update(treaties)
      .set({ status: "completed", completedAt: Date.now() })
      .where(and(eq(treaties.id, r.treaty.id), eq(treaties.status, "accepted")))
    if (done.rowsAffected) {
      await track("treaty_completed", { treatyId: r.treaty.id })
    }
  }
}
