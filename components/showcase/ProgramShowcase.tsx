"use client";

import { useRef, useState } from "react";
import WaveArt from "@/components/showcase/WaveArt";

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

const labelClass = "text-xs font-semibold uppercase tracking-widest";

/** Page intro + technology groups + tabbed program explorer, shared by Training and Consulting */
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
  title: string;
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
      <section className="py-10 md:py-14 border-b border-[var(--border-subtle)]">
        <div className="flex flex-col gap-3 mb-8 max-w-2xl">
          <p className={`${labelClass} text-[var(--color-brand)]`}>{label}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((g, i) => {
            const featured = i === 0;
            const chip = featured
              ? "border-current/20 hover:border-[var(--color-brand)]"
              : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--color-brand)]";
            return (
              <div
                key={g.id}
                className={`relative overflow-hidden rounded-[var(--radius-lg)] border p-6 md:p-8 flex flex-col gap-5 ${
                  featured
                    ? "bg-[var(--color-dark)] text-[var(--bg-primary)] border-transparent"
                    : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                }`}
              >
                {featured && (
                  <WaveArt id={`wave-art-${g.id}`} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
                )}
                <div className="relative flex flex-col gap-3">
                  <span className="text-[var(--color-brand)]">{g.icon}</span>
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {g.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${featured ? "opacity-80" : "text-[var(--text-primary)]/70"}`}>{g.summary}</p>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      {it.program ? (
                        <button
                          onClick={() => explore(it.program!)}
                          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${chip}`}
                        >
                          {it.name}
                        </button>
                      ) : (
                        <span className={`inline-block px-3 py-1.5 text-sm rounded-md border ${chip.split(" hover:")[0]}`}>{it.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Program explorer ── */}
      <section ref={explorerRef} className="py-10 md:py-14 border-b border-[var(--border-subtle)] scroll-mt-20">
        <div className="flex flex-col gap-3 mb-6">
          <p className={`${labelClass} text-[var(--color-brand)]`}>{explorerLabel}</p>
        </div>

        <div className="flex gap-6 overflow-x-auto overflow-y-hidden border-b border-[var(--border-subtle)] -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
          {programs.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              onClick={() => setActive(p.id)}
              className={`relative shrink-0 pb-3 text-sm font-medium transition-colors ${
                active === p.id ? "text-[var(--color-brand)]" : "text-[var(--text-primary)] hover:text-[var(--color-brand)]"
              }`}
            >
              {p.label}
              <span className={`absolute left-0 -bottom-px h-0.5 bg-[var(--color-brand)] transition-all ${active === p.id ? "w-full" : "w-0"}`} />
            </button>
          ))}
        </div>

        <div role="tabpanel" className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 pt-8">
          <div className="flex flex-col gap-6">
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
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
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

          <aside className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 self-start">
            {current.facts
              .filter((f) => f.items.length > 0)
              .map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <p className={`${labelClass} text-[var(--text-muted)]`}>{f.label}</p>
                  {f.variant === "chips" ? (
                    <div className="flex gap-2 flex-wrap">
                      {f.items.map((it) => (
                        <span key={it} className="px-3 py-1 text-sm rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          {it}
                        </span>
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
            <button
              onClick={openContact}
              className="px-5 py-2.5 bg-[var(--color-dark)] text-[var(--bg-primary)] text-sm font-semibold rounded-lg hover:opacity-80 transition-opacity"
            >
              {ctaLabel}
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
