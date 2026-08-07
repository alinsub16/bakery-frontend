import { apiClient } from '@/lib/apiClient'
import type {
  ByBreadEntry,
  MonthlySalesResponse,
  SalesRangeResponse,
  YearlySalesResponse,
} from '@/types/sales'

export async function fetchSalesRange(from: string, to: string, categoryId?: number) {
  const { data } = await apiClient.get<SalesRangeResponse>('/sales/range', {
    params: { from, to, category_id: categoryId },
  })
  return data
}

export async function fetchSalesByBread(from: string, to: string, categoryId?: number) {
  const { data } = await apiClient.get<ByBreadEntry[]>('/sales/by-bread', {
    params: { from, to, category_id: categoryId },
  })
  return data
}

export async function fetchSalesMonthly(year: number, month: number) {
  const { data } = await apiClient.get<MonthlySalesResponse>('/sales/monthly', {
    params: { year, month },
  })
  return data
}

export async function fetchSalesYearly(year: number) {
  const { data } = await apiClient.get<YearlySalesResponse>('/sales/yearly', {
    params: { year },
  })
  return data
}