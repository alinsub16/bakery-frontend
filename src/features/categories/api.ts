import { apiClient } from '@/lib/apiClient'
import type { Category, CategoryFormValues } from '@/types/category'
import type { PaginatedResponse } from '@/types/pagination'

interface CategoryFilters {
  is_active?: boolean
  search?: string
}

export async function fetchCategories(filters: CategoryFilters = {}) {
  const { data } = await apiClient.get<PaginatedResponse<Category>>('/categories', {
    params: filters,
  })
  return data
}

export async function createCategory(values: CategoryFormValues) {
  const { data } = await apiClient.post<{ data: Category }>('/categories', values)
  return data.data
}

export async function updateCategory(id: number, values: CategoryFormValues) {
  const { data } = await apiClient.put<{ data: Category }>(`/categories/${id}`, values)
  return data.data
}

export async function toggleCategoryStatus(id: number, activate: boolean) {
  const action = activate ? 'activate' : 'deactivate'
  const { data } = await apiClient.patch<{ data: Category }>(`/categories/${id}/${action}`)
  return data.data
}