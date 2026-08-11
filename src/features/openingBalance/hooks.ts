import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchOpeningBalance, setOpeningBalance } from './api'
import type { SetOpeningBalanceValues } from '@/types/openingBalance'

export function useOpeningBalance(breadId: number | null) {
  return useQuery({
    queryKey: ['opening-balance', breadId],
    queryFn: () => fetchOpeningBalance(breadId!),
    enabled: breadId !== null,
    retry: false, // 404 is expected/normal here ("none set yet"), don't retry it
  })
}

export function useSetOpeningBalance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ breadId, values }: { breadId: number; values: SetOpeningBalanceValues }) =>
      setOpeningBalance(breadId, values),
    onSuccess: (_data, { breadId }) => {
      queryClient.invalidateQueries({ queryKey: ['opening-balance', breadId] })
    },
  })
}