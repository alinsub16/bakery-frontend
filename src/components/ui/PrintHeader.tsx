interface PrintHeaderProps {
  title: string
  subtitle: string
}

export function PrintHeader({ title, subtitle }: PrintHeaderProps) {
  return (
    <div className="print-only mb-6 border-b border-ink pb-4">
      <h1 className="text-xl font-semibold text-ink">Breadline — {title}</h1>
      <p className="text-sm text-muted">{subtitle}</p>
      <p className="mt-1 text-xs text-muted">Generated {new Date().toLocaleString('en-US')}</p>
    </div>
  )
}