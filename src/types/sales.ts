export interface DailyBreakdownEntry {
  date: string
  sold_quantity: number
  revenue: number
  profit: number
}

export interface SalesRangeResponse {
  from: string
  to: string
  total_sold_quantity: number
  total_revenue: number
  total_cost: number
  total_profit: number
  breads_reported: number
  daily_breakdown: DailyBreakdownEntry[]
}