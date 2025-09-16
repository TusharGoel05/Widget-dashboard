"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/dashboard-data"
import { WidgetCard } from "./widget-card"
import { AddWidgetDialog } from "./add-widget-dialog"
import { useState } from "react"

interface CategorySectionProps {
  category: Category
}

export function CategorySection({ category }: CategorySectionProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="category-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="category-title">{category.name}</h2>
        <Button
          onClick={() => setShowAddDialog(true)}
          variant="outline"
          size="sm"
          className="gap-2 bg-white hover:bg-gray-50 border-gray-300"
        >
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </div>

      <div className="widget-grid">
        {category.widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} categoryId={category.id} />
        ))}

        {category.widgets.length === 0 && (
          <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">No widgets in this category</p>
                <Button
                  onClick={() => setShowAddDialog(true)}
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-gray-600 hover:text-gray-800"
                >
                  <Plus className="h-4 w-4" />
                  Add your first widget
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AddWidgetDialog
        categoryId={category.id}
        categoryName={category.name}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </div>
  )
}
