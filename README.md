# B2Bmarket Portal – Frontend

React + TypeScript frontend for the B2B marketplace portal (Vite).

## Setup

```bash
npm install
cp .env.sample .env
# Edit .env to configure backend URL and port
```

## Configuration

The frontend reads configuration from `.env` file. Key variables:

**Backend Configuration (choose one approach):**

**Option 1: Full URL (recommended)**
- `VITE_BACKEND_URL` - Complete backend URL (e.g., `http://localhost:8210`)

**Option 2: Individual components**
- `VITE_BACKEND_HOST` - Backend host (default: localhost)
- `VITE_BACKEND_PORT` - Backend port (default: 8210)
- `VITE_BACKEND_PROTOCOL` - Backend protocol (http/https, default: http)

**Other Configuration:**
- `VITE_USE_PROXY` - Use Vite proxy for API requests (true/false, default: true)
- `VITE_FRONTEND_PORT` - Frontend dev server port (default: 3000)
- `VITE_API_BASE_URL` - Override API base URL (optional, auto-generated if not set)

**Priority:** `VITE_BACKEND_URL` takes precedence over individual components.

## Run

```bash
npm run dev
```

- App: http://localhost:{VITE_FRONTEND_PORT} (default: 3000)
- Ensure the B2Bmarket backend is running on the configured port (default: 8210)

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
