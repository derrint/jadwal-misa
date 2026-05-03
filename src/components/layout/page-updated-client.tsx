"use client"

import { useEffect, useState } from "react"

function useIndonesianToday() {
  const [iso, setIso] = useState("")
  const [formatted, setFormatted] = useState("")

  useEffect(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    setIso(`${y}-${m}-${day}`)
    setFormatted(
      d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    )
  }, [])

  return { iso, formatted }
}

export function InfoPageUpdatedTime() {
  const { iso, formatted } = useIndonesianToday()
  return (
    <time id="info-page-updated" dateTime={iso || undefined}>
      {formatted}
    </time>
  )
}

export function FooterPageUpdatedTime() {
  const { iso, formatted } = useIndonesianToday()
  return (
    <time id="footer-page-updated" dateTime={iso || undefined}>
      {formatted}
    </time>
  )
}
