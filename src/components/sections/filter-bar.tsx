"use client"

import type {
  LiturgyFilter,
  RegionFilter,
} from "@/lib/filter-utils"

export function FilterBar({
  searchQuery,
  onSearchChange,
  region,
  onRegionChange,
  liturgy,
  onLiturgyChange,
}: {
  searchQuery: string
  onSearchChange: (q: string) => void
  region: RegionFilter
  onRegionChange: (r: RegionFilter) => void
  liturgy: LiturgyFilter
  onLiturgyChange: (l: LiturgyFilter) => void
}) {
  const regionBtns: { key: RegionFilter; label: string }[] = [
    { key: "all", label: "Semua" },
    { key: "kota", label: "Kota Malang" },
    { key: "kabupaten", label: "Kab. Malang" },
    { key: "tinggi", label: "✅ Data Valid" },
    { key: "perludicek", label: "⚠️ Perlu Dicek" },
  ]

  const liturgyBtns: { key: LiturgyFilter; label: string; title?: string }[] =
    [
      { key: "all", label: "Semua jam", title: "Tampilkan semua jadwal" },
      {
        key: "sabtu_sore",
        label: "Sabtu sore",
        title: "Misa Sabtu mulai 16.00 WIB atau sesudahnya",
      },
      {
        key: "minggu_pagi",
        label: "Minggu pagi",
        title: "Misa Minggu sebelum 11.00 WIB",
      },
      {
        key: "minggu_sore",
        label: "Minggu sore",
        title: "Misa Minggu mulai 15.00 WIB atau sesudahnya",
      },
    ]

  return (
    <div className="mb-4 flex flex-col gap-3">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-misa-400"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama gereja, lokasi…"
          autoComplete="off"
          enterKeyHint="search"
          className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-10 pr-3 text-sm text-misa-800 shadow-[var(--shadow-card)] outline-none ring-accent/30 placeholder:text-misa-400 focus:border-accent focus:ring-2"
        />
      </div>

      <div>
        <div className="mb-1 text-[0.68rem] font-medium uppercase tracking-wider text-misa-400">
          Wilayah &amp; tingkat data
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Wilayah dan tingkat kepercayaan data"
        >
          {regionBtns.map((b) => (
            <button
              key={b.key}
              type="button"
              className={`filter-btn-base ${region === b.key ? "filter-btn-active" : ""}`}
              onClick={() => onRegionChange(b.key)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-[0.68rem] font-medium uppercase tracking-wider text-misa-400">
          Waktu liturgi
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter waktu misa (vigil dan Minggu)"
        >
          {liturgyBtns.map((b) => (
            <button
              key={b.key}
              type="button"
              title={b.title}
              className={`filter-btn-base ${liturgy === b.key ? "filter-btn-active" : ""}`}
              onClick={() => onLiturgyChange(b.key)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
