"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Widget } from "@/lib/dashboard-data"
import { useDashboardStore } from "@/lib/dashboard-store"
import { DonutChart } from "@/components/charts/donut-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { NoDataChart } from "@/components/charts/no-data-chart"

interface WidgetCardProps {
  widget: Widget
  categoryId: string
}

export function WidgetCard({ widget, categoryId }: WidgetCardProps) {
  const { removeWidget } = useDashboardStore()

  const handleRemove = () => {
    removeWidget(categoryId, widget.id)
  }

  const renderChart = () => {
    if (widget.type === "donut" && widget.data) {
      return <DonutChart data={widget.data.items || []} total={widget.data.total || 0} />
    }

    if (widget.type === "bar" && widget.data) {
      return <BarChart data={widget.data.items || []} total={widget.data.total || 0} />
    }

    if (widget.type === "text") {
      return <NoDataChart />
    }

    return <p className="text-sm text-gray-600 leading-relaxed">{widget.text}</p>
  }

  return (
    <Card className="widget-card-enhanced relative group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-gray-700 pr-8 leading-tight">{widget.name}</CardTitle>
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 rounded-full"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{renderChart()}</CardContent>
    </Card>
  )
}
