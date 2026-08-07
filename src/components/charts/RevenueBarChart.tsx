import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/format'

interface RevenueBarChartProps {
  data: { label: string; revenue: number }[]
  emptyMessage?: string
  layout?: 'horizontal' | 'vertical'
}

export function RevenueBarChart({ data, emptyMessage = 'No data for this period.', layout = 'horizontal' }: RevenueBarChartProps) {
  if (data.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">{emptyMessage}</p>
  }

  const isVertical = layout === 'vertical'

  return (
    <div className={isVertical ? `h-[${Math.max(data.length * 40, 200)}px]` : 'h-64'} style={isVertical ? { height: Math.max(data.length * 40, 200) } : undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={isVertical ? 'vertical' : 'horizontal'} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EFE6C8" horizontal={!isVertical} vertical={isVertical} />
          {isVertical ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: '#8A7A6B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₱${v}`} />
              <YAxis type="category" dataKey="label" tick={{ fontSize: 12, fill: '#2B1B12' }} axisLine={false} tickLine={false} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#8A7A6B' }} axisLine={{ stroke: '#EFE6C8' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8A7A6B' }} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => `₱${v}`} />
            </>
          )}
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #EFE6C8', fontSize: 13 }}
            formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#E98B50" radius={isVertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}