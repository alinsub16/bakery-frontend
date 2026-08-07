import { useState } from 'react'
import { DollarSign, TrendingUp, ShoppingBag, Package } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { RevenueAreaChart } from '@/components/charts/RevenueAreaChart'
import { useSalesRange } from '../hooks'
import { formatCurrency, formatISODate, subtractDays } from '@/lib/format'

export function RangeView() {
  const [from, setFrom] = useState(formatISODate(subtractDays(new Date(), 29)))
  const [to, setTo] = useState(formatISODate(new Date()))

  const { data, isLoading, isError } = useSalesRange(from, to)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <DateField label="From" value={from} onChange={setFrom} max={to} />
        <DateField label="To" value={to} onChange={setTo} max={formatISODate(new Date())} />
      </div>

      {isError ? (
        <p className="text-sm text-danger">Couldn't load this range — it may exceed the 90-day limit.</p>
      ) : isLoading || !data ? (
        <StatSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total revenue" value={formatCurrency(data.total_revenue)} icon={<DollarSign size={20} />} />
            <StatCard label="Total profit" value={formatCurrency(data.total_profit)} icon={<TrendingUp size={20} />} accent="success" />
            <StatCard label="Units sold" value={data.total_sold_quantity.toLocaleString()} icon={<ShoppingBag size={20} />} />
            <StatCard label="Breads reported" value={data.breads_reported.toString()} icon={<Package size={20} />} />
          </div>

          <Card title="Revenue by day">
            <RevenueAreaChart data={data.daily_breakdown} />
          </Card>
        </>
      )}
    </div>
  )
}

function DateField({ label, value, onChange, max }: { label: string; value: string; onChange: (v: string) => void; max?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted">{label}</label>
      <input
        type="date"
        value={value}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
      />
    </div>
  )
}

function StatSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-white" />
      ))}
    </div>
  )
}