# B2Bmarket Portal – Frontend

React + TypeScript frontend for the B2B marketplace portal (Vite).

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

- App: http://localhost:3000  
- Ensure the B2Bmarket backend is running on port 8000 so `/api` proxy works.

## Build

```bash
npm run build
npm run preview
```

## Project layout

- `src/app/` – App root, routes, global styles
- `src/components/` – Reusable components (e.g. Layout)
- `src/core/api/` – API client and endpoints (health, ping)
- `src/core/styles/` – MUI theme (B2Bmarket)
- `src/pages/` – Page components (Home, Health)
