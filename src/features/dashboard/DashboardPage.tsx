import { DollarSign, TrendingUp, ShoppingBag, Package } from 'lucide-react'
import { StatCard } from './components/StatCard'
import { RevenueTrendChart } from './components/RevenueTrendChart'
import { PendingLists } from './components/PendingLists'
import { LowStockList } from './components/LowStockList'
import { useDashboardSummary, useRevenueTrend } from './hooks'
import { formatCurrency } from '@/lib/format'

export function DashboardPage() {
  const { data: summary, isLoading, isError } = useDashboardSummary()
  const { data: trend } = useRevenueTrend(14)

  if (isLoading) return <DashboardSkeleton />

  if (isError || !summary) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center">
        <p className="text-sm text-danger">Couldn't load the dashboard. Try refreshing.</p>
      </div>
    )
  }

  const { today, pending, low_stock, week_trend } = summary

  return (
    <div className="space-y-6 over">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(summary.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Today's revenue" value={formatCurrency(today.total_revenue)} icon={<DollarSign size={20} />} />
        <StatCard label="Today's profit" value={formatCurrency(today.total_profit)} icon={<TrendingUp size={20} />} accent="success" />
        <StatCard label="Units sold" value={today.total_sold_quantity.toLocaleString()} icon={<ShoppingBag size={20} />} />
        <StatCard label="Breads reported" value={today.breads_reported.toString()} icon={<Package size={20} />} />
      </div>

      {week_trend.change_percent !== null && (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm">
          <TrendingUp
            size={16}
            className={week_trend.change_percent >= 0 ? 'text-success' : 'rotate-180 text-danger'}
          />
          <span className="font-semibold text-ink">
            {week_trend.change_percent >= 0 ? '+' : ''}
            {week_trend.change_percent}%
          </span>
          <span className="text-muted">vs. last week's revenue ({formatCurrency(week_trend.last_week_revenue)})</span>
        </div>
      )}

      {trend && <RevenueTrendChart data={trend.daily_breakdown} />}

      <PendingLists needsProduction={pending.needs_production} needsClosing={pending.needs_closing} />

      <LowStockList items={low_stock} />
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg bg-cream/60" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-border bg-white" />
        ))}
      </div>
      <div className="h-64 rounded-2xl border border-border bg-white" />
    </div>
  )
}