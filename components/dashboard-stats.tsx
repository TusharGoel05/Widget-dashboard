"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardStore } from "@/lib/dashboard-store"
import { BarChart3, Grid3X3, Layers } from "lucide-react"

export function DashboardStats() {
  const { categories, getTotalWidgetCount } = useDashboardStore()
  const totalWidgets = getTotalWidgetCount()
  const totalCategories = categories.length
  const averageWidgetsPerCategory = totalCategories > 0 ? Math.round(totalWidgets / totalCategories) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Widgets</CardTitle>
          <Grid3X3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWidgets}</div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCategories}</div>
          <p className="text-xs text-muted-foreground">Active dashboard sections</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average per Category</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageWidgetsPerCategory}</div>
          <p className="text-xs text-muted-foreground">Widgets per category</p>
        </CardContent>
      </Card>
    </div>
  )
}
