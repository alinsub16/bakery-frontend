import { useQuery } from '@tanstack/react-query'
import { fetchSalesByBread, fetchSalesMonthly, fetchSalesRange, fetchSalesYearly } from './api'

export function useSalesRange(from: string, to: string, categoryId?: number) {
  return useQuery({
    queryKey: ['sales', 'range', from, to, categoryId],
    queryFn: () => fetchSalesRange(from, to, categoryId),
  })
}

export function useSalesByBread(from: string, to: string, categoryId?: number) {
  return useQuery({
    queryKey: ['sales', 'by-bread', from, to, categoryId],
    queryFn: () => fetchSalesByBread(from, to, categoryId),
  })
}

export function useSalesMonthly(year: number, month: number) {
  return useQuery({
    queryKey: ['sales', 'monthly', year, month],
    queryFn: () => fetchSalesMonthly(year, month),
  })
}

export function useSalesYearly(year: number) {
  return useQuery({
    queryKey: ['sales', 'yearly', year],
    queryFn: () => fetchSalesYearly(year),
  })
}