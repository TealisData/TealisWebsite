"use client";

import { useEffect, useRef, useState } from "react";

/** A hand-drawn marker underline that draws itself once, the first time the word scrolls into view.
 *  The stroke is deliberately a little uneven, like a pen on a whiteboard. */
export default function Scribble({ children, delay = 250 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setDrawn(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-[-2%] w-[104%] -bottom-[0.18em] h-[0.42em] text-[var(--color-brand)] overflow-visible"
      >
        <path
          d="M2 9.5 C 30 6.5, 58 5.8, 92 6.6 S 160 8.4, 198 4.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          pathLength={1}
          className="scribble-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transitionDelay: `${delay}ms` }}
        />
      </svg>
    </span>
  );
}
