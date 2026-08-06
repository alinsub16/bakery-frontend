import { AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { LowStockBread } from '@/types/dashboard'

interface LowStockListProps {
  items: LowStockBread[]
}

export function LowStockList({ items }: LowStockListProps) {
  return (
    <Card title="Low stock">
      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">Nothing running low right now.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((bread) => (
            <li key={bread.id} className="flex items-center gap-3 rounded-xl bg-warning/10 px-3 py-2 text-sm">
              <AlertTriangle size={16} className="shrink-0 text-warning" />
              <span className="flex-1 font-medium text-ink">{bread.name}</span>
              <span className="text-xs font-semibold text-warning">{bread.opening_stock} left</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}