import { BarChart3 } from "lucide-react"

export function NoDataChart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <BarChart3 className="w-16 h-16 mb-4 opacity-30" />
      <p className="text-sm font-medium">No Graph data available!</p>
    </div>
  )
}
