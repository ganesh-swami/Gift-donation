import { cn } from "@/lib/utils"

export function PageShell({
  children,
  className,
  width = "max-w-3xl",
}: {
  children: React.ReactNode
  className?: string
  width?: string
}) {
  return (
    <div className={cn("mx-auto w-full px-5 py-12 sm:py-16", width, className)}>
      {children}
    </div>
  )
}

export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      {eyebrow && (
        <p className="text-sm tracking-wide text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {children && (
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          {children}
        </p>
      )}
    </div>
  )
}
