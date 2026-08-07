import { apiClient } from '@/lib/apiClient'
import type { CorrectProductionValues, ProductionEntry, SubmitProductionValues } from '@/types/production'
import type { PaginatedResponse } from '@/types/pagination'

interface ProductionFilters {
  date?: string
  bread_id?: number
}

export async function fetchProduction(filters: ProductionFilters = {}) {
  const { data } = await apiClient.get<PaginatedResponse<ProductionEntry>>('/production', {
    params: filters,
  })
  return data
}

export async function submitProduction(values: SubmitProductionValues) {
  const { data } = await apiClient.post<{ data: ProductionEntry }>('/production', values)
  return data.data
}

export async function correctProduction(id: number, values: CorrectProductionValues) {
  const { data } = await apiClient.put<{ data: ProductionEntry }>(`/production/${id}`, values)
  return data.data
}