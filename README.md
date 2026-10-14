# HR Policy Assistant

A clean, modern frontend for an HR Policy Assistant application. Employees can ask HR-related questions, browse policy documents, review their question history, and manage preferences.

## Features

- **Overview Dashboard** — Welcome screen with search, stat cards, popular questions, and recently viewed policies.
- **Ask HR Assistant** — Chatbot interface with simulated responses, region selector, suggested questions, loading indicator, and source document references.
- **Policy Documents** — Searchable, filterable library with document preview modal.
- **My Recent Questions** — Question history with search, detail view, and clear action with confirmation.
- **Settings** — Display name, preferred region, notification toggle, with local storage persistence.
- **Responsive** — Works on desktop, tablet, and mobile with a collapsible sidebar.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
  components/      # Reusable UI components (Sidebar, Modal, StatCard, etc.)
  data/            # Mock data for policies, questions, and assistant responses
  pages/           # Page-level views (Overview, Ask, Documents, Questions, Settings)
  services/        # API integration layer (currently mock — replace with real API)
  types/           # TypeScript type definitions
  App.tsx          # Root component with navigation and layout
  main.tsx         # Entry point
  index.css        # Global styles and Tailwind setup
```

## Backend Integration

The frontend is designed to connect to an existing backend. The integration point is isolated in `src/services/hrService.ts`. Currently, it returns mock responses. To connect a real backend:

1. Open `src/services/hrService.ts`
2. Replace the mock logic in `askAssistant()` with a real API call (e.g., `fetch`)
3. Keep the same return shape (`{ answer: string, sourceDocument?: string }`) so the UI doesn't need changes

All mock data lives in `src/data/mockData.ts` and can be replaced or extended easily.

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- Lucide React (icons)
