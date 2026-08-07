import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/format'

interface RevenueAreaChartProps {
  data: { date: string; revenue: number }[]
  emptyMessage?: string
}

export function RevenueAreaChart({ data, emptyMessage = 'No sales recorded in this period yet.' }: RevenueAreaChartProps) {
  const chartData = data.map((entry) => ({
    label: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: entry.revenue,
  }))

  if (chartData.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">{emptyMessage}</p>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E98B50" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#E98B50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EFE6C8" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#8A7A6B' }} axisLine={{ stroke: '#EFE6C8' }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: '#8A7A6B' }}
            axisLine={false}
            tickLine={false}
            width={52}
            tickFormatter={(value) => `₱${value}`}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #EFE6C8', fontSize: 13 }}
            formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
          />
          <Area type="monotone" dataKey="revenue" stroke="#E98B50" strokeWidth={2} fill="url(#revenueFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}