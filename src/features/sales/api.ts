import { apiClient } from '@/lib/apiClient'
import type { SalesRangeResponse } from '@/types/sales'

export async function fetchSalesRange(from: string, to: string) {
  const { data } = await apiClient.get<SalesRangeResponse>('/sales/range', {
    params: { from, to },
  })
  return data
}