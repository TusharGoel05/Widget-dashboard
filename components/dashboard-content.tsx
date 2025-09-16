"use client"

import { useDashboardStore } from "@/lib/dashboard-store"
import { CategorySection } from "./category-section"
import { SearchResults } from "./search-results"
import { DashboardStats } from "./dashboard-stats"

export function DashboardContent() {
  const { categories, searchTerm } = useDashboardStore()

  if (searchTerm) {
    return <SearchResults />
  }

  return (
    <div className="space-y-6">
      <DashboardStats />

      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  )
}
