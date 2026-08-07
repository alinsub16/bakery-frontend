import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RoleGate } from '@/components/ui/RoleGate'
import type { ProductionEntry } from '@/types/production'

interface ProductionTableProps {
  entries: ProductionEntry[]
  onCorrect: (entry: ProductionEntry) => void
}

export function ProductionTable({ entries, onCorrect }: ProductionTableProps) {
  if (entries.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No production entries for this date.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Bread</th>
            <th className="pb-3 font-medium">SKU</th>
            <th className="pb-3 font-medium">Quantity</th>
            <th className="pb-3 font-medium">Produced by</th>
            <th className="pb-3 font-medium">Time</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="py-3 font-medium text-ink">{entry.bread.name}</td>
              <td className="py-3 text-muted">{entry.bread.sku}</td>
              <td className="py-3 text-ink">{entry.quantity_produced}</td>
              <td className="py-3 text-muted">{entry.produced_by.name}</td>
              <td className="py-3 text-muted">
                {new Date(entry.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td className="py-3">
                <RoleGate allowedRoles={['admin', 'manager']}>
                  <div className="flex justify-end">
                    <Button size="sm" variant="ghost" icon={<Pencil size={14} />} onClick={() => onCorrect(entry)}>
                      Correct
                    </Button>
                  </div>
                </RoleGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}