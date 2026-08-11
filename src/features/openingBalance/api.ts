import { apiClient } from '@/lib/apiClient'
import type { OpeningBalance, SetOpeningBalanceValues } from '@/types/openingBalance'

export async function fetchOpeningBalance(breadId: number) {
  const { data } = await apiClient.get<OpeningBalance>(`/breads/${breadId}/opening-balance`)
  return data
}

export async function setOpeningBalance(breadId: number, values: SetOpeningBalanceValues) {
  const { data } = await apiClient.post<OpeningBalance>(`/breads/${breadId}/opening-balance`, values)
  return data
}