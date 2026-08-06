interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'muted'
}

const variantClasses = {
  success: 'bg-success/10 text-success',
  muted: 'bg-ink/5 text-muted',
}

export function Badge({ children, variant = 'muted' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}