export interface TodayTotals {
  total_sold_quantity: number
  total_revenue: number
  total_profit: number
  breads_reported: number
}

export interface PendingBread {
  id: number
  name: string
  sku: string
}

export interface ClosingPendingBread extends PendingBread {
  quantity_produced: number
}

export interface LowStockBread extends PendingBread {
  opening_stock: number
}

export interface WeekTrend {
  this_week_revenue: number
  last_week_revenue: number
  change_percent: number | null
}

export interface DashboardSummary {
  date: string
  today: TodayTotals
  pending: {
    needs_production: PendingBread[]
    needs_closing: ClosingPendingBread[]
  }
  low_stock: LowStockBread[]
  week_trend: WeekTrend
}