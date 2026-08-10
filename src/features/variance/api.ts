import { apiClient } from '@/lib/apiClient'
import type { VarianceReportResponse } from '@/types/variance'

export async function fetchProductionVariance(from: string, to: string, categoryId?: number) {
  const { data } = await apiClient.get<VarianceReportResponse>('/reports/production-variance', {
    params: { from, to, category_id: categoryId },
  })
  return data
}