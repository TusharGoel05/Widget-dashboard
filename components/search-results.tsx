"use client"

import { useDashboardStore } from "@/lib/dashboard-store"
import { WidgetCard } from "./widget-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function SearchResults() {
  const { searchTerm, getFilteredWidgets, clearSearch } = useDashboardStore()
  const filteredWidgets = getFilteredWidgets()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground">Search Results for "{searchTerm}"</h2>
          <span className="text-sm text-muted-foreground">
            ({filteredWidgets.length} {filteredWidgets.length === 1 ? "result" : "results"})
          </span>
        </div>

        <Button onClick={clearSearch} variant="outline" size="sm" className="gap-2 bg-transparent">
          <X className="h-4 w-4" />
          Clear Search
        </Button>
      </div>

      {filteredWidgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWidgets.map(({ category, widget }) => (
            <div key={`${category.id}-${widget.id}`} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground font-medium">{category.name}</div>
                {category.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Category Match</div>
                )}
              </div>
              <WidgetCard widget={widget} categoryId={category.id} />
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No widgets found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse the categories below.
              </p>
              <Button onClick={clearSearch} variant="outline">
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
