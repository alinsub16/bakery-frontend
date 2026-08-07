import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RoleGate } from '@/components/ui/RoleGate'
import { formatCurrency } from '@/lib/format'
import type { InventoryEntry } from '@/types/inventory'

interface InventoryTableProps {
  entries: InventoryEntry[]
  onCorrect: (entry: InventoryEntry) => void
}

export function InventoryTable({ entries, onCorrect }: InventoryTableProps) {
  if (entries.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No inventory entries for this date.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Bread</th>
            <th className="pb-3 font-medium">Opening</th>
            <th className="pb-3 font-medium">Closing</th>
            <th className="pb-3 font-medium">Sold</th>
            <th className="pb-3 font-medium">Revenue</th>
            <th className="pb-3 font-medium">Recorded by</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="py-3 font-medium text-ink">{entry.bread.name}</td>
              <td className="py-3 text-muted">{entry.opening_stock}</td>
              <td className="py-3 text-muted">{entry.closing_stock}</td>
              <td className="py-3 text-ink">{entry.sold_quantity}</td>
              <td className="py-3 font-medium text-ink">{formatCurrency(entry.revenue)}</td>
              <td className="py-3 text-muted">{entry.recorded_by.name}</td>
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