import cityIndex from "@/data/index.json"
import type { CityData } from "@/types/parish"

export async function getCityData(cityId: string): Promise<CityData> {
  const meta = cityIndex.cities.find((c) => c.id === cityId)
  if (!meta) {
    throw new Error(`Unknown city: ${cityId}`)
  }
  const mod = (await import(`@/data/${meta.file}`)) as {
    default?: CityData
  } & CityData
  return mod.default ?? mod
}
