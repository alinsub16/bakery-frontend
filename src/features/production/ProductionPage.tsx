import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { RoleGate } from '@/components/ui/RoleGate'
import { useProduction } from './hooks'
import { QuickLogForm } from './components/QuickLogForm'
import { ProductionTable } from './components/ProductionTable'
import { CorrectProductionModal } from './components/CorrectProductionModal'
import { formatISODate } from '@/lib/format'
import type { ProductionEntry } from '@/types/production'

export function ProductionPage() {
  const [date, setDate] = useState(formatISODate(new Date()))
  const [correctingEntry, setCorrectingEntry] = useState<ProductionEntry | null>(null)

  const { data, isLoading, isError } = useProduction({ date })

  const isToday = date === formatISODate(new Date())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Production</h1>
        <p className="mt-1 text-sm text-muted">Log what's been baked and review past entries.</p>
      </div>

      <RoleGate allowedRoles={['admin', 'manager', 'baker', 'inventory_clerk']}>
        <QuickLogForm />
      </RoleGate>

      <Card padding="md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-ink">
            {isToday ? "Today's entries" : `Entries for ${date}`}
          </h3>
          <input
            type="date"
            value={date}
            max={formatISODate(new Date())}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
          />
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <p className="py-12 text-center text-sm text-danger">Couldn't load production entries.</p>
        ) : (
          <ProductionTable entries={data?.data ?? []} onCorrect={setCorrectingEntry} />
        )}
      </Card>

      <CorrectProductionModal
        isOpen={Boolean(correctingEntry)}
        onClose={() => setCorrectingEntry(null)}
        entry={correctingEntry}
      />
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-cream/40" />
      ))}
    </div>
  )
}