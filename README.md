# Jadwal Misa Indonesia

A static, fast directory of **Catholic Mass schedules** across Indonesia. Browse by city, search parishes, and filter by area — built with [Next.js](https://nextjs.org), React, and TypeScript.

## Features

- **Home** — Search across all indexed parishes; jump to a city from the region grid.
- **City pages** (`/[city]`) — Parish cards with Saturday / Sunday times, optional weekday notes, sources, and trust indicators.
- **Filters** — Narrow results by deanery / area where the dataset provides labels.

Schedule data is stored as JSON and shipped with the app (no database required).

## Tech stack

- **Framework:** Next.js (App Router)
- **UI:** React, Tailwind CSS
- **Language:** TypeScript

## Getting started

Requirements: **Node.js** (LTS recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

| Command   | Description           |
| --------- | --------------------- |
| `npm run dev`    | Development server    |
| `npm run build`  | Production build      |
| `npm run start`  | Run production server |
| `npm run lint`   | ESLint                |

## Data & adding a city

1. **Register the city** in [`src/data/index.json`](src/data/index.json) (`id`, `name`, `province`, `diocese`, `file`, etc.).
2. **Add a dataset file** (e.g. `src/data/<city>.json`) matching the shape in [`src/types/parish.ts`](src/types/parish.ts) (`CityData` with a `parishes` array).

The home search index is built from every city listed in `index.json` via dynamic imports in [`src/lib/build-search-index.ts`](src/lib/build-search-index.ts).

## Accuracy & corrections

Schedules are compiled for convenience and may change without notice. For authoritative times and pastoral notices, always confirm with the **local parish** or official parish channels.

---

Deployed like any Next.js app (e.g. [Vercel](https://vercel.com/docs/frameworks/nextjs)). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
