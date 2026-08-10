import { actionLabel, describeActivityLog } from '../describe'
import type { ActivityLogEntry } from '@/types/activityLog'

interface LogTableProps {
  entries: ActivityLogEntry[]
}

export function LogTable({ entries }: LogTableProps) {
  if (entries.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No activity found for these filters.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Action</th>
            <th className="pb-3 font-medium">Details</th>
            <th className="pb-3 font-medium">By</th>
            <th className="pb-3 font-medium">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="py-3">
                <span className="inline-flex items-center rounded-full bg-cream/50 px-2.5 py-0.5 text-xs font-medium text-ink">
                  {actionLabel(entry.action)}
                </span>
              </td>
              <td className="py-3 text-ink">{describeActivityLog(entry)}</td>
              <td className="py-3 text-muted">{entry.user.name}</td>
              <td className="py-3 text-muted">
                {new Date(entry.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}