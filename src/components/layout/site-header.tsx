export type SiteHeaderProps = {
  title: React.ReactNode;
  subtitle?: string;
  meta?: React.ReactNode;
};

export function SiteHeader({ title, subtitle, meta }: SiteHeaderProps) {
  return (
    <header className="relative z-10 border-b border-black/8 bg-gradient-to-b from-accent/[0.06] to-transparent px-4 py-10 text-center sm:px-6">
      <div className="cross-icon mb-3 inline-flex items-center justify-center text-3xl text-accent drop-shadow-sm">
        ✝
      </div>
      <h1 className="font-serif text-3xl font-bold tracking-tight text-misa-800 sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-sm font-normal uppercase tracking-[0.08em] text-misa-500">
          {subtitle}
        </p>
      ) : null}
      {meta ? (
        <div className="mt-5 flex flex-wrap justify-center gap-4">{meta}</div>
      ) : null}
    </header>
  );
}
