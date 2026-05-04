import Link from "next/link";
import type { CityMeta } from "@/types/parish";

export function CityCard({ city }: { city: CityMeta }) {
  return (
    <Link
      href={`/${city.id}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-black/8 bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-px hover:border-accent/25 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-serif text-lg font-bold text-misa-900 group-hover:text-accent sm:text-xl">
            {city.name}
          </h2>
          <p className="mt-1 text-sm text-misa-500 sm:text-base">{city.province}</p>
          <p className="mt-0.5 text-xs text-misa-400 sm:text-sm">{city.diocese}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent sm:text-sm">
          {city.parishCount} paroki
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-misa-600 sm:text-base">
        {city.description}
      </p>
      <span className="mt-4 text-sm font-semibold text-accent sm:text-base">
        Lihat Jadwal →
      </span>
    </Link>
  );
}
