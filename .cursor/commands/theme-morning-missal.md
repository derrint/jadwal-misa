# /theme-morning-missal

Apply the **Morning Missal** design theme to this Jadwal Misa Next.js + Tailwind project.
The aesthetic: clean, calm, spiritual — like a linen-bound prayer book. Warm cream
background, deep forest green primary, bone-white cards.

> Copy this file into `.cursor/commands/`, then type `/theme-morning-missal` in Cursor Chat.
> No file attachment needed — this command is self-contained.

---

## 0. Detect conventions first

Before changing anything, check:

1. **Tailwind version** — read `package.json`. `^4.x` → use §2a. `^3.x` → use §2b.
2. **`src/` layout** — does `src/app/` exist or `app/` at root? Use whichever.
3. **`globals.css` location** — typically `app/globals.css` or `src/app/globals.css`.
4. **`layout.tsx` location** — same folder as `globals.css`.

State the detected stack before making any edits.

---

## 1. Color tokens — Morning Missal palette

These are the canonical color values. Every other step references this palette.

| Token         | Hex       | Role                                      |
|---------------|-----------|-------------------------------------------|
| `bg`          | `#f0ede8` | Page background — warm cream              |
| `surface`     | `#faf9f6` | Card background — bone white              |
| `border`      | `#d8d4cc` | Card borders — warm gray                  |
| `muted`       | `#a8b8a0` | Subtle borders, placeholders, muted sage  |
| `primary`     | `#2d5a3d` | Deep forest green — headings, buttons, active states |
| `accent`      | `#4a7c5e` | Medium green — paroki name, icons, secondary labels  |
| `sab-bg`      | `#e8f0ea` | SAB pill background — very light green    |
| `sab-text`    | `#1a4028` | SAB pill text                             |
| `min-bg`      | `#d4e8dc` | MIN pill background — soft green          |
| `min-text`    | `#1a4028` | MIN pill text                             |
| `text`        | `#1c2e20` | Body text — near-black green              |
| `subtle`      | `#6b7c6b` | Secondary text — muted                    |

---

## 2a. Tailwind v4 — edit `globals.css`

Replace the existing `@theme` block (keep `@import "tailwindcss"` at top).
**Do not touch `tailwind.config.ts`** — it should not exist in a v4 project.

```css
@import "tailwindcss";

@theme {
  /* ── Morning Missal palette ── */
  --color-missal-bg:       #f0ede8;
  --color-missal-surface:  #faf9f6;
  --color-missal-border:   #d8d4cc;
  --color-missal-muted:    #a8b8a0;
  --color-missal-primary:  #2d5a3d;
  --color-missal-accent:   #4a7c5e;
  --color-missal-sab-bg:   #e8f0ea;
  --color-missal-sab-text: #1a4028;
  --color-missal-min-bg:   #d4e8dc;
  --color-missal-min-text: #1a4028;
  --color-missal-text:     #1c2e20;
  --color-missal-subtle:   #6b7c6b;

  /* ── Trust badge colors ── */
  --color-trust-high:      #1a9e6a;
  --color-trust-high-bg:   #e6f7f1;
  --color-trust-med:       #b07d00;
  --color-trust-med-bg:    #fef8e6;
  --color-trust-low:       #c0392b;
  --color-trust-low-bg:    #fdecea;

  /* ── Typography ── */
  --font-sans:    var(--font-lora-body), Georgia, serif;
  --font-display: var(--font-lora-display), Georgia, serif;

  /* ── Radii ── */
  --radius-card: 14px;
  --radius-pill: 9999px;
  --radius-btn:  8px;
}

@layer base {
  html {
    background-color: #f0ede8;
    color: #1c2e20;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: #d4e8dc;
    color: #1a4028;
  }
}
```

---

## 2b. Tailwind v3 — edit `tailwind.config.ts`

