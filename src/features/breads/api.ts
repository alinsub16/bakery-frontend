import { apiClient } from '@/lib/apiClient'
import type { Bread, BreadFormValues } from '@/types/bread'
import type { PaginatedResponse } from '@/types/pagination'

interface BreadFilters {
  category_id?: number
  is_active?: boolean
  search?: string
}

export async function fetchBreads(filters: BreadFilters = {}) {
  const { data } = await apiClient.get<PaginatedResponse<Bread>>('/breads', { params: filters })
  return data
}

export async function createBread(values: BreadFormValues) {
  const { data } = await apiClient.post<{ data: Bread }>('/breads', values)
  return data.data
}

export async function updateBread(id: number, values: BreadFormValues) {
  const { data } = await apiClient.put<{ data: Bread }>(`/breads/${id}`, values)
  return data.data
}

export async function toggleBreadStatus(id: number, activate: boolean) {
  const action = activate ? 'activate' : 'deactivate'
  const { data } = await apiClient.patch<{ data: Bread }>(`/breads/${id}/${action}`)
  return data.data
}