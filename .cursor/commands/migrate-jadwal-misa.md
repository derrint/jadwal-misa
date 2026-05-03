# /migrate-jadwal-misa

Migrate the **Jadwal Misa** single-file HTML app (attached) into **this**
freshly scaffolded `create-next-app` project. Build a scalable mass schedule
directory supporting multiple Indonesian cities with cross-city search. Adapt
to whatever conventions this project already uses — don't blindly assume.

> Copy this file into your new project's `.cursor/commands/` folder, attach the
> HTML file in chat, then type `/migrate-jadwal-misa`.

---

## 0. Detect this project's conventions before writing anything

Run these checks first and remember the results — every subsequent step depends
on them:

1. **`src/` layout?** — does this project have `src/app/` or `app/` at the
   root? Use whichever exists for all destination paths below.
2. **Tailwind version?** — read `package.json` and check `tailwindcss`. If
   `^4.x` → use the **Tailwind v4** branch in §5. If `^3.x` → use the **v3**
   branch.
3. **Path alias?** — read `tsconfig.json` for `paths`. If `@/*` maps to
   `./src/*`, then `@/components/...` resolves to `src/components/...`. If it
   maps to `./*`, no `src/` prefix.
4. **Existing files** — `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
   already exist from the scaffold. **Replace contents**, don't create
   duplicates.
5. **PostCSS config** — Tailwind v4 uses `@tailwindcss/postcss`, v3 uses
   `tailwindcss`. Don't touch if the scaffold set it up correctly.

State the detected stack to the user before proceeding.

---

## 1. Source of truth

The source is the **attached HTML file**. Use the `Read` tool to parse it —
never reconstruct data from memory. Two things to extract:

1. **Parish data** — the JSON inside
   `<script type="application/json" id="parishes-data">`. This is the source
   for `/data/malang.json`.
2. **Filtering logic** — the IIFE `<script>` at the bottom of the file. This
   is the source for the React filter components.

---

## 2. Target folder layout (kebab-case, App Router)

If the project uses `src/`, prepend `src/` to every destination path below.

### Data layer

| File                    | Notes                                              |
| ----------------------- | -------------------------------------------------- |
| `data/malang.json`      | Extracted from HTML's `#parishes-data` script tag  |
| `data/index.json`       | City registry — create fresh, see §3               |

### Types

| File                    | Notes                                              |
| ----------------------- | -------------------------------------------------- |
| `types/parish.ts`       | TypeScript interfaces — see §4                     |

### Lib (build-time utilities)

| File                          | Notes                                        |
| ----------------------------- | -------------------------------------------- |
| `lib/get-city-data.ts`        | Reads a city JSON file, returns typed data   |
| `lib/build-search-index.ts`   | Merges all city JSONs into a flat array      |

### Components — split by responsibility

| File                                      | Notes                                           |
| ----------------------------------------- | ----------------------------------------------- |
| `components/layout/site-header.tsx`       | Top header with logo + nav (if any)             |
| `components/layout/site-footer.tsx`       | Footer with attribution text                    |
| `components/ui/parish-card.tsx`           | Accordion card for one parish                   |
| `components/ui/trust-badge.tsx`           | Coloured badge: tinggi / sedang / rendah        |
| `components/ui/sched-pill.tsx`            | Inline SAB / MIN time pill                      |
| `components/ui/city-card.tsx`             | Homepage city grid card                         |
| `components/sections/filter-bar.tsx`      | Search input + region tabs + liturgy tabs       |
| `components/sections/parish-list.tsx`     | Renders cards + section labels, wires filtering |
| `components/sections/city-hero.tsx`       | City page header with name + badges             |
| `components/sections/search-results.tsx`  | Cross-city search result list (homepage)        |

### App entry — overwrite scaffolded versions

| File                              | Notes                                           |
| --------------------------------- | ----------------------------------------------- |
| `app/page.tsx`                    | Homepage: city grid + cross-city search         |
| `app/[city]/page.tsx`             | City schedule page — SSG                        |
| `app/[city]/city-page-client.tsx` | `"use client"` — owns all filter state          |
| `app/layout.tsx`                  | Root layout — replace, see §6                   |
| `app/globals.css`                 | Design tokens + utilities — replace, see §5     |

---

## 3. Data files to create

### `data/malang.json`