Replace the `theme.extend` section:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        missal: {
          bg:       '#f0ede8',
          surface:  '#faf9f6',
          border:   '#d8d4cc',
          muted:    '#a8b8a0',
          primary:  '#2d5a3d',
          accent:   '#4a7c5e',
          'sab-bg':   '#e8f0ea',
          'sab-text': '#1a4028',
          'min-bg':   '#d4e8dc',
          'min-text': '#1a4028',
          text:     '#1c2e20',
          subtle:   '#6b7c6b',
        },
        trust: {
          high:      '#1a9e6a',
          'high-bg': '#e6f7f1',
          med:       '#b07d00',
          'med-bg':  '#fef8e6',
          low:       '#c0392b',
          'low-bg':  '#fdecea',
        },
      },
      fontFamily: {
        sans:    ['var(--font-lora-body)', 'Georgia', 'serif'],
        display: ['var(--font-lora-display)', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '14px',
        pill: '9999px',
        btn:  '8px',
      },
    },
  },
  plugins: [],
}

export default config
```

Then update `globals.css` base layer:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-missal-bg text-missal-text;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: #d4e8dc;
    color: #1a4028;
  }
}
```

---

## 3. Typography — update `layout.tsx`

Replace any existing `next/font` import (Geist, Plus Jakarta Sans, etc.) with Lora:

