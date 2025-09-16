"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useDashboardStore } from "@/lib/dashboard-store"
import type { Widget } from "@/lib/dashboard-data"
import { Settings, Trash2 } from "lucide-react"

interface WidgetManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WidgetManagementDialog({ open, onOpenChange }: WidgetManagementDialogProps) {
  const { categories, removeWidget } = useDashboardStore()
  const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(new Set())

  const handleWidgetToggle = (categoryId: string, widgetId: string) => {
    const key = `${categoryId}-${widgetId}`
    const newSelected = new Set(selectedWidgets)

    if (newSelected.has(key)) {
      newSelected.delete(key)
    } else {
      newSelected.add(key)
    }

    setSelectedWidgets(newSelected)
  }

  const handleRemoveSelected = () => {
    selectedWidgets.forEach((key) => {
      const [categoryId, widgetId] = key.split("-")
      removeWidget(categoryId, widgetId)
    })

    setSelectedWidgets(new Set())
  }

  const handleSelectAll = (categoryId: string, widgets: Widget[]) => {
    const newSelected = new Set(selectedWidgets)
    const allSelected = widgets.every((widget) => newSelected.has(`${categoryId}-${widget.id}`))

    if (allSelected) {
      // Deselect all in this category
      widgets.forEach((widget) => {
        newSelected.delete(`${categoryId}-${widget.id}`)
      })
    } else {
      // Select all in this category
      widgets.forEach((widget) => {
        newSelected.add(`${categoryId}-${widget.id}`)
      })
    }

    setSelectedWidgets(newSelected)
  }

  const isWidgetSelected = (categoryId: string, widgetId: string) => {
    return selectedWidgets.has(`${categoryId}-${widgetId}`)
  }

  const isCategoryAllSelected = (categoryId: string, widgets: Widget[]) => {
    return widgets.length > 0 && widgets.every((widget) => selectedWidgets.has(`${categoryId}-${widget.id}`))
  }

  const isCategoryPartiallySelected = (categoryId: string, widgets: Widget[]) => {
    const selectedCount = widgets.filter((widget) => selectedWidgets.has(`${categoryId}-${widget.id}`)).length
    return selectedCount > 0 && selectedCount < widgets.length
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Manage Widgets
          </DialogTitle>
          <DialogDescription>
            Select widgets to remove from categories. You can also uncheck widgets to hide them.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {selectedWidgets.size > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">
                {selectedWidgets.size} widget{selectedWidgets.size !== 1 ? "s" : ""} selected
              </span>
              <Button onClick={handleRemoveSelected} variant="destructive" size="sm" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Remove Selected
              </Button>
            </div>
          )}

          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={isCategoryAllSelected(category.id, category.widgets)}
                  onCheckedChange={() => handleSelectAll(category.id, category.widgets)}
                  className={
                    isCategoryPartiallySelected(category.id, category.widgets)
                      ? "data-[state=checked]:bg-primary/50"
                      : ""
                  }
                />
                <label htmlFor={`category-${category.id}`} className="text-sm font-medium cursor-pointer">
                  {category.name} ({category.widgets.length})
                </label>
              </div>

              <div className="ml-6 space-y-2">
                {category.widgets.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No widgets in this category</p>
                ) : (
                  category.widgets.map((widget) => (
                    <div key={widget.id} className="flex items-start gap-2">
                      <Checkbox
                        id={`widget-${category.id}-${widget.id}`}
                        checked={isWidgetSelected(category.id, widget.id)}
                        onCheckedChange={() => handleWidgetToggle(category.id, widget.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={`widget-${category.id}-${widget.id}`}
                          className="text-sm font-medium cursor-pointer block"
                        >
                          {widget.name}
                        </label>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{widget.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
