# Octofit Tracker frontend

This React 19 + Vite app uses `react-router-dom` navigation and calls the backend API routes for users, teams, activities, leaderboard, and workouts.

## Stack snapshot

- Presentation tier: React 19 + Vite + Bootstrap
- Logic tier integration: Express API routes under `/api/*`
- Data tier integration: MongoDB-backed resources exposed by the backend

## Environment variable setup

Define `VITE_CODESPACE_NAME` so the app can call your Codespaces backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, add this to `octofit-tracker/frontend/.env.local`.

When `VITE_CODESPACE_NAME` is set, API calls use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is missing, the frontend safely falls back to:

```text
http://localhost:8000/api/[component]/
```
