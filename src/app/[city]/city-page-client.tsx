"use client"

import { useEffect, useMemo, useState } from "react"
import type { CityData, CityMeta } from "@/types/parish"
import {
  matchesLiturgy,
  matchesRegion,
  matchesSearch,
  type LiturgyFilter,
  type RegionFilter,
} from "@/lib/filter-utils"
import { CityHero } from "@/components/sections/city-hero"
import { FilterBar } from "@/components/sections/filter-bar"
import { ParishList } from "@/components/sections/parish-list"
import { InfoPageUpdatedTime } from "@/components/layout/page-updated-client"
import { SiteFooterCity } from "@/components/layout/site-footer"

export default function CityPageClient({
  data,
  meta,
}: {
  data: CityData
  meta: CityMeta
}) {
  const [region, setRegion] = useState<RegionFilter>("all")
  const [liturgy, setLiturgy] = useState<LiturgyFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const parishes = data.parishes
  const parishCount = parishes.filter((p) => p.id).length

  const visible = useMemo(
    () =>
      parishes.filter(
        (p) =>
          Boolean(p.id) &&
          matchesRegion(p, region) &&
          matchesLiturgy(p, liturgy) &&
          matchesSearch(p, searchQuery),
      ),
    [parishes, region, liturgy, searchQuery],
  )

  const visibleIds = useMemo(
    () => new Set(visible.map((p) => p.id)),
    [visible],
  )

  useEffect(() => {
    const hash = window.location.hash
    if (!hash.startsWith("#card-")) return
    const id = hash.slice(1)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [])

  const visibleCount = visible.length
  const countLine =
    visibleCount === parishCount
      ? ""
      : `Menampilkan ${visibleCount} dari ${parishCount} paroki`

  return (
    <div className="flex min-h-screen flex-col">
      <CityHero meta={meta} parishCount={parishCount} />

      <main className="relative z-10 flex-1 pb-12">
        <div className="container-site py-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            region={region}
            onRegionChange={setRegion}
            liturgy={liturgy}
            onLiturgyChange={setLiturgy}
          />

          {countLine ? (
            <p className="mb-3 pl-0.5 text-[0.72rem] text-misa-500">
              {countLine}
            </p>
          ) : null}

          {visibleCount === 0 ? (
            <div className="rounded-xl border border-black/8 bg-white py-12 text-center text-misa-500 shadow-[var(--shadow-card)]">
              <div className="mb-2 text-3xl" aria-hidden>
                🔍
              </div>
              <p>Tidak ada gereja yang sesuai dengan pencarian.</p>
            </div>
          ) : (
            <ParishList parishes={parishes} visibleIds={visibleIds} />
          )}

          <div className="info-panel-site">
            <h3>📌 Panduan &amp; Catatan Penting</h3>
            <ul>
              <li>
                Jadwal ini berlaku untuk <strong>misa reguler</strong>. Pada Hari
                Raya Besar (Natal, Paskah, dll.) jadwal biasanya berubah —
                selalu cek website/IG resmi.
              </li>
              <li>
                Jadwal bisa berubah sewaktu-waktu karena acara paroki,
                renovasi, atau kondisi khusus.
              </li>
              <li>
                Data diverifikasi dari sumber resmi paroki per{" "}
                <strong>
                  <InfoPageUpdatedTime />
                </strong>
                . Paroki dengan badge ⚠️ disarankan dikonfirmasi langsung.
              </li>
              <li>
                Seluruh paroki di bawah naungan{" "}
                <strong>Keuskupan Malang</strong> — keuskupanmalang.com
              </li>
            </ul>
          </div>
        </div>
      </main>

      <SiteFooterCity />
    </div>
  )
}
