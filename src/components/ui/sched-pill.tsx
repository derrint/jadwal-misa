export function SchedPill({ day, text }: { day: "SAB" | "MIN"; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-black/8 bg-misa-50 px-2 py-0.5 text-xs text-misa-800">
      <span className="text-xs font-semibold tracking-wide text-accent">
        {day}
      </span>
      <span>{text}</span>
    </div>
  );
}
