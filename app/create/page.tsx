import type { Metadata } from "next"

import { track } from "@/lib/track"

import { CreateForm } from "./create-form"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Make a Treaty" }

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  await track("create_started", { meta: { ref: ref?.slice(0, 20) ?? null } })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Make a Treaty</h1>
        <p className="text-muted-foreground">
          Propose skipping gifts. You will get a private link to share with them.
        </p>
      </div>
      <CreateForm />
    </div>
  )
}
