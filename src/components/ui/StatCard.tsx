import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: string
  icon: ReactNode
  accent?: 'terracotta' | 'success' | 'warning' | 'danger'
}

const accentClasses = {
  terracotta: 'bg-terracotta/10 text-terracotta',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

export function StatCard({ label, value, icon, accent = 'terracotta' }: StatCardProps) {
  return (
    <Card padding="md">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted">{label}</p>
          <p className="font-display text-xl font-semibold text-ink">{value}</p>
        </div>
      </div>
    </Card>
  )
}