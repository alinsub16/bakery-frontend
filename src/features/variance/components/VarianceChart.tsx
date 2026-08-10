import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { getVarianceSeverity, severityConfig } from '../severity'
import type { VarianceEntry } from '@/types/variance'

interface VarianceChartProps {
  entries: VarianceEntry[]
}

export function VarianceChart({ entries }: VarianceChartProps) {
  const chartData = entries.slice(0, 10).map((entry) => ({
    label: entry.bread.name,
    percent: entry.variance_percent,
    severity: getVarianceSeverity(entry.variance_percent),
  }))

  if (chartData.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No production activity in this range.</p>
  }

  return (
    <div style={{ height: Math.max(chartData.length * 40, 200) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EFE6C8" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: '#8A7A6B' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 12, fill: '#2B1B12' }}
            axisLine={false}
            tickLine={false}
            width={130}
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #EFE6C8', fontSize: 13 }}
            formatter={(value) => [`${value}%`, 'Variance']}
          />
          <Bar dataKey="percent" radius={[0, 6, 6, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={severityConfig[entry.severity].bar} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}