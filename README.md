# Placement Portal Frontend

A role-based placement and career portal for students and placement-cell administrators. This repository is a React 19 single-page application built with Vite, Tailwind CSS v4, shadcn-style UI primitives, React Router and Zustand.

## Product areas

- Student dashboard, profile readiness, company directory and drive discovery
- Persistent application tracking with clear selection stages and next actions
- Company details, official drive briefs, FAQs and placement-cell Q&A
- Admin overview, campus-drive management, student readiness filters and CSV export
- Placement analytics, responsive navigation and light/dark themes

The current company, student and analytics content is representative frontend data. Authentication and account recovery call the configured API.

## Run locally

1. Copy `.env.local.example` to `.env.local` and set the API base URL.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.

Available checks:

```bash
npm run lint
npm run build
```

## Environment

```env
VITE_API_BASE_URL=http://localhost:8080
```

Do not commit real credentials or secrets to `.env.local`. Vite exposes variables prefixed with `VITE_` to browser code, so this file should contain public client configuration only.

## Architecture notes

- `src/pages` contains public, student and admin route screens.
- `src/layouts` provides role-specific shells.
- `src/components/ui` contains reusable shadcn-style primitives.
- `src/store/portalStore.js` owns the persisted frontend demo state shared by profile, drives and applications.
- `src/data/companies.js` contains representative company and role content.

Backend authorization remains mandatory. The route guard improves frontend UX but is not a security boundary.
