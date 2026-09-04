# Pneumonia Image Analysis System

A React + TypeScript front-end for managing datasets, training models, and running image analysis (chest X-ray / pneumonia) workflows. This repository provides the UI: authentication flows, dataset management, training and analysis pages, and a protected dashboard. It expects a backend API for authentication, dataset upload/processing, and model training/inference (not included).

## Features
- Login / Register flows (AuthContext + ProtectedRoute)
- Protected dashboard for authenticated users
- Dataset management (upload / view datasets)
- Training page to start/manage model training
- Analysis page for running inference on images
- Built with Vite, TypeScript, and Tailwind CSS

## Stack
- Language(s): TypeScript, JavaScript
- Framework / runtime: React 18 (Vite)
- Notable libraries:
  - react-router-dom (routing)
  - lucide-react (icons)
  - Tailwind CSS (styling)
  - Vite (dev server / build)

## Project structure (top-level)
```text
src/
  components/      Reusable UI components (auth, analysis, dashboard, training, common)
  context/         AuthContext and other React contexts
  data/            Static or helper data files (example datasets / utilities)
  pages/           Page entry points (LoginPage, RegisterPage, DashboardPage, AnalysisPage, TrainingPage, DatasetPage)
  types/           TypeScript types
  main.tsx         App bootstrap (React + ReactDOM)
  App.tsx          Router + route definitions (see available routes)
index.html         App HTML shell (title: Pneumonia Image Analysis System)
package.json       Scripts & dependencies
```

How it fits together:
- App.tsx sets up an AuthProvider and React Router routes. ProtectedRoute wraps pages that require authentication. Pages call components under `src/components/*` to render UI and interact with any backend API.

## Available routes
Based on App.tsx:
- /login           -> LoginPage
- /register        -> RegisterPage
- /dashboard       -> DashboardPage (protected)
- /analysis        -> AnalysisPage (protected)
- /training        -> TrainingPage (protected)
- /datasets        -> DatasetPage (protected)
- /                redirects to /dashboard

## Quickstart — local development
1. Install dependencies
```bash
npm install
```

2. Run dev server (Vite)
```bash
npm run dev
# open http://localhost:5173 (or the port Vite prints)
```

3. Build for production
```bash
npm run build
```

4. Preview the built app
```bash
npm run preview
```

5. Linting
```bash
npm run lint
```

## Environment / Backend
- This repository is the front-end only. The app likely expects a backend API for:
  - User authentication (login/register)
  - Dataset upload / listing
  - Starting/tracking training jobs
  - Running inference for analysis
- Typical Vite env var name to configure a backend URL: `VITE_API_URL`. Add a `.env` file at project root if needed:
```env
VITE_API_URL=https://api.example.com
```

## Development notes & pointers
- Auth logic: `src/context/AuthContext` provides auth state and is used by `ProtectedRoute` (src/components/common/ProtectedRoute).
- Pages to inspect for business logic: `src/pages/DatasetPage.tsx`, `src/pages/AnalysisPage.tsx`, `src/pages/TrainingPage.tsx`, `src/pages/DashboardPage.tsx`.
- If you add backend endpoints, prefer JSON REST endpoints under a base like `/api` or use GraphQL if you plan a single endpoint.



