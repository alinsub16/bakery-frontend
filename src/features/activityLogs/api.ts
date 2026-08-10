import { apiClient } from '@/lib/apiClient'
import type { ActivityLogEntry } from '@/types/activityLog'
import type { PaginatedResponse } from '@/types/pagination'

interface ActivityLogFilters {
  subject_type?: string
  action?: string
  user_id?: number
  from?: string
  to?: string
  page?: number
}

export async function fetchActivityLogs(filters: ActivityLogFilters = {}) {
  const { data } = await apiClient.get<PaginatedResponse<ActivityLogEntry>>('/activity-logs', {
    params: filters,
  })
  return data
}