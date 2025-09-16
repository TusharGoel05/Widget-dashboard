"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface DonutChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  total: number
}

export function DonutChart({ data, total }: DonutChartProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="chart-legend-item">
            <div className="chart-legend-dot" style={{ backgroundColor: item.color }} />
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium ml-auto text-gray-800">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}
