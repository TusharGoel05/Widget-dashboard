"use client"

import { Search, Shield, Settings, X, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboardStore } from "@/lib/dashboard-store"
import { WidgetManagementDialog } from "./widget-management-dialog"
import { useState, useEffect } from "react"

export function DashboardHeader() {
  const { searchTerm, setSearchTerm, clearSearch, resetToDefault, getTotalWidgetCount } = useDashboardStore()
  const [showManagementDialog, setShowManagementDialog] = useState(false)
  const totalWidgets = getTotalWidgetCount()

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.getElementById("search-input") as HTMLInputElement
        searchInput?.focus()
      }

      if (e.key === "Escape" && searchTerm) {
        clearSearch()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [searchTerm, clearSearch])

  const handleReset = () => {
    if (confirm("Are you sure you want to reset the dashboard to default? This will remove all custom widgets.")) {
      resetToDefault()
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">CSPM Dashboard</h1>
                <p className="text-sm text-muted-foreground">{totalWidgets} widgets configured</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search-input"
                placeholder="Search widgets... (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-10"
              />
              {searchTerm && (
                <Button
                  onClick={clearSearch}
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Settings className="h-4 w-4" />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowManagementDialog(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Widgets
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleReset} className="text-destructive">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <WidgetManagementDialog open={showManagementDialog} onOpenChange={setShowManagementDialog} />
    </header>
  )
}
