import { useState } from 'react'
import { Tabs } from '@/components/ui/Tabs'
import { RangeView } from './components/RangeView'
import { ByBreadView } from './components/ByBreadView'
import { MonthlyView } from './components/MonthlyView'
import { YearlyView } from './components/YearlyView'

type SalesTab = 'range' | 'by-bread' | 'monthly' | 'yearly'

export function SalesPage() {
  const [tab, setTab] = useState<SalesTab>('range')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Sales</h1>
          <p className="mt-1 text-sm text-muted">Revenue, profit, and sales performance over time.</p>
        </div>
        <Tabs
          value={tab}
          onChange={setTab}
          options={[
            { value: 'range', label: 'Date range' },
            { value: 'by-bread', label: 'By bread' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
        />
      </div>

      {tab === 'range' && <RangeView />}
      {tab === 'by-bread' && <ByBreadView />}
      {tab === 'monthly' && <MonthlyView />}
      {tab === 'yearly' && <YearlyView />}
    </div>
  )
}