import { notFound } from "next/navigation"
import cityIndex from "@/data/index.json"
import { getCityData } from "@/lib/get-city-data"
import CityPageClient from "./city-page-client"

export const dynamicParams = false

export async function generateStaticParams() {
  return cityIndex.cities.map((c) => ({ city: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const meta = cityIndex.cities.find((c) => c.id === city)
  return {
    title: `Jadwal Misa ${meta?.name ?? city} — Jadwal Misa Indonesia`,
    description: `Jadwal misa Katolik di ${meta?.description ?? city}`,
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const meta = cityIndex.cities.find((c) => c.id === city)
  if (!meta) notFound()

  let data
  try {
    data = await getCityData(city)
  } catch {
    notFound()
  }

  return <CityPageClient data={data} meta={meta} />
}