```tsx
import { Lora } from 'next/font/google'

// Body — readable at small sizes, warmly humanist
const loraBody = Lora({
  subsets: ['latin'],
  variable: '--font-lora-body',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Display — for the main page title only
const loraDisplay = Lora({
  subsets: ['latin'],
  variable: '--font-lora-display',
  weight: ['600', '700'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${loraBody.variable} ${loraDisplay.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

> Why Lora? Warm humanist serif — strong legibility at body size, distinctive
> enough at display weight. Gives the "missal / prayer book" feel without
> needing a second typeface.

---

## 4. Component token mapping

For each component, apply these class replacements. Search by the old class
pattern and replace with the new one. Use `cn()` or direct className as
the file already uses.

### Page background (`app/[city]/page.tsx`, `app/page.tsx`)

```
bg-[#F2EDE8]  or  bg-misa-50  →  bg-missal-bg
```

### Cards (`components/ui/parish-card.tsx`)

```diff
- bg-white border border-gray-200 rounded-2xl
+ bg-missal-surface border border-missal-border rounded-card
```

Hover state on accordion trigger:
```diff
- hover:bg-gray-50
+ hover:bg-missal-bg
```

### Church name (card title)

```diff
- text-gray-900 font-bold
+ text-missal-text font-semibold font-display
```

### Paroki label (subtitle under church name)

```diff
- text-[#E05A2B]
+ text-missal-accent
```

### Location line

```diff
- text-gray-500
+ text-missal-subtle
```

### SAB pill (`components/ui/sched-pill.tsx`)

```diff
- bg-gray-100 text-gray-700
+ bg-missal-sab-bg text-missal-sab-text border border-missal-primary/20
```

### MIN pill

```diff
- bg-green-100 text-green-800
+ bg-missal-min-bg text-missal-min-text border border-missal-accent/25
```

### Section labels (e.g. "KOTA MALANG — DEKENAT I")

```diff
- text-[#E05A2B] font-bold tracking-wide
+ text-missal-primary font-semibold tracking-wider uppercase text-xs
  border-l-2 border-missal-primary pl-3
```

### Filter buttons — active state

```diff
- bg-[#E05A2B] text-white              (active)
- bg-white text-gray-700               (inactive)

+ bg-missal-primary text-missal-surface           (active)
+ bg-missal-surface text-missal-subtle border border-missal-border  (inactive)
```

### Search input

```diff
- border-gray-300 focus:ring-orange-400 focus:border-orange-400
+ border-missal-border bg-missal-surface placeholder:text-missal-muted
  focus:ring-missal-accent focus:border-missal-accent
```

### Trust badge (`components/ui/trust-badge.tsx`)

Keep the three-tier logic, update only the color classes:

```tsx
const variants = {
  tinggi: 'bg-trust-high-bg text-trust-high border border-trust-high/30',
  sedang: 'bg-trust-med-bg  text-trust-med  border border-trust-med/30',
  rendah: 'bg-trust-low-bg  text-trust-low  border border-trust-low/30',
}
```

### Note boxes inside accordion (warn / danger)

```diff
- warn:   bg-amber-50 border-amber-300 text-amber-900
+ warn:   bg-trust-med-bg border-trust-med/40 text-trust-med

- danger: bg-red-50 border-red-300 text-red-900
+ danger: bg-trust-low-bg border-trust-low/40 text-trust-low
```

### Cross symbol / header logo

```diff
- text-[#E05A2B]
+ text-missal-primary
```

### Page title ("Jadwal Misa")

```diff
- font-black text-gray-900
+ font-bold font-display text-missal-text tracking-tight
```

City name highlight ("Malang Raya"):

```diff
- text-[#E05A2B]
+ text-missal-accent italic
```

### Site header / footer

```diff
- bg-white shadow-sm
+ bg-missal-surface border-b border-missal-border
```

---

## 5. Global find-and-replace

Search the entire `src/` (or `app/`) directory for these patterns:

| Find                        | Replace with                                              |
|-----------------------------|-----------------------------------------------------------|
| `#E05A2B`                   | `#2d5a3d` (primary) or `#4a7c5e` (accent) per context    |
| `#F2915E`                   | `#4a7c5e`                                                 |
| `text-orange-`              | `text-missal-primary` or `text-missal-accent`             |
| `bg-orange-`                | `bg-missal-sab-bg` or `bg-missal-min-bg`                  |
| `ring-orange-`              | `ring-missal-accent`                                      |
| `border-orange-`            | `border-missal-primary`                                   |
| `--color-accent`            | `--color-missal-primary`                                  |
| `accent: '#E05A2B'`         | remove — no longer in palette                             |
| `Plus_Jakarta_Sans`         | `Lora` (already replaced in §3)                           |
| `--font-sans: var(--font-plus-jakarta-sans)` | `--font-sans: var(--font-lora-body), Georgia, serif` |

---

## 6. Verification checklist

Run `pnpm dev` and confirm visually:

- ✅ Page background is warm cream `#f0ede8` — not white, not gray
- ✅ Cards are bone white `#faf9f6` with warm gray borders, no drop shadows
- ✅ Zero orange anywhere — all accents are green
- ✅ Section labels are forest green with left border accent
- ✅ SAB pills: light green bg, dark green text
- ✅ MIN pills: slightly deeper green bg, dark green text
- ✅ Active filter button: solid `#2d5a3d` fill, white text
- ✅ Inactive filter button: bone white, subtle border
- ✅ Trust badges: green / amber / red (logic unchanged, palette updated)
- ✅ Search input focus ring is green, not orange
- ✅ Page title uses Lora — visibly serif in DevTools
- ✅ Body text is readable — Lora 400 at 15–16px
- ✅ Cross symbol is forest green `#2d5a3d`
- ✅ Paroki subtitle is `#4a7c5e` medium green
- ✅ No `Inter`, `Geist`, or `Plus Jakarta Sans` in DevTools network tab

---

## 7. What NOT to change

- `data/malang.json`, `data/index.json` — untouched
- `types/parish.ts` — untouched
- `lib/filter-utils.ts`, `lib/get-city-data.ts`, `lib/build-search-index.ts` — untouched
- Route structure (`app/[city]/page.tsx` etc.) — untouched
- `package.json`, `tsconfig.json`, `next.config.mjs` — untouched
- Trust badge logic (tinggi / sedang / rendah conditions) — only colors change
- `noteHtml` rendering via `dangerouslySetInnerHTML` — untouched

---

## 8. Final report

When done, output:

1. Tailwind version detected and which branch (§2a or §2b) was applied.
2. Bullet list of every file edited.
3. Any color references that couldn't be auto-replaced (flag for manual review).
4. Confirm `pnpm build` passes with zero errors.
