"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchEntry } from "@/types/parish";
import { previewMinggu, previewSabtu } from "@/lib/filter-utils";
import { SchedPill } from "@/components/ui/sched-pill";

function matchesEntry(q: string, e: SearchEntry): boolean {
  const query = q.toLowerCase().trim();
  if (!query) return true;
  const blob =
    `${e.search} ${e.cardName} ${e.cardParoki} ${e.location} ${e.cityName}`.toLowerCase();
  return blob.includes(query);
}

export function SearchResults({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return searchIndex.filter((e) => matchesEntry(query, e));
  }, [searchIndex, query]);

  return (
    <section className="mb-10">
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari paroki di seluruh kota…"
          autoComplete="off"
          className="w-full rounded-xl border border-black/8 bg-surface py-3 pl-10 pr-3 text-sm text-misa-800 shadow-[var(--shadow-card)] outline-none placeholder:text-misa-400 focus:border-accent focus:ring-2 focus:ring-accent/25 sm:text-base"
        />
      </div>

      {query.trim() ? (
        <ul className="mt-4 space-y-2">
          {filtered.length === 0 ? (
            <li className="rounded-xl border border-black/8 bg-surface p-6 text-center text-sm text-misa-500 sm:text-base">
              Tidak ada hasil.
            </li>
          ) : (
            filtered.map((e) => (
              <li key={`${e.cityId}-${e.id}`}>
                <Link
                  href={`/${e.cityId}#card-${e.id}`}
                  className="block rounded-xl border border-black/8 bg-surface p-4 shadow-[var(--shadow-card)] transition-all hover:border-accent/30 hover:shadow-[var(--shadow-hover)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-base font-semibold text-misa-900 sm:text-lg">
                        {e.cardName}
                      </p>
                      <p className="text-sm text-accent sm:text-base">{e.cardParoki}</p>
                      <p className="mt-1 text-xs text-misa-500 sm:text-sm">{e.cityName}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <SchedPill day="SAB" text={previewSabtu(e)} />
                      <SchedPill day="MIN" text={previewMinggu(e)} />
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </section>
  );
}
