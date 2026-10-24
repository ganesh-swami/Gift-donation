import { cn } from "@/lib/utils"

/** Stroke icons drawn on a 24x24 grid. */
const ICONS = {
  water: "M12 2.7c3.5 4.2 6 7.3 6 10.3a6 6 0 0 1-12 0c0-3 2.5-6.1 6-10.3z",
  health: "M3 12h4l2-5 4 10 2-5h6",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM20 17v4H6.5A2.5 2.5 0 0 1 4 19.5",
  leaf: "M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 17-9 17zM4 21c3-5 6-8 11-10",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  check: "M20 6 9 17l-5-5",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  award: "M15.5 13.5 17 22l-5-3-5 3 1.5-8.5",
} as const

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={ICONS[name]} />
      {name === "award" && <circle cx="12" cy="8" r="6" />}
    </svg>
  )
}

/** Hands cradling a heart under a rising sun, over layered hills. */
export function GivingIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Two hands holding a heart in front of a sunrise over green hills"
    >
      <circle cx="240" cy="170" r="150" fill="var(--gold)" opacity="0.22" />
      <circle cx="240" cy="170" r="104" fill="var(--gold)" opacity="0.35" />
      {/* hills */}
      <path
        d="M0 300 Q120 230 240 290 T480 270 V400 H0Z"
        fill="var(--primary)"
        opacity="0.35"
      />
      <path
        d="M0 340 Q140 280 260 330 T480 320 V400 H0Z"
        fill="var(--primary)"
        opacity="0.6"
      />
      <path
        d="M0 375 Q160 330 300 365 T480 360 V400 H0Z"
        fill="var(--forest-deep)"
      />
      {/* rays */}
      {[...Array(9)].map((_, i) => {
        const a = (Math.PI * (i + 1)) / 10
        const x1 = 240 - Math.cos(a) * 168
        const y1 = 170 - Math.sin(a) * 168
        const x2 = 240 - Math.cos(a) * 196
        const y2 = 170 - Math.sin(a) * 196
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--gold)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
      {/* heart */}
      <path
        d="M240 232c-46-30-72-56-72-88 0-24 18-40 40-40 14 0 26 7 32 18 6-11 18-18 32-18 22 0 40 16 40 40 0 32-26 58-72 88z"
        fill="var(--destructive)"
      />
      <path
        d="M200 120c-14 4-22 16-22 30"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* left hand */}
      <path
        d="M92 262c20-6 44 4 74 18 22 10 44 14 74 14v28c-44 8-86 0-120-14-24-10-36-22-28-46z"
        fill="var(--card)"
        stroke="var(--forest-deep)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* right hand */}
      <path
        d="M388 262c-20-6-44 4-74 18-22 10-44 14-74 14v28c44 8 86 0 120-14 24-10 36-22 28-46z"
        fill="var(--card)"
        stroke="var(--forest-deep)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* sparkles */}
      {[
        [96, 120],
        [392, 96],
        [430, 190],
        [58, 200],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - 10} L${x + 3} ${y - 3} L${x + 10} ${y} L${x + 3} ${y + 3} L${x} ${y + 10} L${x - 3} ${y + 3} L${x - 10} ${y} L${x - 3} ${y - 3}Z`}
          fill="var(--gold)"
        />
      ))}
    </svg>
  )
}