Extract verbatim from the HTML's `<script type="application/json"
id="parishes-data">` tag. Keep the exact JSON shape — do not rename keys.

### `data/index.json`

Create fresh with this shape:

```json
{
  "cities": [
    {
      "id": "malang",
      "name": "Malang Raya",
      "province": "Jawa Timur",
      "diocese": "Keuskupan Malang",
      "description": "Kota Malang & Kabupaten Malang",
      "parishCount": 14,
      "file": "malang.json"
    }
  ]
}
```

New cities are added here later — `app/[city]/page.tsx` reads this file via
`generateStaticParams` to know which routes to pre-render.

---

## 4. TypeScript types — `types/parish.ts`

```ts
export interface Parish {
  id: string
  wilayah: 'kota' | 'kabupaten'
  trust: 'tinggi' | 'sedang' | 'rendah'
  search: string
  cardName: string
  cardParoki: string
  location: string
  sabtu?: string[]
  minggu?: string[]
  sabtuDetail?: string[]
  mingguDetail?: string[]
  schedulePreviewSabtu?: string
  schedulePreviewMinggu?: string
  noSchedule?: boolean
  noteHtml?: string
  noteSkin?: 'warn' | 'danger'
  sources?: string[]
  sectionLabel?: string
}

export interface CityData {
  version: number
  title: string
  parishes: Parish[]
}

export interface CityMeta {
  id: string
  name: string
  province: string
  diocese: string
  description: string
  parishCount: number
  file: string
}

export interface CityIndex {
  cities: CityMeta[]
}

export interface SearchEntry extends Parish {
  cityId: string
  cityName: string
}
```

---

## 5. Tailwind setup — branches by version

### 5a. Tailwind v3 branch

1. **Replace** `tailwind.config.ts` — extend the theme with:
   - Custom color palette: `misa.*` (warm neutrals) + `accent` (#E05A2B)
   - Font family: `sans` mapped to `--font-sans` CSS var
   - Border radius: `card: '18px'`, `sm: '10px'`
2. **Replace** `app/globals.css` — use `@tailwind base/components/utilities`
   and add the component classes listed in §5c below.

### 5b. Tailwind v4 branch (most likely with a fresh `create-next-app`)

Do **not** copy or create `tailwind.config.ts`. Port all theming into
`app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Warm neutral palette */
  --color-misa-50:  #F2EDE8;
  --color-misa-100: #E8E1D8;
  --color-misa-200: #D4C9BC;
  --color-misa-300: #B8A99A;
  --color-misa-400: #9E8E7E;
  --color-misa-500: #6B5F58;
  --color-misa-600: #4A3F39;
  --color-misa-700: #3D3530;
  --color-misa-800: #1A1714;
  --color-misa-900: #0F0C09;

  /* Accent */
  --color-accent:       #E05A2B;
  --color-accent-soft:  #F2915E;
  --color-accent-xsoft: color-mix(in srgb, #E05A2B 10%, transparent);

  /* Status */
  --color-trust-high:   #1A9E6A;
  --color-trust-med:    #C68B00;
  --color-trust-low:    #D63B3B;

  /* Surfaces */
  --color-surface:      #FFFFFF;
  --color-surface-2:    #F7F4F1;

  /* Typography */
  --font-sans: var(--font-sans);

  /* Radii */
  --radius-card: 18px;
  --radius-sm:   10px;

  /* Shadows */
  --shadow-card:  0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  --shadow-hover: 0 8px 28px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.05);
}

:root {
  color-scheme: light;
}

html, body {
  @apply bg-misa-50 text-misa-700 antialiased;
}

