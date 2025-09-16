"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDashboardStore } from "@/lib/dashboard-store"

interface AddWidgetDialogProps {
  categoryId: string
  categoryName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddWidgetDialog({ categoryId, categoryName, open, onOpenChange }: AddWidgetDialogProps) {
  const [widgetName, setWidgetName] = useState("")
  const [widgetText, setWidgetText] = useState("")
  const { addWidget } = useDashboardStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!widgetName.trim() || !widgetText.trim()) {
      return
    }

    addWidget(categoryId, {
      name: widgetName.trim(),
      text: widgetText.trim(),
    })

    // Reset form and close dialog
    setWidgetName("")
    setWidgetText("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setWidgetName("")
    setWidgetText("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>Add a new widget to the {categoryName} category.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="widget-name">Widget Name</Label>
            <Input
              id="widget-name"
              placeholder="Enter widget name..."
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="widget-text">Widget Text</Label>
            <Textarea
              id="widget-text"
              placeholder="Enter widget content..."
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              rows={4}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!widgetName.trim() || !widgetText.trim()}>
              Add Widget
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
