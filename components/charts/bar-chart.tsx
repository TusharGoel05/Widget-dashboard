"use client"

interface BarChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  total: number
}

export function BarChart({ data, total }: BarChartProps) {
  return (
    <div className="space-y-4">
      <div className="chart-total-display">
        <div className="chart-total-number">{total}</div>
        <div className="chart-total-label">Total Vulnerabilities</div>
      </div>

      <div className="space-y-3">
        <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
          {data.map((item, index) => (
            <div
              key={index}
              className="h-full"
              style={{
                backgroundColor: item.color,
                width: `${(item.value / total) * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="chart-legend-item">
              <div className="chart-legend-dot" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium ml-auto text-gray-800">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