::selection {
  @apply bg-accent text-white;
}
```

Then add the component classes from §5c using `@layer components` (v3) or
`@layer components` (v4 — same syntax here).

### 5c. Shared component classes (both versions)

```css
@layer components {
  .container-site {
    @apply mx-auto w-full max-w-3xl px-4 sm:px-6;
  }
  .card-parish {
    @apply rounded-[18px] border border-black/8 bg-white shadow-[var(--shadow-card)]
           transition-all duration-200;
  }
  .card-parish:hover {
    @apply -translate-y-px border-accent/20 shadow-[var(--shadow-hover)];
  }
  .filter-btn-base {
    @apply rounded-lg border border-black/8 bg-white px-3 py-1.5 text-xs
           font-semibold text-misa-500 shadow-[var(--shadow-card)]
           transition-all duration-150 whitespace-nowrap cursor-pointer;
  }
  .filter-btn-base:hover {
    @apply border-accent text-accent bg-accent/5;
  }
  .filter-btn-active {
    @apply bg-accent border-accent text-white shadow-[0_3px_10px_rgba(224,90,43,0.25)];
  }
  .trust-badge-high {
    @apply bg-trust-high/10 text-trust-high text-[0.64rem] font-bold px-2 py-0.5 rounded-md;
  }
  .trust-badge-med {
    @apply bg-trust-med/10 text-trust-med text-[0.64rem] font-bold px-2 py-0.5 rounded-md;
  }
  .trust-badge-low {
    @apply bg-trust-low/10 text-trust-low text-[0.64rem] font-bold px-2 py-0.5 rounded-md;
  }
}
```

After porting, **delete** the scaffolded `tailwind.config.ts` if Tailwind v4
is detected.

---

## 6. `app/layout.tsx` adaptation

Use `next/font/google` to load **Plus Jakarta Sans** and expose it as a CSS
variable `--font-sans`. Replace any Geist or other font from the scaffold.

```tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Jadwal Misa Indonesia',
  description: 'Direktori jadwal misa Katolik seluruh Indonesia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 7. Static generation — `app/[city]/page.tsx`

```tsx
import cityIndex from '@/data/index.json'
import { getCityData } from '@/lib/get-city-data'
import CityPageClient from './city-page-client'

export async function generateStaticParams() {
  return cityIndex.cities.map((c) => ({ city: c.id }))
}

export async function generateMetadata({ params }) {
  const meta = cityIndex.cities.find((c) => c.id === params.city)
  return {
    title: `Jadwal Misa ${meta?.name ?? params.city} — Jadwal Misa Indonesia`,
    description: `Jadwal misa Katolik di ${meta?.description ?? params.city}`,
  }
}

export default async function CityPage({ params }) {
  const data = await getCityData(params.city)
  const meta = cityIndex.cities.find((c) => c.id === params.city)!
  return <CityPageClient data={data} meta={meta} />
}
```

`CityPageClient` is a `"use client"` component that owns all filter state
(region, liturgy, search query) using `useState`. No URL params needed yet.

---

## 8. Filtering logic — migrate from the HTML IIFE

Extract these functions verbatim from the HTML's `<script>` block and put them
in `lib/filter-utils.ts`:

- `parseMinutes(t: string): number` — converts `"17.00"` → `1020`
- `hasSabtuSore(p: Parish): boolean` — any sabtu time ≥ 16:00
- `hasMingguPagi(p: Parish): boolean` — any minggu time < 11:00
- `hasMingguSore(p: Parish): boolean` — any minggu time ≥ 15:00
- `matchesLiturgy(p: Parish, lit: string): boolean`
- `previewSabtu(p: Parish): string`
- `previewMinggu(p: Parish): string`

Constants:
```ts
export const SABTU_SORE_MIN  = 16 * 60  // 960
export const MINGGU_PAGI_MAX = 11 * 60  // 660
export const MINGGU_SORE_MIN = 15 * 60  // 900
```

In `CityPageClient`, combine all three filters as AND:
```ts
const visible = parishes.filter(p =>
  matchesRegion(p, regionFilter) &&
  matchesLiturgy(p, liturgyFilter) &&
  matchesSearch(p, searchQuery)
)
```

Section labels render only when at least one card in their group is visible.

---

## 9. Cross-city search — `lib/build-search-index.ts`

```ts
import cityIndex from '@/data/index.json'
import type { SearchEntry } from '@/types/parish'

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = []
  for (const city of cityIndex.cities) {
    const data = await import(`@/data/${city.file}`)
    const parishes = (data.parishes ?? []).filter((p: any) => p.id)
    parishes.forEach((p: any) => {
      entries.push({ ...p, cityId: city.id, cityName: city.name })
    })
  }
  return entries
}
```

Call this at build time in `app/page.tsx` (it's a server component — no
`"use client"` needed). Pass the index as a prop to a client component
`SearchResults` that handles the input + filtering client-side.

Search result items show: church name, paroki label, city name, SAB/MIN
preview pills, link to `/[cityId]#card-[id]`.

---

## 10. Parish card — preserve these fields exactly

The `ParishCard` component must handle all fields from the original HTML:

