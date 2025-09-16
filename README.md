# CSPM Dashboard Application

A dynamic dashboard application for Cloud Security Posture Management (CSPM) built with React, Next.js, and TypeScript. This application allows users to manage widgets dynamically across different categories with full CRUD operations and search functionality.

## Features

- **Dynamic Widget Management**: Add, remove, and organize widgets across categories
- **Search Functionality**: Search widgets by name, content, or category with keyboard shortcuts (Ctrl+K)
- **Persistent State**: Widget configurations are saved locally using Zustand with persistence
- **Responsive Design**: Mobile-first design that works across all device sizes
- **Professional UI**: Clean, modern interface using shadcn/ui components
- **Bulk Operations**: Manage multiple widgets at once through the management dialog
- **Real-time Statistics**: Dashboard overview with widget counts and analytics

## Technology Stack

- **Frontend**: React 19, Next.js 15 (App Router)
- **State Management**: Zustand with persistence middleware
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui component library
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard-header.tsx # Header with search and options
│   ├── dashboard-content.tsx# Main content area
│   ├── dashboard-stats.tsx  # Statistics overview
│   ├── category-section.tsx # Category container
│   ├── widget-card.tsx      # Individual widget display
│   ├── add-widget-dialog.tsx# Add widget modal
│   ├── widget-management-dialog.tsx # Bulk management
│   └── search-results.tsx   # Search results display
├── lib/
│   ├── dashboard-data.ts    # Initial data and types
│   ├── dashboard-store.ts   # Zustand state management
│   └── utils.ts             # Utility functions
└── README.md
\`\`\`

## Usage Guide

### Adding Widgets

1. Click the "Add Widget" button in any category section
2. Fill in the widget name and content
3. Click "Add Widget" to save

### Removing Widgets

**Individual Removal:**
- Hover over any widget and click the X icon in the top-right corner

**Bulk Removal:**
- Click "Options" → "Manage Widgets" in the header
- Select widgets using checkboxes
- Click "Remove Selected"

### Searching Widgets

- Use the search bar in the header
- Press `Ctrl+K` (or `Cmd+K` on Mac) to focus the search
- Press `Escape` to clear the search
- Search matches widget names, content, and category names

### Resetting Dashboard

- Click "Options" → "Reset to Default" to restore original widgets
- This action requires confirmation and cannot be undone

## Data Structure

The application uses a JSON-based structure for categories and widgets:

\`\`\`typescript
interface Widget {
  id: string;
  name: string;
  text: string;
}

interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}
\`\`\`


