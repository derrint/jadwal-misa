import cityIndex from "@/data/index.json"
import type { SearchEntry } from "@/types/parish"

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = []
  for (const city of cityIndex.cities) {
    const mod = await import(`@/data/${city.file}`)
    const data = (mod as { default?: { parishes?: unknown[] }; parishes?: unknown[] })
      .default ?? mod
    const parishes = (data.parishes ?? []).filter(
      (p: { id?: string }) => p.id,
    )
    parishes.forEach((p: Omit<SearchEntry, "cityId" | "cityName">) => {
      entries.push({ ...p, cityId: city.id, cityName: city.name })
    })
  }
  return entries
}
