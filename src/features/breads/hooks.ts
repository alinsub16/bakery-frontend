import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBread, fetchBreads, toggleBreadStatus, updateBread } from './api'
import type { BreadFormValues } from '@/types/bread'

const BREADS_KEY = ['breads']

export function useBreads(filters: { category_id?: number; is_active?: boolean; search?: string } = {}) {
  return useQuery({
    queryKey: [...BREADS_KEY, filters],
    queryFn: () => fetchBreads(filters),
  })
}

export function useCreateBread() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: BreadFormValues) => createBread(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BREADS_KEY }),
  })
}

export function useUpdateBread() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: BreadFormValues }) => updateBread(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BREADS_KEY }),
  })
}

export function useToggleBreadStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, activate }: { id: number; activate: boolean }) => toggleBreadStatus(id, activate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BREADS_KEY }),
  })
}