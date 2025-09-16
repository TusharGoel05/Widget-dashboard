import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type Category, type Widget, initialDashboardData } from "./dashboard-data"

interface DashboardStore {
  categories: Category[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  addWidget: (categoryId: string, widget: Omit<Widget, "id">) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  getFilteredWidgets: () => { category: Category; widget: Widget }[]
  clearSearch: () => void
  resetToDefault: () => void
  getTotalWidgetCount: () => number
  getCategoryWidgetCount: (categoryId: string) => number
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      categories: initialDashboardData,
      searchTerm: "",

      setSearchTerm: (term: string) => set({ searchTerm: term }),

      clearSearch: () => set({ searchTerm: "" }),

      resetToDefault: () =>
        set({
          categories: initialDashboardData,
          searchTerm: "",
        }),

      addWidget: (categoryId: string, widget: Omit<Widget, "id">) => {
        const newWidget: Widget = {
          ...widget,
          id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }

        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId ? { ...category, widgets: [...category.widgets, newWidget] } : category,
          ),
        }))
      },

      removeWidget: (categoryId: string, widgetId: string) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: category.widgets.filter((widget) => widget.id !== widgetId),
                }
              : category,
          ),
        }))
      },

      getFilteredWidgets: () => {
        const { categories, searchTerm } = get()
        if (!searchTerm.trim()) return []

        const filtered: { category: Category; widget: Widget }[] = []
        const searchLower = searchTerm.toLowerCase().trim()

        categories.forEach((category) => {
          category.widgets.forEach((widget) => {
            const nameMatch = widget.name.toLowerCase().includes(searchLower)
            const textMatch = widget.text.toLowerCase().includes(searchLower)
            const categoryMatch = category.name.toLowerCase().includes(searchLower)

            if (nameMatch || textMatch || categoryMatch) {
              filtered.push({ category, widget })
            }
          })
        })

        // Sort by relevance (name matches first, then text matches)
        return filtered.sort((a, b) => {
          const aNameMatch = a.widget.name.toLowerCase().includes(searchLower)
          const bNameMatch = b.widget.name.toLowerCase().includes(searchLower)

          if (aNameMatch && !bNameMatch) return -1
          if (!aNameMatch && bNameMatch) return 1

          return a.widget.name.localeCompare(b.widget.name)
        })
      },

      getTotalWidgetCount: () => {
        const { categories } = get()
        return categories.reduce((total, category) => total + category.widgets.length, 0)
      },

      getCategoryWidgetCount: (categoryId: string) => {
        const { categories } = get()
        const category = categories.find((cat) => cat.id === categoryId)
        return category ? category.widgets.length : 0
      },
    }),
    {
      name: "dashboard-storage",
      // Only persist categories, not search term
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
)
