export interface VarianceEntry {
  bread: { id: number; name: string; sku: string }
  total_produced: number
  total_sold: number
  variance: number
  variance_percent: number
  avg_daily_closing_stock: number
  days_with_production: number
  days_with_pending_closing: number
}

export interface VarianceReportResponse {
  from: string
  to: string
  breads: VarianceEntry[]
}