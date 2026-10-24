"use client"

import { Button } from "@/components/ui/button"

export function PrintButton() {
  return (
    <Button
      size="lg"
      className="h-12 px-8 text-base"
      onClick={() => window.print()}
    >
      Print or save as PDF
    </Button>
  )
}
