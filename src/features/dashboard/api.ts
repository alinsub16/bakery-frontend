import { apiClient } from '@/lib/apiClient'
import type { DashboardSummary } from '@/types/dashboard'

export async function fetchDashboardSummary(lowStockThreshold = 10) {
  const { data } = await apiClient.get<DashboardSummary>('/dashboard/summary', {
    params: { low_stock_threshold: lowStockThreshold },
  })
  return data
}