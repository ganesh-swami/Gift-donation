export const MODES = ["both", "creator", "recipient"] as const
export type Mode = (typeof MODES)[number]
export type Role = "creator" | "recipient"

/** Who donates in a Treaty. The person who does NOT donate (if any) picks the charity. */
export function donorRoles(mode: string): Role[] {
  if (mode === "creator") return ["creator"]
  if (mode === "recipient") return ["recipient"]
  return ["creator", "recipient"]
}
