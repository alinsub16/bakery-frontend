import type { ActivityLogEntry } from '@/types/activityLog'

export function describeActivityLog(entry: ActivityLogEntry): string {
  const p = entry.properties

  switch (entry.action) {
    case 'production.corrected':
      return `Changed production quantity from ${p.old_quantity} to ${p.new_quantity}`
    case 'inventory.corrected':
      return `Changed closing stock from ${p.old_closing_stock} to ${p.new_closing_stock} (sold: ${p.old_sold_quantity} → ${p.new_sold_quantity})`
    default:
      return entry.action.replace(/\./g, ' ').replace(/_/g, ' ')
  }
}

export function actionLabel(action: string): string {
  const labels: Record<string, string> = {
    'production.corrected': 'Production correction',
    'inventory.corrected': 'Inventory correction',
  }
  return labels[action] ?? action
}