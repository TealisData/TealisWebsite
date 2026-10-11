"use client";

import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

// A module is a short line, or a titled entry with a one-line explanation
export type Module = string | { title: string; text: string };

export type Program = {
  id: string;
  label: string;
  headline: string;
  description: string;
  modules: Module[];
  // Side panel facts, e.g. Levels (chips) or Certification path (list)
  facts: { label: string; items: string[]; variant: "chips" | "list" }[];
};

export type Group = {
  id: string;
  title: string;
  icon: React.ReactNode;
  /** Clear-line illustration shown at the top of the group's panel */
  scene?: React.ReactNode;
  summary: string;
  // program: the tab that covers this technology, if any
  items: { name: string; program?: string }[];
};

/** Page intro + technology groups + tabbed program explorer, shared by Training and Consulting.
 *  Drawn in the clear-line style: inked panels, flat fills, caption boxes. */
export default function ProgramShowcase({
  label,
  title,
  subtitle,
  groups,
  programs,
  explorerLabel,
  ctaLabel,
}: {
  label: string;
  title: React.ReactNode;
  subtitle: string;
  groups: Group[];
  programs: Program[];
  explorerLabel: string;
  ctaLabel: string;
}) {
  const [active, setActive] = useState(programs[0].id);
  const explorerRef = useRef<HTMLDivElement>(null);
  const current = programs.find((p) => p.id === active)!;
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  const explore = (id: string) => {
    setActive(id);
    explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Groups ── */}
      <section className="band [--band:var(--bg-tint-1)] py-8 md:py-12">
        <div className="flex flex-col items-start gap-4 mb-8 max-w-2xl">
          <span className="caption-box">{label}</span>
          <h1 className="text-3xl md:text-[44px] font-bold text-[var(--text-primary)] leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h1>
          <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {groups.map((g) => {
            const target = g.items.find((it) => it.program)?.program;
            const name = target ? programs.find((p) => p.id === target)?.label : undefined;
            return (
              <article key={g.id} className="panel overflow-hidden flex flex-col">
                {g.scene && <div className="bg-[var(--fill-sky)] border-b-[length:var(--line-w)] border-[var(--line)] px-4 pt-3">{g.scene}</div>}
                <div className="flex flex-col gap-4 p-6 flex-1">
                  <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                    {g.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{g.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <li key={it.name}>
                        {it.program ? (
                          <button onClick={() => explore(it.program!)} className="chip-line hover:bg-[var(--fill-sky)] transition-colors">
                            {it.name}
                          </button>
                        ) : (
                          <span className="chip-line">{it.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Straight to this area's detail in the explorer below */}
                  {target && (
                    <button onClick={() => explore(target)} aria-label={`See details${name ? `: ${name}` : ""}`} className="btn-ink group/cta mt-auto self-start">
                      See details
                      <ArrowDown size={16} className="transition-transform duration-200 group-hover/cta:translate-y-0.5" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Program explorer ── */}
      <section ref={explorerRef} className="band [--band:var(--bg-primary)] py-8 md:py-12 scroll-mt-20">
        <span className="caption-box mb-5">{explorerLabel}</span>

        <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
          {programs.map((p) => {
            const on = active === p.id;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={on}
                aria-controls="program-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => {
                  const i = programs.findIndex((x) => x.id === p.id);
                  const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? programs.length - 1 : null;
                  if (next === null) return;
                  e.preventDefault();
                  const t = programs[(next + programs.length) % programs.length];
                  setActive(t.id);
                  document.getElementById(`tab-${t.id}`)?.focus();
                }}
                className={`shrink-0 rounded-full border-[length:var(--line-w)] border-[var(--line)] px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? "bg-[var(--color-dark)] text-[var(--bg-primary)]" : "bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--fill-sky)]"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="program-panel" aria-labelledby={`tab-${current.id}`} className="panel mt-5 grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-hidden">
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {current.headline}
            </h3>
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">{current.description}</p>
            {/* CSS columns fill top-to-bottom, so the first half of the list forms column 1 */}
            <ul className="sm:columns-2 gap-x-8">
              {current.modules.map((m) => {
                const key = typeof m === "string" ? m : m.title;
                return (
                  <li key={key} className="flex items-start gap-3 mb-3 break-inside-avoid text-base text-[var(--text-primary)]">
                    <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--line)] bg-[var(--color-brand)]" />
                    {typeof m === "string" ? (
                      m
                    ) : (
                      <span className="flex flex-col">
                        <span className="font-semibold">{m.title}</span>
                        <span className="text-sm text-[var(--text-muted)] leading-relaxed">{m.text}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="flex flex-col gap-6 p-6 md:p-8 bg-[var(--fill-sky)] border-t-[length:var(--line-w)] lg:border-t-0 lg:border-l-[length:var(--line-w)] border-[var(--line)]">
            {current.facts
              .filter((f) => f.items.length > 0)
              .map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-primary)]">{f.label}</p>
                  {f.variant === "chips" ? (
                    <div className="flex gap-2 flex-wrap">
                      {f.items.map((it) => (
                        <span key={it} className="chip-line">{it}</span>
                      ))}
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-1.5">
                      {f.items.map((it) => (
                        <li key={it} className="text-sm text-[var(--text-primary)]">{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            <button onClick={openContact} className="btn-ink self-start">
              {ctaLabel}
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
