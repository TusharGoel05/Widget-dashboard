export interface Widget {
  id: string
  name: string
  text: string
  type?: "donut" | "bar" | "text"
  data?: {
    total?: number
    items?: Array<{
      label: string
      value: number
      color: string
    }>
  }
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}

export const initialDashboardData: Category[] = [
  {
    id: "cspm-executive",
    name: "CSPM Executive Dashboard",
    widgets: [
      {
        id: "cloud-accounts",
        name: "Cloud Accounts",
        text: "Total: 2 | Connected: 2 | Not Connected: 0",
        type: "donut",
        data: {
          total: 2,
          items: [
            { label: "Connected", value: 2, color: "#3b82f6" },
            { label: "Not Connected", value: 0, color: "#e5e7eb" },
          ],
        },
      },
      {
        id: "cloud-account-risk",
        name: "Cloud Account Risk Assessment",
        text: "Failed: 1689 (36%) | Warning: 681 (7%) | Not Available: 36 (4%) | Passed: 7253 (53%)",
        type: "donut",
        data: {
          total: 9659,
          items: [
            { label: "Failed", value: 1689, color: "#dc2626" },
            { label: "Warning", value: 681, color: "#f59e0b" },
            { label: "Not available", value: 36, color: "#9ca3af" },
            { label: "Passed", value: 7253, color: "#16a34a" },
          ],
        },
      },
    ],
  },
  {
    id: "cwpp-dashboard",
    name: "CWPP Dashboard",
    widgets: [
      {
        id: "top-5-namespace-alerts",
        name: "Top 5 Namespace Specific Alerts",
        text: "No graph data available!",
        type: "text",
      },
      {
        id: "workload-alerts",
        name: "Workload Alerts",
        text: "No graph data available!",
        type: "text",
      },
    ],
  },
  {
    id: "registry-scan",
    name: "Registry Scan",
    widgets: [
      {
        id: "image-risk-assessment",
        name: "Image Risk Assessment",
        text: "Total Vulnerabilities: 1470 | Critical: 9 | High: 150",
        type: "bar",
        data: {
          total: 1470,
          items: [
            { label: "Critical", value: 9, color: "#7f1d1d" },
            { label: "High", value: 150, color: "#dc2626" },
            { label: "Medium", value: 500, color: "#f59e0b" },
            { label: "Low", value: 811, color: "#fbbf24" },
          ],
        },
      },
      {
        id: "image-security-issues",
        name: "Image Security Issues",
        text: "Total Images: 2 | Critical: 2 | High: 2",
        type: "bar",
        data: {
          total: 2,
          items: [
            { label: "Critical", value: 2, color: "#7f1d1d" },
            { label: "High", value: 2, color: "#dc2626" },
          ],
        },
      },
    ],
  },
]
