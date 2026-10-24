import { NextResponse } from "next/server"

import { hashIp } from "@/lib/tokens"
import { track } from "@/lib/track"
import { resolveToken } from "@/lib/treaty"

const ALLOWED = ["invite_shared", "donate_link_clicked", "create_started"] as const
type Allowed = (typeof ALLOWED)[number]

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = body?.name as Allowed
  if (!ALLOWED.includes(name)) return NextResponse.json({}, { status: 400 })

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  const ctx = typeof body.token === "string" ? await resolveToken(body.token) : null
  const meta = typeof body.meta === "string" ? { detail: body.meta.slice(0, 40) } : undefined
  await track(name, { treatyId: ctx?.treatyId, role: ctx?.role, ipHash: hashIp(ip), meta })
  return NextResponse.json({ ok: true })
}
