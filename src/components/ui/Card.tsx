import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
  padding?: 'none' | 'sm' | 'md'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
}

export function Card({ children, className = '', title, action, padding = 'md' }: CardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-white ${paddingClasses[padding]} ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="font-display text-base font-semibold text-ink">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}