import { apiClient } from '@/lib/apiClient'
import type {
  CorrectInventoryValues,
  InventoryEntry,
  OpeningStockResponse,
  SubmitInventoryValues,
} from '@/types/inventory'
import type { PaginatedResponse } from '@/types/pagination'

interface InventoryFilters {
  date?: string
  bread_id?: number
}

export async function fetchInventory(filters: InventoryFilters = {}) {
  const { data } = await apiClient.get<PaginatedResponse<InventoryEntry>>('/inventory', {
    params: filters,
  })
  return data
}

export async function fetchOpeningStock(breadId: number) {
  const { data } = await apiClient.get<OpeningStockResponse>(`/inventory/opening-stock/${breadId}`)
  return data
}

export async function submitInventory(values: SubmitInventoryValues) {
  const { data } = await apiClient.post<{ data: InventoryEntry }>('/inventory', values)
  return data.data
}

export async function correctInventory(id: number, values: CorrectInventoryValues) {
  const { data } = await apiClient.put<{ data: InventoryEntry }>(`/inventory/${id}`, values)
  return data.data
}