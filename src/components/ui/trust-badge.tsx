import type { Parish } from "@/types/parish"

const TRUST_TEXT: Record<Parish["trust"], string> = {
  tinggi: "✅ Tinggi",
  sedang: "⚠️ Sedang",
  rendah: "❓ Rendah",
}

const TRUST_CLASS: Record<Parish["trust"], string> = {
  tinggi: "trust-badge-high",
  sedang: "trust-badge-med",
  rendah: "trust-badge-low",
}

export function TrustBadge({ trust }: { trust: Parish["trust"] }) {
  return (
    <span className={`${TRUST_CLASS[trust]} inline-block whitespace-nowrap`}>
      {TRUST_TEXT[trust] ?? trust}
    </span>
  )
}
