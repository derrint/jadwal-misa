"use client";

import { useState } from "react";
import type { Parish } from "@/types/parish";
import { previewMinggu, previewSabtu } from "@/lib/filter-utils";
import { SchedPill } from "@/components/ui/sched-pill";
import { TrustBadge } from "@/components/ui/trust-badge";

function TimeRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-misa-800">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </div>
  );
}

function buildSabtuLines(p: Parish): React.ReactNode[] {
  if (p.sabtuDetail?.length) {
    return p.sabtuDetail.map((line, i) => <TimeRow key={i}>{line}</TimeRow>);
  }
  if (!p.sabtu?.length) {
    return [<TimeRow key="empty">—</TimeRow>];
  }
  return p.sabtu.map((t, i) => (
    <TimeRow key={i}>{t.replace(/\./g, ":")} WIB</TimeRow>
  ));
}

function buildMingguLines(p: Parish): React.ReactNode[] {
  if (p.mingguDetail?.length) {
    return p.mingguDetail.map((line, i) => <TimeRow key={i}>{line}</TimeRow>);
  }
  if (!p.minggu?.length) {
    return [<TimeRow key="empty">—</TimeRow>];
  }
  return p.minggu.map((t, i) => (
    <TimeRow key={i}>{t.replace(/\./g, ":")} WIB</TimeRow>
  ));
}

export function ParishCard({ parish: p }: { parish: Parish }) {
  const [open, setOpen] = useState(false);

  const noteClass =
    p.noteSkin === "warn"
      ? "note-box note-box--warn"
      : p.noteSkin === "danger"
        ? "note-box note-box--danger"
        : "note-box";

  return (
    <article
      id={`card-${p.id}`}
      data-wilayah={p.wilayah}
      data-trust={p.trust}
      className={`card-parish overflow-hidden ${open ? "ring-1 ring-accent/15" : ""}`}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-start justify-between gap-3 border-0 bg-transparent p-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-black/8 bg-accent/10 text-lg">
            ⛪
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-base font-semibold leading-snug text-misa-900">
              {p.cardName}
            </h2>
            <p className="mt-0.5 text-sm font-medium tracking-wide text-accent">
              {p.cardParoki}
            </p>
            <p className="mt-1 text-xs text-misa-500">{p.location}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <TrustBadge trust={p.trust} />
          <span
            className="text-xs text-misa-400 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
          >
            ▼
          </span>
        </div>
      </button>

      <div className="flex flex-wrap gap-2 px-4 pb-4 pl-[4.5rem] sm:pl-16">
        <SchedPill day="SAB" text={previewSabtu(p)} />
        <SchedPill day="MIN" text={previewMinggu(p)} />
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-black/8 px-4 pb-4 pt-4">
            {!p.noSchedule ? (
              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-[10px] border border-black/8 bg-misa-50/80 p-3">
                  <div className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    🕯 Misa Sabtu
                  </div>
                  <div className="flex flex-col gap-1">
                    {buildSabtuLines(p)}
                  </div>
                </div>
                <div className="rounded-[10px] border border-black/8 bg-misa-50/80 p-3">
                  <div className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    ☀️ Misa Minggu
                  </div>
                  <div className="flex flex-col gap-1">
                    {buildMingguLines(p)}
                  </div>
                </div>
              </div>
            ) : null}

            {p.noteHtml ? (
              <div
                className={noteClass}
                /* Internal editorial HTML from parish JSON — not end-user input */
                dangerouslySetInnerHTML={{ __html: p.noteHtml }}
              />
            ) : null}

            {p.sources?.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {p.sources.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md border border-black/8 bg-misa-50 px-2 py-1 text-xs text-misa-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
