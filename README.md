# Drug Candidates App

A Next.js + TypeScript demo designed to demonstrate scalable frontend architecture for a drug-candidate portfolio.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- TanStack Query
- Vitest + React Testing Library
- Mock JSON data behind Next.js Route Handlers

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 and use `demo / demo123` or **Skip login (demo)**.

## Tests

```bash
npm test
npm run lint
npm run build
```

## Architecture

Browser → middleware → Next.js page → TanStack Query → `/api/drugs` → route handler → `lib/api/drugs.ts` → mock JSON.

Filtering and pagination happen server-side, so the HTTP contract can remain the same if the JSON source is replaced by a database/service containing millions of records. The client never imports the JSON dataset directly.

Search is debounced at ~300ms and search/status/page are URL-driven, making views shareable and bookmarkable. TanStack Query caches requests by those parameters and deduplicates requests.

## Authentication

Authentication is intentionally a demo rather than a production identity system. The session signal is stored in an HTTP-only cookie because Next.js middleware executes server/edge-side and cannot read browser localStorage. The middleware protects application routes and drug APIs while leaving login/auth endpoints public.

The Skip Login button is a walkthrough convenience only; production systems should use a real identity provider/session implementation.

## Scale tradeoffs

At 5M+ records, replace `data/drugs.json` with a database/API and keep the route contract. Use indexed search/filter columns, cursor pagination where appropriate, and consider virtualization for very large client-rendered result sets. The current page uses server-side pagination so it never downloads the entire dataset.

## Folder structure

- `app/` pages and route handlers
- `components/` reusable UI
- `lib/api/` data-access seam
- `lib/types/` domain types
- `data/` mock source
- `tests/` unit/component tests
- `middleware.ts` auth gate
