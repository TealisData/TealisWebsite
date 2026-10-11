"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso)).replace(",", " ·");

/** The primary action in its working form: the next real free call slots, one click from booking.
 *  Falls back to the plain Book button while loading or if availability is unavailable. */
export default function NextSlots({ count = 3, label = "Book a 30-min call" }: { count?: number; label?: string }) {
  const [slots, setSlots] = useState<string[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/booking/slots", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { slots: string[] }) => alive && setSlots(d.slots.slice(0, count)))
      .catch(() => alive && setSlots([]));
    return () => { alive = false; };
  }, [count]);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/contact/meet"
        className="group self-start inline-flex items-center gap-3 rounded-full bg-[var(--color-dark)] text-[var(--bg-primary)] pl-6 pr-5 py-3.5 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        {label}
        <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>

      <div className="flex flex-col gap-2 min-h-[64px]" aria-live="polite">
        {slots === null ? (
          <div className="flex gap-2" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className="h-9 w-32 rounded-full bg-[var(--bg-tint-2)] animate-pulse" />
            ))}
          </div>
        ) : slots.length > 0 ? (
          <>
            <p className="text-sm text-[var(--text-muted)]">Next free times, in your time zone:</p>
            <ul className="flex flex-wrap gap-1.5">
              {slots.map((s) => (
                <li key={s}>
                  <Link
                    href={`/contact/meet?slot=${encodeURIComponent(s)}`}
                    className="tabular inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--line-teach)] px-2.5 py-1.5 text-[13px] font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tint-2)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--line-teach)]" aria-hidden="true" />
                    {fmt(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
