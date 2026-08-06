import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCategory, fetchCategories, toggleCategoryStatus, updateCategory } from './api'
import type { CategoryFormValues } from '@/types/category'

const CATEGORIES_KEY = ['categories']

export function useCategories(filters: { is_active?: boolean; search?: string } = {}) {
  return useQuery({
    queryKey: [...CATEGORIES_KEY, filters],
    queryFn: () => fetchCategories(filters),
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: CategoryFormValues) => createCategory(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: CategoryFormValues }) => updateCategory(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  })
}

export function useToggleCategoryStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, activate }: { id: number; activate: boolean }) => toggleCategoryStatus(id, activate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  })
}