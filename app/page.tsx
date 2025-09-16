"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <DashboardContent />
      </main>
    </div>
  )
}
