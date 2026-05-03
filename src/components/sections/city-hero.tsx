import type { CityMeta } from "@/types/parish";

export function CityHero({
  meta,
  parishCount,
}: {
  meta: CityMeta;
  parishCount: number;
}) {
  return (
    <header className="relative z-10 border-b border-black/8 bg-gradient-to-b from-accent/[0.06] to-transparent px-4 py-10 text-center sm:px-6">
      <div className="mb-3 inline-flex items-center justify-center text-3xl text-accent drop-shadow-sm">
        ✝
      </div>
      <h1 className="font-serif text-[clamp(1.6rem,5vw,2.25rem)] font-bold tracking-tight text-misa-800">
        Jadwal Misa <span className="text-accent">{meta.name}</span>
      </h1>
      <p className="mt-2 text-[0.85rem] font-normal uppercase tracking-[0.08em] text-misa-500">
        {meta.description} — 2026
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3 text-[0.78rem] text-misa-500">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-surface px-3 py-1 shadow-[var(--shadow-card)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span id="parish-count-num">{parishCount}</span> Paroki
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-surface px-3 py-1 shadow-[var(--shadow-card)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Data terverifikasi
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-surface px-3 py-1 shadow-[var(--shadow-card)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {meta.diocese}
        </span>
      </div>
    </header>
  );
}
