import { describe, expect, it } from "vitest"

import { hashToken } from "@/lib/tokens"
import {
  createTreaty,
  getTreatyByToken,
  reportDonation,
  respond,
} from "@/lib/treaty"

const input = {
  creatorName: "Asha",
  creatorEmail: "asha@example.com",
  recipientName: "Ben",
  recipientEmail: "ben@example.com",
  occasion: "birthday",
  mode: "both" as const,
  amount: 2500,
  charityId: "unicef",
}

describe("treaty flow", () => {
  it("hashes tokens deterministically", () => {
    expect(hashToken("abc")).toBe(hashToken("abc"))
  })

  it("rejects unknown tokens", async () => {
    expect(await getTreatyByToken("zzzzzz")).toBeNull()
    expect(await getTreatyByToken("short")).toBeNull()
  })

  it("accepts with adjusted amount, completes after both donate", async () => {
    const t = await createTreaty(input)
    const view = await getTreatyByToken(t.recipientToken)
    expect(view?.role).toBe("recipient")
    expect(JSON.stringify(view)).not.toContain("@")

    await expect(
      respond(t.creatorToken, { decision: "decline" })
    ).rejects.toThrow()
    await respond(t.recipientToken, {
      decision: "accept",
      amount: 1500,
      charityId: "wwf",
    })
    await expect(
      respond(t.recipientToken, { decision: "decline" })
    ).rejects.toThrow()

    const after = await getTreatyByToken(t.creatorToken)
    expect(after?.status).toBe("accepted")
    expect(after?.agreedAmount).toBe(1500)
    expect(after?.other.charityId).toBe("wwf")

    await reportDonation(t.creatorToken)
    await reportDonation(t.creatorToken) // idempotent
    expect((await getTreatyByToken(t.creatorToken))?.status).toBe("accepted")
    await reportDonation(t.recipientToken)
    expect((await getTreatyByToken(t.creatorToken))?.status).toBe("completed")
  })

  it("supports decline", async () => {
    const t = await createTreaty(input)
    await respond(t.recipientToken, { decision: "decline" })
    expect((await getTreatyByToken(t.creatorToken))?.status).toBe("declined")
    await expect(reportDonation(t.creatorToken)).rejects.toThrow()
  })

  it("lets only the creator donate when mode is creator", async () => {
    const t = await createTreaty({
      ...input,
      mode: "creator",
      charityId: undefined,
    })
    await expect(
      respond(t.recipientToken, { decision: "accept" })
    ).rejects.toThrow() // recipient must pick the charity
    await respond(t.recipientToken, { decision: "accept", charityId: "wwf" })
    await expect(reportDonation(t.recipientToken)).rejects.toThrow()
    const view = await getTreatyByToken(t.creatorToken)
    expect(view?.me.donates).toBe(true)
    expect(view?.other.donates).toBe(false)
    await reportDonation(t.creatorToken)
    expect((await getTreatyByToken(t.creatorToken))?.status).toBe("completed")
  })

  it("lets only the recipient donate when mode is recipient", async () => {
    const t = await createTreaty({ ...input, mode: "recipient" })
    await respond(t.recipientToken, { decision: "accept" }) // no pick needed
    await expect(reportDonation(t.creatorToken)).rejects.toThrow()
    await reportDonation(t.recipientToken)
    expect((await getTreatyByToken(t.recipientToken))?.status).toBe("completed")
  })
})