| Field                   | Behaviour                                               |
| ----------------------- | ------------------------------------------------------- |
| `sectionLabel`          | Renders a separator label above the card if present     |
| `noSchedule`            | When true, hides the SAB/MIN detail grid entirely       |
| `sabtuDetail`           | Overrides `sabtu[]` in the expanded detail view         |
| `mingguDetail`          | Overrides `minggu[]` in the expanded detail view        |
| `schedulePreviewSabtu`  | Overrides the collapsed SAB pill text                   |
| `schedulePreviewMinggu` | Overrides the collapsed MIN pill text                   |
| `noteSkin`              | `'warn'` → amber box · `'danger'` → red box            |
| `noteHtml`              | Rendered via `dangerouslySetInnerHTML` — content is     |
|                         | internal/trusted, not user-submitted                    |
| `sources`               | Array of source tag strings                             |

Accordion open/close via local `useState` per card — no global state.

The `setPageUpdatedDates` behaviour from the HTML → use a `useEffect` in the
city page footer to set `new Date().toLocaleDateString('id-ID', { day:
'numeric', month: 'long', year: 'numeric' })`.

---

## 11. Homepage — `app/page.tsx`

Server component. Reads `data/index.json` and calls `buildSearchIndex()`.

Layout:
- Page header: "Jadwal Misa Indonesia" + subtitle
- Cross-city search bar (client component, receives `searchIndex` as prop)
- City grid: one `CityCard` per entry in `index.json`, links to `/[city]`
- Each `CityCard` shows: city name, province, diocese, parish count badge,
  "Lihat Jadwal →" link

Use the same warm background + orange accent design system as the city pages.

---

## 12. Code-level rules

- All imports use `@/` alias — verify it's in `tsconfig.json`
- Server components fetch data (no `useState`, no `useEffect`)
- Client components are co-located in the same route folder when tightly coupled
  (e.g. `city-page-client.tsx` next to `app/[city]/page.tsx`)
- `noteHtml` uses `dangerouslySetInnerHTML` — add a comment noting it's
  internal trusted content, not user input
- No external state library (Zustand, Jotai, etc.) — `useState` is sufficient
- No `fetch()` calls at runtime — all data is imported at build time

---

## 13. Cleanup

After creating all files, delete scaffolded boilerplate no longer needed:

- `public/next.svg`, `public/vercel.svg`, `public/file.svg`,
  `public/globe.svg`, `public/window.svg`
- `app/page.module.css` (if present)
- `tailwind.config.ts` (if Tailwind v4 is detected)

---

## 14. Verification

Run all of these and report output:

```bash
pnpm install        # or npm / yarn / bun — match the lockfile
pnpm lint           # zero errors expected
pnpm build          # ✓ Compiled successfully + all city routes pre-rendered
pnpm dev            # smoke-test the dev server
```

Visually verify:

- ✅ Homepage shows city grid with Malang Raya card
- ✅ Cross-city search bar filters parish names across all cities
- ✅ `/malang` loads with 14 parish cards, warm background, orange accents
- ✅ Region filter (Semua / Kota / Kab. / Data Valid / Perlu Dicek) works
- ✅ Liturgy filter (Semua jam / Sabtu sore / Minggu pagi / Minggu sore) works
- ✅ Text search filters cards + hides empty section labels
- ✅ Accordion expand/collapse works per card
- ✅ Trust badges render correct colour (green / amber / red)
- ✅ SAB / MIN preview pills visible without expanding
- ✅ Lodalem card shows no schedule grid (noSchedule: true)
- ✅ Purworejo card shows "Bahasa Jawa (Minggu I)" in mingguDetail
- ✅ Note boxes render warn (amber) and danger (red) variants correctly
- ✅ Footer shows today's date in Indonesian format (e.g. "3 Mei 2026")
- ✅ `/malang#card-ijen` scrolls to the Ijen card

---

## 15. What NOT to copy or create

- `node_modules/`, `.next/`, lock files — let the package manager regenerate
- `package.json`, `tsconfig.json` — keep the scaffold's versions
- `next.config.mjs`, `next-env.d.ts` — already present in the scaffold
- `.eslintrc.json` — the scaffold uses `eslint.config.mjs` (flat config)
- `README.md` — write a fresh one after migration if needed

---

## 16. Final report

When done, output:

1. The detected stack (Tailwind version, `src/` layout, path alias).
2. A bullet list of every file created / replaced / deleted.
3. The result of `pnpm lint` and `pnpm build`.
4. Any deviations from this plan and the reason for each.
