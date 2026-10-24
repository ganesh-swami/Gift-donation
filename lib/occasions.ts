export const OCCASIONS = [
  "birthday",
  "anniversary",
  "christmas",
  "custom",
] as const
export type Occasion = (typeof OCCASIONS)[number]

export const OCCASION_META: Record<Occasion, { label: string; emoji: string }> =
  {
    birthday: { label: "Birthday", emoji: "🎂" },
    anniversary: { label: "Anniversary", emoji: "💍" },
    christmas: { label: "Christmas", emoji: "🎄" },
    custom: { label: "Custom", emoji: "✨" },
  }

/** Display name: custom occasions use the name the creator typed. */
export function occasionName(occasion: string, label?: string | null) {
  if (occasion === "custom") return label || "a special occasion"
  return OCCASION_META[occasion as Occasion]?.label ?? occasion
}

export function occasionEmoji(occasion: string) {
  return OCCASION_META[occasion as Occasion]?.emoji ?? "🎁"
}
