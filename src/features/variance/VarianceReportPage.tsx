import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { useProductionVariance } from './hooks'
import { useCategories } from '@/features/categories/hooks'
import { VarianceChart } from './components/VarianceChart'
import { VarianceTable } from './components/VarianceTable'
import { formatISODate, subtractDays } from '@/lib/format'

export function VarianceReportPage() {
  const [from, setFrom] = useState(formatISODate(subtractDays(new Date(), 29)))
  const [to, setTo] = useState(formatISODate(new Date()))
  const [categoryId, setCategoryId] = useState('')

  const { data: categoriesData } = useCategories({ is_active: true })
  const { data, isLoading, isError } = useProductionVariance(
    from,
    to,
    categoryId ? Number(categoryId) : undefined
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Production Variance</h1>
        <p className="mt-1 text-sm text-muted">
          Compares what was baked against what actually sold — spot consistent overproduction early.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-muted">From</label>
          <input
            type="date"
            value={from}
            max={to}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted">To</label>
          <input
            type="date"
            value={to}
            max={formatISODate(new Date())}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          >
            <option value="">All categories</option>
            {categoriesData?.data.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isError ? (
        <p className="text-sm text-danger">Couldn't load this range — it may exceed the 90-day limit.</p>
      ) : isLoading || !data ? (
        <div className="space-y-4">
          <div className="h-64 animate-pulse rounded-2xl border border-border bg-white" />
          <div className="h-48 animate-pulse rounded-2xl border border-border bg-white" />
        </div>
      ) : (
        <>
          <Card title="Highest variance breads">
            <VarianceChart entries={data.breads} />
          </Card>

          <Card padding="md">
            <VarianceTable entries={data.breads} />
          </Card>
        </>
      )}
    </div>
  )
}