export interface Parish {
  id: string
  wilayah: "kota" | "kabupaten"
  trust: "tinggi" | "sedang" | "rendah"
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
  noteSkin?: "warn" | "danger"
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
