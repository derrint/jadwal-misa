import type { Parish } from "@/types/parish"

export const SABTU_SORE_MIN = 16 * 60 // 960
export const MINGGU_PAGI_MAX = 11 * 60 // 660
export const MINGGU_SORE_MIN = 15 * 60 // 900

export type RegionFilter =
  | "all"
  | "kota"
  | "kabupaten"
  | "tinggi"
  | "perludicek"

export type LiturgyFilter =
  | "all"
  | "sabtu_sore"
  | "minggu_pagi"
  | "minggu_sore"

export function parseMinutes(t: string): number {
  const p = String(t).replace(/\./g, ":").split(":")
  const h = parseInt(p[0] ?? "0", 10) || 0
  const m = parseInt(p[1] ?? "0", 10) || 0
  return h * 60 + m
}

export function hasSabtuSore(p: Parish): boolean {
  if (!p.sabtu || !p.sabtu.length) return false
  return p.sabtu.some((t) => parseMinutes(t) >= SABTU_SORE_MIN)
}

export function hasMingguPagi(p: Parish): boolean {
  if (!p.minggu || !p.minggu.length) return false
  return p.minggu.some((t) => parseMinutes(t) < MINGGU_PAGI_MAX)
}

export function hasMingguSore(p: Parish): boolean {
  if (!p.minggu || !p.minggu.length) return false
  return p.minggu.some((t) => parseMinutes(t) >= MINGGU_SORE_MIN)
}

export function matchesLiturgy(p: Parish, lit: LiturgyFilter): boolean {
  if (lit === "all") return true
  if (p.noSchedule) return false
  if (lit === "sabtu_sore") return hasSabtuSore(p)
  if (lit === "minggu_pagi") return hasMingguPagi(p)
  if (lit === "minggu_sore") return hasMingguSore(p)
  return true
}

export function previewSabtu(p: Parish): string {
  if (p.schedulePreviewSabtu != null) return p.schedulePreviewSabtu
  if (!p.sabtu || !p.sabtu.length) return "—"
  return p.sabtu.join(", ")
}

export function previewMinggu(p: Parish): string {
  if (p.schedulePreviewMinggu != null) return p.schedulePreviewMinggu
  if (!p.minggu || !p.minggu.length) return "—"
  return p.minggu.join(", ")
}

export function matchesRegion(p: Parish, region: RegionFilter): boolean {
  if (region === "all") return true
  if (region === "kota") return p.wilayah === "kota"
  if (region === "kabupaten") return p.wilayah === "kabupaten"
  if (region === "tinggi") return p.trust === "tinggi"
  if (region === "perludicek")
    return p.trust === "sedang" || p.trust === "rendah"
  return true
}

export function matchesSearch(p: Parish, q: string): boolean {
  const query = q.toLowerCase().trim()
  if (!query) return true
  const search = (p.search || "").toLowerCase()
  const name = p.cardName.toLowerCase()
  const loc = p.location.toLowerCase()
  const combined = `${search} ${name} ${loc}`
  return combined.includes(query)
}
