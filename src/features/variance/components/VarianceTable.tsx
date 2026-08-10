import { AlertCircle } from 'lucide-react'
import { getVarianceSeverity, severityConfig } from '../severity'
import type { VarianceEntry } from '@/types/variance'

interface VarianceTableProps {
  entries: VarianceEntry[]
}

export function VarianceTable({ entries }: VarianceTableProps) {
  if (entries.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No production activity in this range.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Bread</th>
            <th className="pb-3 font-medium">Produced</th>
            <th className="pb-3 font-medium">Sold</th>
            <th className="pb-3 font-medium">Variance</th>
            <th className="pb-3 font-medium">Avg. closing stock</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => {
            const severity = getVarianceSeverity(entry.variance_percent)
            const config = severityConfig[severity]

            return (
              <tr key={entry.bread.id}>
                <td className="py-3">
                  <p className="font-medium text-ink">{entry.bread.name}</p>
                  <p className="text-xs text-muted">{entry.bread.sku}</p>
                </td>
                <td className="py-3 text-muted">{entry.total_produced}</td>
                <td className="py-3 text-muted">{entry.total_sold}</td>
                <td className="py-3">
                  <span className="font-semibold text-ink">{entry.variance}</span>
                  <span className="ml-1 text-xs text-muted">({entry.variance_percent}%)</span>
                </td>
                <td className="py-3 text-muted">{entry.avg_daily_closing_stock}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.badge}`}>
                      {config.label}
                    </span>
                    {entry.days_with_pending_closing > 0 && (
                      <span
                        title={`${entry.days_with_pending_closing} day(s) still awaiting closing entries — numbers may shift once recorded.`}
                        className="flex items-center gap-1 text-xs text-muted"
                      >
                        <AlertCircle size={13} />
                        {entry.days_with_pending_closing} pending
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}