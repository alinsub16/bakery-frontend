import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { correctProduction, fetchProduction, submitProduction } from './api'
import type { CorrectProductionValues, SubmitProductionValues } from '@/types/production'

const PRODUCTION_KEY = ['production']
const DASHBOARD_KEY = ['dashboard', 'summary']

export function useProduction(filters: { date?: string; bread_id?: number } = {}) {
  return useQuery({
    queryKey: [...PRODUCTION_KEY, filters],
    queryFn: () => fetchProduction(filters),    
  })
}

export function useSubmitProduction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: SubmitProductionValues) => submitProduction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTION_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY }) // needs_production/needs_closing shift
    },
  })
}

export function useCorrectProduction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: CorrectProductionValues }) =>
      correctProduction(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTION_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}