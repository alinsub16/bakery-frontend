import { useState } from 'react'
import { DollarSign, TrendingUp, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { RevenueBarChart } from '@/components/charts/RevenueBarChart'
import { useSalesYearly } from '../hooks'
import { formatCurrency } from '@/lib/format'

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function YearlyView() {
  const [year, setYear] = useState(new Date().getFullYear())

  const { data, isLoading, isError } = useSalesYearly(year)

  const chartData = (data?.monthly_breakdown ?? []).map((entry) => ({
    label: MONTH_LABELS[entry.month - 1],
    revenue: entry.revenue,
  }))

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-muted">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="mt-1 w-24 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        />
      </div>

      {isError ? (
        <p className="text-sm text-danger">Couldn't load this year.</p>
      ) : isLoading || !data ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-white" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <StatCard label="Total revenue" value={formatCurrency(data.total_revenue)} icon={<DollarSign size={20} />} />
            <StatCard label="Total profit" value={formatCurrency(data.total_profit)} icon={<TrendingUp size={20} />} accent="success" />
            <StatCard label="Units sold" value={data.total_sold_quantity.toLocaleString()} icon={<ShoppingBag size={20} />} />
          </div>

          <Card title={`Revenue by month — ${year}`}>
            <RevenueBarChart data={chartData} emptyMessage="No sales recorded this year yet." />
          </Card>
        </>
      )}
    </div>
  )
}