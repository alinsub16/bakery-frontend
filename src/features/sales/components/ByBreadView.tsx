import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { RevenueBarChart } from '@/components/charts/RevenueBarChart'
import { useSalesByBread } from '../hooks'
import { formatCurrency, formatISODate, subtractDays } from '@/lib/format'

export function ByBreadView() {
  const [from, setFrom] = useState(formatISODate(subtractDays(new Date(), 29)))
  const [to, setTo] = useState(formatISODate(new Date()))

  const { data, isLoading, isError } = useSalesByBread(from, to)

  const chartData = (data ?? []).slice(0, 8).map((entry) => ({
    label: entry.bread.name,
    revenue: entry.total_revenue,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <DateField label="From" value={from} onChange={setFrom} max={to} />
        <DateField label="To" value={to} onChange={setTo} max={formatISODate(new Date())} />
      </div>

      {isError ? (
        <p className="text-sm text-danger">Couldn't load this range.</p>
      ) : isLoading ? (
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-white" />
      ) : (
        <>
          <Card title="Top breads by revenue">
            <RevenueBarChart data={chartData} layout="vertical" />
          </Card>

          <Card padding="md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="pb-3 font-medium">Bread</th>
                  <th className="pb-3 font-medium">Units sold</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(data ?? []).map((entry) => (
                  <tr key={entry.bread.id}>
                    <td className="py-3 font-medium text-ink">{entry.bread.name}</td>
                    <td className="py-3 text-muted">{entry.total_sold_quantity}</td>
                    <td className="py-3 text-ink">{formatCurrency(entry.total_revenue)}</td>
                    <td className="py-3 text-success">{formatCurrency(entry.total_profit)}</td>
                  </tr>
                ))}
                {(data ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted">
                      No sales in this range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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