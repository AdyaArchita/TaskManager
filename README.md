# Full-Stack Task Manager (Next.js + shadcn/ui)

A beautiful, professional, and fully responsive Task Manager built using Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui. 

## 🚀 Core Features
- **In-Memory Store:** Uses a global variable to persist tasks across hot reloads and browser refreshes dynamically.
- **Full API Route:** Includes `GET`, `POST`, `PATCH`, and `DELETE` at `/api/tasks`.
- **Premium UI:** Glassmorphism dashboard, animated blobs, smooth micro-animations, and complete responsive design for desktop and mobile. 
- **Bonus Completed:** 
  - Filter Tasks (All / Pending / Completed)
  - Edit Task Titles (Using accessible shadcn Dialog modals)
  - Persist Across Refresh (Through global backend variable logic)
  - Unit Tests enabled via Jest
  - Docker Support

## 🏃 Setup & Run Locally
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run Development Server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## 🧪 Running Tests
We use Jest to validate the core backend data store layer.
```bash
npm run test
```

## 🐳 Docker Setup
Run the application completely isolated using the provided Dockerfile.
```bash
docker build -t task-manager-app .
docker run -p 3000:3000 task-manager-app
```
*Note: Due to Docker layers, wait for the `npm run build` phase during the `docker build` command to finish.*

## 🧐 Assumptions & Trade-offs
1. **In-Memory Storage:** Per the instructions, an array memory storage method was requested. In Next.js App Router API, standard variables reset on every hot-reload. To solve this, I instantiated a `global._tasks` variable fallback which gives our API true persistence over server refreshes and developer reloads.
2. **"Persist Tasks After Refresh" Bonus:** While this often signifies bringing in `localStorage` mirroring, doing so fundamentally duplicates the single source of truth when we already have excellent API endpoints. Therefore, I allowed the backend `store.ts` file to hold the long-term state, satisfying both the "Use an API" rule and the "Persistence" rule simultaneously.
3. **Optimistic Updates:** The frontend implements optimistic data manipulation, meaning Tasks immediately render as completed/deleted instantly when pressed, creating a 0ms-latency illusion, rather than waiting for the API to confirm. 
4. **Testing Layer:** Rather than implementing bulky Cypress E2E tests, the backend's data structures were verified via `jest` to provide safety and speed specifically for our single point of complex logic (the in-memory CRUD operations).