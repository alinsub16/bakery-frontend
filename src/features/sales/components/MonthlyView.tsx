import { useState } from 'react'
import { DollarSign, TrendingUp, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { RevenueAreaChart } from '@/components/charts/RevenueAreaChart'
import { useSalesMonthly } from '../hooks'
import { formatCurrency } from '@/lib/format'

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

export function MonthlyView() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)

  const { data, isLoading, isError } = useSalesMonthly(year, month)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-muted">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          >
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={i + 1}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-1 w-24 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </div>
      </div>

      {isError ? (
        <p className="text-sm text-danger">Couldn't load this month.</p>
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

          <Card title={`Daily revenue — ${MONTH_NAMES[month - 1]} ${year}`}>
            <RevenueAreaChart data={data.daily_breakdown} emptyMessage="No sales recorded this month yet." />
          </Card>
        </>
      )}
    </div>
  )
}