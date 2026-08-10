import { useQuery } from '@tanstack/react-query'
import { fetchProductionVariance } from './api'

export function useProductionVariance(from: string, to: string, categoryId?: number) {
  return useQuery({
    queryKey: ['reports', 'production-variance', from, to, categoryId],
    queryFn: () => fetchProductionVariance(from, to, categoryId),
  })
}