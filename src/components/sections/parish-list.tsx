import type { Parish } from "@/types/parish"
import { ParishCard } from "@/components/ui/parish-card"

export function ParishList({
  parishes,
  visibleIds,
}: {
  parishes: Parish[]
  visibleIds: Set<string>
}) {
  const sectionHasVisible = (startIdx: number): boolean => {
    for (let i = startIdx; i < parishes.length; i++) {
      if (i > startIdx && parishes[i]?.sectionLabel) break
      const p = parishes[i]
      if (p?.id && visibleIds.has(p.id)) return true
    }
    return false
  }

  return (
    <div className="space-y-3" aria-live="polite">
      {parishes.map((p, idx) => {
        const showLabel =
          Boolean(p.sectionLabel) && sectionHasVisible(idx)
        const showCard = Boolean(p.id && visibleIds.has(p.id))

        return (
          <div key={p.id || `idx-${idx}`}>
            {showLabel ? (
              <div className="section-label-row">{p.sectionLabel}</div>
            ) : null}
            {showCard ? <ParishCard parish={p} /> : null}
          </div>
        )
      })}
    </div>
  )
}
