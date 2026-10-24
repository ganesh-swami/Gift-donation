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
})
