import { useQuery } from '@tanstack/react-query'
import { fetchDashboardSummary } from './api'
import { fetchSalesRange } from '@/features/sales/api'
import { formatISODate, subtractDays } from '@/lib/format'

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => fetchDashboardSummary(),
    refetchInterval: 60_000, // keep it reasonably fresh without manual refresh
  })
}

export function useRevenueTrend(days = 14) {
  const to = formatISODate(new Date())
  const from = formatISODate(subtractDays(new Date(), days - 1))

  return useQuery({
    queryKey: ['sales', 'range', from, to],
    queryFn: () => fetchSalesRange(from, to),
  })
}