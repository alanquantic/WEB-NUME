type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-10 text-center shadow-panel">
      <p className="font-display text-xl font-semibold text-primary">{title}</p>
      <p className="mt-2 text-sm leading-6 text-foreground/70">{description}</p>
    </div>
  )
}
