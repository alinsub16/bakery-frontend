import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { correctInventory, fetchInventory, fetchOpeningStock, submitInventory } from './api'
import type { CorrectInventoryValues, SubmitInventoryValues } from '@/types/inventory'

const INVENTORY_KEY = ['inventory']
const DASHBOARD_KEY = ['dashboard', 'summary']

export function useInventory(filters: { date?: string; bread_id?: number } = {}) {
  return useQuery({
    queryKey: [...INVENTORY_KEY, filters],
    queryFn: () => fetchInventory(filters),
  })
}

export function useOpeningStock(breadId: number | null) {
  return useQuery({
    queryKey: ['inventory', 'opening-stock', breadId],
    queryFn: () => fetchOpeningStock(breadId!),
    enabled: breadId !== null, // only fetch once a bread is actually selected
  })
}

export function useSubmitInventory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: SubmitInventoryValues) => submitInventory(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}

export function useCorrectInventory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: CorrectInventoryValues }) =>
      correctInventory(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}