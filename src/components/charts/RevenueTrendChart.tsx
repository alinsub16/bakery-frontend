import { Card } from '@/components/ui/Card'
import { RevenueAreaChart } from '@/components/charts/RevenueAreaChart'
import type { DailyBreakdownEntry } from '@/types/sales'

interface RevenueTrendChartProps {
  data: DailyBreakdownEntry[]
}

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <Card title="Revenue — last 14 days">
      <RevenueAreaChart data={data} />
    </Card>
  )
}