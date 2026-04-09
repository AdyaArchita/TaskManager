# FocusFlow — Task Manager

A minimal yet polished task manager built as a full-stack exercise with **Next.js 14**, **TypeScript**, and **shadcn/ui**. The focus is on clean architecture, thoughtful UX, and production-quality code — not feature count.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

---

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | Next.js 14 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS + shadcn/ui          |
| Icons      | Lucide React                      |
| Testing    | Jest + ts-jest                    |
| Container  | Docker (optional)                 |

---

## Getting Started

### Prerequisites

- Node.js **18+** and npm

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Tests

```bash
npm run test
```

### Docker (Optional)

```bash
docker build -t focusflow .
docker run -p 3000:3000 focusflow
```

---

## Features

### Core (Required)

- **CRUD API** — `GET`, `POST`, `PATCH`, `DELETE` at `/api/tasks` and `/api/tasks/:id`
- **Task list** — displays all tasks sorted newest-first
- **Add task** — validated form (title required, trimmed, non-empty)
- **Toggle completion** — checkbox with optimistic UI
- **Delete task** — instant removal with rollback on failure
- **Loading state** — skeleton placeholders while fetching
- **Error handling** — toast notifications for every failure path
- **Clear JSON responses** — consistent `{ error }` objects with proper HTTP status codes

### Bonus

- **Filter tabs** — All / Pending / Done with live task counts per tab
- **Edit title** — dialog-based editing via PATCH (prevents accidental inline edits)
- **Persistence across refresh** — tasks survive page reloads and Next.js hot-reloads via a Node.js global store
- **Unit tests** — Jest tests covering the in-memory store (CRUD + edge cases)
- **Docker setup** — production-ready Dockerfile with multi-stage considerations

### Polish Details

- Keyboard shortcut hint ("Press Enter to add")
- Relative timestamps ("2 minutes ago", "yesterday") via `date-fns`
- Completed tasks fade visually so pending items draw the eye
- Subtle hover scale + shadow micro-interaction on task cards
- Accessible: aria-labels on interactive elements, semantic HTML (`<section>`, `<ul>`)
- Mobile-first responsive design; action buttons always visible on touch devices

---

## API Reference

| Method   | Endpoint          | Description              | Status Codes    |
| -------- | ----------------- | ------------------------ | --------------- |
| `GET`    | `/api/tasks`      | Return all tasks         | 200, 500        |
| `POST`   | `/api/tasks`      | Create a new task        | 201, 400, 500   |
| `PATCH`  | `/api/tasks/:id`  | Update title or status   | 200, 400, 404, 500 |
| `DELETE` | `/api/tasks/:id`  | Delete a task            | 200, 404, 500   |

### Task Data Model

```json
{
  "id": "uuid-v4",
  "title": "string",
  "completed": false,
  "createdAt": "2026-04-09T16:30:00.000Z"
}
```

---

## Assumptions & Trade-offs

| Decision | Reasoning |
| --- | --- |
| **In-memory storage** | The spec allows it, and it keeps the solution focused on API design and frontend quality rather than database setup. A real app would use PostgreSQL or similar. |
| **Node.js global for persistence** | Standard module-level variables reset on Next.js hot-reload. Using `global._taskStore` survives reloads, giving a better dev experience without adding a database. |
| **No authentication** | Out of scope for a 1–2 hour exercise. In production, tasks would be user-scoped. |
| **Optimistic updates** | Toggle, delete, and edit update the UI instantly and roll back on API failure. This makes the app feel fast even on slow connections. |
| **Dialog for editing (not inline)** | Inline editing risks accidental changes on mobile tap. A dialog is explicit and accessible. |
| **No debouncing** | With one field and manual submit, debouncing adds complexity without benefit here. |

## Design Decisions

- **Why Next.js?** — App Router provides co-located API routes and React Server Components in one project. For a small full-stack exercise this eliminates the need for a separate backend server, while still demonstrating real API design.
- **Why shadcn/ui?** — It gives polished, accessible components (Dialog, Checkbox, etc.) without the overhead of a full component library. Components are copied into the project, so there's no hidden dependency.
- **Separation of concerns** — API routes handle validation and storage; components are presentational; `task-manager.tsx` is the single orchestrator for state and side effects. This mirrors how I'd structure a larger app.
- **UX over features** — Rather than adding more features, I invested time in details that show care: keyboard hints, relative timestamps, micro-animations, descriptive toast messages, and proper loading/empty states.

## What I'd Improve With More Time

1. **Database** — Swap the in-memory store for SQLite (via Prisma) to get real persistence and enable concurrent users.
2. **E2E tests** — Add Playwright tests covering the full create → toggle → edit → delete flow.
3. **Due dates & priorities** — Extend the task model for richer planning.
4. **Drag-and-drop reordering** — Using `@dnd-kit` for manual prioritization.
5. **Dark mode toggle** — The CSS variables already support it; just needs a theme switcher in the UI.

---

## Project Structure

```
├── app/
│   ├── api/tasks/          # REST API (route handlers)
│   ├── globals.css          # Design tokens + animations
│   ├── layout.tsx           # Root layout with Toaster
│   └── page.tsx             # Home page (FocusFlow branding)
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   ├── task-manager.tsx     # State orchestrator
│   ├── task-form.tsx        # Add-task form
│   ├── task-list.tsx        # List / loading / empty state
│   ├── task-item.tsx        # Individual task card + edit dialog
│   └── filter-tabs.tsx      # All / Pending / Done tabs
├── lib/
│   ├── store.ts             # In-memory task store
│   └── utils.ts             # Tailwind merge helper
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── __tests__/
│   └── store.test.ts        # Unit tests for the store
├── Dockerfile               # Production container
└── README.md
```