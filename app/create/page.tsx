import type { Metadata } from "next"

import { PageHeading, PageShell } from "@/components/page-shell"
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
    <PageShell>
      <PageHeading eyebrow="New Treaty" title="Propose a gift-free celebration">
        Takes about two minutes. You will get a private link to share with them.
      </PageHeading>
      <CreateForm />
    </PageShell>
  )
}
