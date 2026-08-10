import { useQuery } from '@tanstack/react-query'
import { fetchActivityLogs } from './api'

interface UseActivityLogsFilters {
  subject_type?: string
  action?: string
  from?: string
  to?: string
  page?: number
}

export function useActivityLogs(filters: UseActivityLogsFilters = {}) {
  return useQuery({
    queryKey: ['activity-logs', filters],
    queryFn: () => fetchActivityLogs(filters),
    placeholderData: (previousData) => previousData, // smooth pagination, no flash-to-loading
  })
}