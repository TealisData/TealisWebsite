"use client";

import { useEffect, useRef, useState } from "react";

export type Line = "both" | "build" | "teach";

/** A page section as a station on the route rail running down the left side of the page.
 *  The rail segment fills and the marker snaps in (one step, small overshoot) when the visitor
 *  arrives. Consecutive stations join into one continuous line. */
export default function Station({
  line = "both",
  title,
  intro,
  id,
  as: Heading = "h2",
  first = false,
  last = false,
  className = "",
  children,
}: {
  line?: Line;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  first?: boolean;
  last?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisited(true); io.disconnect(); } },
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Both rails keep fixed positions on every page so a line never jogs between stations;
  // a single-line station just leaves the other rail out
  const rails = ["build", "teach"] as const;
  const shown = (r: "build" | "teach") => line === "both" || line === r;
  const railOffset = "calc((var(--line-w) + var(--rail-gap)) / 2)";
  // The marker sits beside the heading's first line
  const markerTop = "calc(var(--st-pad) + 1.4rem)";

  return (
    <section
      ref={ref}
      id={id}
      data-visited={visited}
      className={`relative grid grid-cols-[28px_1fr] md:grid-cols-[64px_1fr] gap-x-4 md:gap-x-8 scroll-mt-24 [--st-pad:3.5rem] md:[--st-pad:5rem] py-[var(--st-pad)] ${className}`}
    >
      {/* Rail: positioned on the whole section (padding included) so consecutive stations join */}
      <div className="absolute inset-y-0 left-[14px] md:left-[32px] w-0" aria-hidden="true">
        <div
          className="absolute left-0 -translate-x-1/2 flex gap-[var(--rail-gap)]"
          style={{ top: first ? markerTop : 0, bottom: last ? `calc(100% - ${markerTop})` : 0 }}
        >
          {rails.map((r) => (
            <span key={r} className={`relative w-[var(--line-w)] h-full rounded-full overflow-hidden ${shown(r) ? "" : "invisible"}`}>
              <span className="absolute inset-0 opacity-20" style={{ background: `var(--line-${r})` }} />
              <span className="rail-fill absolute inset-0" style={{ background: `var(--line-${r})` }} />
            </span>
          ))}
        </div>
        <span
          className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 block bg-[var(--bg-primary)] border-[5px] ${
            line === "both" ? "w-10 h-[26px] rounded-full" : "w-[22px] h-[22px] rounded-full"
          } ${visited ? "station-arrive" : ""}`}
          style={{
            top: markerTop,
            marginLeft: line === "both" ? 0 : line === "build" ? `calc(-1 * ${railOffset})` : railOffset,
            borderColor: visited
              ? line === "both" ? "var(--line-build)" : `var(--line-${line})`
              : "color-mix(in srgb, var(--line-build) 30%, transparent)",
          }}
        />
      </div>
      <div aria-hidden="true" />

      {/* Stop content */}
      <div className="min-w-0 flex flex-col gap-8">
        <div className="flex flex-col gap-4 max-w-3xl">
          <Heading
            className={`${Heading === "h1" ? "text-[34px] md:text-5xl" : "text-3xl md:text-[44px]"} font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text-primary)] text-balance`}
          >
            {title}
          </Heading>
          {intro && <div className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
