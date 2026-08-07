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
export interface ByBreadEntry {
  bread: { id: number; name: string; sku: string }
  total_sold_quantity: number
  total_revenue: number
  total_profit: number
}

export interface MonthlyBreakdownEntry {
  month: number
  sold_quantity: number
  revenue: number
  profit: number
}

export interface MonthlySalesResponse {
  year: number
  month: number
  total_sold_quantity: number
  total_revenue: number
  total_cost: number
  total_profit: number
  breads_reported: number
  daily_breakdown: DailyBreakdownEntry[]
}

export interface YearlySalesResponse {
  year: number
  total_sold_quantity: number
  total_revenue: number
  total_cost: number
  total_profit: number
  breads_reported: number
  monthly_breakdown: MonthlyBreakdownEntry[]
}