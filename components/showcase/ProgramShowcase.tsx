"use client";

import { useEffect, useRef, useState } from "react";
import Station, { type Line } from "@/components/lines/Station";

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
  summary: string;
  // program: the tab that covers this technology, if any
  items: { name: string; program?: string }[];
};

/** Page intro + technology branches + the line of programs, shared by Training (Teach line)
 *  and Consulting (Build line). Every program is a station; picking one opens its stop. */
export default function ProgramShowcase({
  line,
  title,
  subtitle,
  groups,
  programs,
  explorerTitle,
  explorerIntro,
  ctaLabel,
}: {
  line: Exclude<Line, "both">;
  title: string;
  subtitle: string;
  groups: Group[];
  programs: Program[];
  explorerTitle: string;
  explorerIntro: string;
  ctaLabel: string;
}) {
  const [active, setActive] = useState(programs[0].id);
  const explorerRef = useRef<HTMLDivElement>(null);
  const current = programs.find((p) => p.id === active)!;
  const color = `var(--line-${line})`;
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  const explore = (id: string) => {
    setActive(id);
    explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Deep links from the home map (/training#power-bi) open that stop
  useEffect(() => {
    const id = window.location.hash.slice(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the URL once on load
    if (programs.some((p) => p.id === id)) setActive(id);
  }, [programs]);

  return (
    <>
      <Station
        first
        line={line}
        as="h1"
        title={title}
        intro={subtitle}
        className="band [--band:var(--bg-tint-1)]"
      >
        {/* The branches of this line: what each area covers, and the tools you can jump to */}
        <ul className="flex flex-col">
          {groups.map((g) => (
            <li key={g.id} className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-x-10 gap-y-2 py-5 border-t border-[var(--border-subtle)] first:border-t-0 first:pt-0">
              <h2 className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)]">
                <span className="h-3 w-3 shrink-0 rounded-full border-[3px]" style={{ borderColor: color }} aria-hidden="true" />
                {g.title}
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[62ch]">{g.summary}</p>
                <p className="flex flex-wrap gap-x-1 gap-y-1 text-sm">
                  {g.items.map((it, i) => (
                    <span key={it.name} className="inline-flex items-center gap-1">
                      {it.program ? (
                        <button
                          onClick={() => explore(it.program!)}
                          className="font-semibold text-[var(--text-primary)] underline decoration-[var(--border-subtle)] underline-offset-4 hover:text-[var(--color-brand-text)] hover:decoration-current transition-colors"
                        >
                          {it.name}
                        </button>
                      ) : (
                        <span className="font-semibold text-[var(--text-primary)]">{it.name}</span>
                      )}
                      {i < g.items.length - 1 && <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Station>

      <div ref={explorerRef} className="scroll-mt-20">
        <Station line={line} title={explorerTitle} intro={explorerIntro}>
          {/* The line itself is the tab list: one station per program */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto overflow-y-hidden">
            <div role="tablist" aria-label={explorerTitle} className="relative flex min-w-max sm:min-w-0">
              <span className="absolute left-3 right-3 top-[11px] h-[6px] rounded-full" style={{ background: color }} aria-hidden="true" />
              {programs.map((p) => {
                const on = active === p.id;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={on}
                    aria-controls="program-panel"
                    onClick={() => setActive(p.id)}
                    className="group relative flex-1 min-w-[132px] flex flex-col items-start gap-3 pr-4 text-left"
                  >
                    <span
                      className={`relative z-10 h-7 w-7 rounded-full border-[5px] transition-[background-color,transform] duration-300 ${on ? "scale-110" : "group-hover:scale-110"}`}
                      style={{ borderColor: color, background: on ? color : "var(--bg-primary)", transitionTimingFunction: "var(--ease-snap)" }}
                      aria-hidden="true"
                    />
                    <span className={`text-sm md:text-[15px] font-semibold leading-snug ${on ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"}`}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="program-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 pt-4">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight">{current.headline}</h3>
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">{current.description}</p>
              {/* CSS columns fill top-to-bottom, so the first half of the list forms column 1 */}
              <ul className="sm:columns-2 gap-x-10">
                {current.modules.map((m) => {
                  const key = typeof m === "string" ? m : m.title;
                  return (
                    <li key={key} className="flex items-start gap-3 mb-4 break-inside-avoid text-base text-[var(--text-primary)]">
                      <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border-2" style={{ borderColor: color }} aria-hidden="true" />
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

            <aside className="flex flex-col gap-6 self-start rounded-[var(--radius-lg)] border-2 p-6" style={{ borderColor: color }}>
              {current.facts
                .filter((f) => f.items.length > 0)
                .map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{f.label}</p>
                    {f.variant === "chips" ? (
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.items.join(f.label === "Levels" ? " → " : " · ")}</p>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {f.items.map((it) => {
                          const [code, name] = it.split(" · ");
                          return (
                            <li key={it} className="text-sm leading-snug">
                              {name ? (
                                <>
                                  <span className="tabular font-bold text-[var(--color-brand-text)]">{code}</span>{" "}
                                  <span className="text-[var(--text-primary)]">{name}</span>
                                </>
                              ) : (
                                <span className="text-[var(--text-primary)]">{it}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              <button
                onClick={openContact}
                className="self-start px-5 py-2.5 rounded-full border-2 border-[var(--text-primary)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
              >
                {ctaLabel}
              </button>
            </aside>
          </div>
        </Station>
      </div>
    </>
  );
}
