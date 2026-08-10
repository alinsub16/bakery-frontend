export type VarianceSeverity = 'low' | 'moderate' | 'high'

export function getVarianceSeverity(percent: number): VarianceSeverity {
  if (percent >= 25) return 'high'
  if (percent >= 10) return 'moderate'
  return 'low'
}

export const severityConfig: Record<VarianceSeverity, { label: string; badge: string; bar: string }> = {
  low: { label: 'On target', badge: 'bg-success/10 text-success', bar: '#4A8B5C' },
  moderate: { label: 'Watch', badge: 'bg-warning/10 text-warning', bar: '#C7962F' },
  high: { label: 'Overproducing', badge: 'bg-danger/10 text-danger', bar: '#C1523D' },
}