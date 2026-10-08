"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react";
import WaveArt from "@/components/showcase/WaveArt";
import ContactButton from "@/components/showcase/ContactButton";
import { BOOKING_URL } from "@/lib/booking";

type SlotsResponse = { slots: string[]; durationMinutes: number; serviceName: string };
type Step = "pick" | "details" | "done";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Everything is shown in the visitor's own time zone
const tz = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const dayKey = (iso: string) => new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const fmtTime = (iso: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
const fmtDay = (iso: string) => new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date(iso));
const fmtMonth = (y: number, m: number) => new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(y, m, 1));
const keyOf = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const cardClass = "rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)]";
const labelClass = "block text-xs font-semibold text-[var(--text-primary)]/70 mb-1.5";
const inputClass =
  "w-full px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-primary)]/40 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] outline-none transition-colors focus:border-[var(--color-brand)] focus:bg-[var(--bg-primary)] focus:ring-2 focus:ring-[var(--color-brand)]/30";
const primaryButton =
  "px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--color-dark)] text-[var(--bg-primary)] hover:opacity-80 transition-opacity disabled:opacity-50";

/** In-site booking for the discovery call, backed by Microsoft Bookings through /api/booking */
export default function BookingWidget() {
  const [data, setData] = useState<SlotsResponse | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [step, setStep] = useState<Step>("pick");
  const [day, setDay] = useState<string | null>(null);
  const [month, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    setLoadError(false);
    try {
      const res = await fetch("/api/booking/slots", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const json: SlotsResponse = await res.json();
      setData(json);
      // Open on the first day with free times
      const first = json.slots[0];
      if (first) {
        const d = new Date(first);
        setDay((current) => current ?? dayKey(first));
        setMonth((current) => current ?? { y: d.getFullYear(), m: d.getMonth() });
      }
    } catch {
      setLoadError(true);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
  useEffect(() => { load(); }, []);

  // On phones the panel sits below the summary: bring each new step into view
  useEffect(() => {
    if (step !== "pick" && window.innerWidth < 1024) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of data?.slots ?? []) map.set(dayKey(s), [...(map.get(dayKey(s)) ?? []), s]);
    return map;
  }, [data]);

  const months = useMemo(() => {
    const list: { y: number; m: number }[] = [];
    for (const s of data?.slots ?? []) {
      const d = new Date(s);
      if (!list.some((x) => x.y === d.getFullYear() && x.m === d.getMonth())) list.push({ y: d.getFullYear(), m: d.getMonth() });
    }
    return list;
  }, [data]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !EMAIL.test(form.email.trim())) {
      setError("Please enter your name and a valid email.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, start: slot, timeZone: tz() }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStep("done");
      } else if (res.status === 409) {
        // Someone else took the slot: refresh and let the visitor pick again
        setSlot(null);
        setStep("pick");
        setError("Sorry, that time was just taken. Please pick another one.");
        load();
      } else {
        setError(json.error ? `${json.error}. Please try again or email us at info@tealisdata.com.` : "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us at info@tealisdata.com.");
    }
    setSending(false);
  };

  const monthIndex = month ? months.findIndex((x) => x.y === month.y && x.m === month.m) : -1;
  const daySlots = day ? byDay.get(day) ?? [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
      {/* ── Summary ── */}
      <aside className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-dark)] text-[var(--bg-primary)] p-6 md:p-8 flex flex-col gap-5">
        <WaveArt id="wave-art-booking" className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
        <div className="relative flex flex-col gap-3">
          <CalendarDays size={20} className="text-[var(--color-brand)]" />
          <h2 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
            {data?.serviceName ?? "Discovery call"}
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            A short call to understand your goals, your data and your team — and see how we can help.
          </p>
        </div>
        <ul className="relative flex flex-col gap-2.5 text-sm">
          <li className="flex items-center gap-3"><Clock size={16} className="opacity-70" /> {data?.durationMinutes ?? 30} minutes</li>
          <li className="flex items-center gap-3"><Video size={16} className="opacity-70" /> Microsoft Teams</li>
          <li className="flex items-center gap-3"><Globe size={16} className="opacity-70" /> Times in your time zone</li>
        </ul>
        {slot && step !== "pick" && (
          <div className="relative mt-auto rounded-lg border border-current/20 px-4 py-3 text-sm">
            <p className="font-semibold">{fmtDay(slot)}</p>
            <p className="opacity-80">{fmtTime(slot)} – {fmtTime(new Date(Date.parse(slot) + (data?.durationMinutes ?? 30) * 60_000).toISOString())}</p>
          </div>
        )}
      </aside>

      {/* ── Steps ── */}
      <div ref={panelRef} className={`${cardClass} p-6 md:p-8 min-h-[420px] scroll-mt-20`}>
        {loadError ? (
          <div className="flex flex-col items-start gap-4 max-w-md">
            <AlertCircle size={24} className="text-[var(--color-brand)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Online booking is temporarily unavailable</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              You can still pick a time on our Microsoft Bookings page, or send us a message and we&apos;ll get back to you within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>Open Microsoft Bookings</a>
              <button onClick={load} className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--color-brand)] transition-colors">
                Try again
              </button>
            </div>
          </div>
        ) : !data ? (
          <p className="text-sm text-[var(--text-muted)] animate-pulse">Loading availability…</p>
        ) : step === "done" && slot ? (
          <div className="flex flex-col items-start gap-4 max-w-md">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center">
              <CheckCircle2 size={26} className="text-[var(--color-brand)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>You&apos;re booked!</h3>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              See you on <span className="font-semibold text-[var(--text-primary)]">{fmtDay(slot)} at {fmtTime(slot)}</span>.
              We&apos;ve sent a confirmation with the Microsoft Teams link to <span className="font-semibold text-[var(--text-primary)]">{form.email}</span>.
            </p>
          </div>
        ) : step === "details" && slot ? (
          <form onSubmit={submit} className="flex flex-col gap-5 max-w-xl" noValidate>
            <button type="button" onClick={() => { setStep("pick"); setError(null); }} className="self-start flex items-center gap-1 text-sm text-[var(--color-brand)] hover:underline">
              <ChevronLeft size={16} /> Change time
            </button>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Your details</h3>
            {/* Honeypot: hidden from people, filled by bots */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name <span className="text-red-400">*</span></label>
                <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Smith" autoComplete="name" />
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" autoComplete="email" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Company</label>
              <input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" autoComplete="organization" />
            </div>
            <div>
              <label className={labelClass}>What would you like to discuss?</label>
              <textarea rows={4} className={`${inputClass} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="A few words about your project or needs" />
            </div>
            {error && <p className="text-sm text-red-500 flex items-center gap-2"><AlertCircle size={14} /> {error}</p>}
            <button type="submit" disabled={sending} className={`${primaryButton} self-start`}>
              {sending ? "Booking…" : "Confirm booking"}
            </button>
          </form>
        ) : data.slots.length === 0 ? (
          <div className="flex flex-col items-start gap-4 max-w-md">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">No free times right now</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">Send us a message and we&apos;ll find a time together.</p>
            <ContactButton>Write to us</ContactButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8">
            {/* Calendar */}
            <div className="flex flex-col gap-4">
              {error && <p className="text-sm text-red-500 flex items-center gap-2"><AlertCircle size={14} /> {error}</p>}
              {month && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{fmtMonth(month.y, month.m)}</h3>
                    <div className="flex gap-1">
                      {[-1, 1].map((dir) => {
                        const target = months[monthIndex + dir];
                        const Icon = dir < 0 ? ChevronLeft : ChevronRight;
                        return (
                          <button
                            key={dir}
                            disabled={!target}
                            onClick={() => target && setMonth(target)}
                            aria-label={dir < 0 ? "Previous month" : "Next month"}
                            className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-tint-1)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <Icon size={18} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {WEEKDAYS.map((w) => (
                      <span key={w} className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] py-2">{w}</span>
                    ))}
                    {Array.from({ length: (new Date(month.y, month.m, 1).getDay() + 6) % 7 }, (_, i) => <span key={`pad${i}`} />)}
                    {Array.from({ length: new Date(month.y, month.m + 1, 0).getDate() }, (_, i) => {
                      const key = keyOf(month.y, month.m, i + 1);
                      const available = byDay.has(key);
                      const selected = key === day;
                      return (
                        <button
                          key={key}
                          disabled={!available}
                          onClick={() => { setDay(key); setError(null); }}
                          className={`aspect-square max-h-12 w-full rounded-lg text-sm transition-colors ${
                            selected
                              ? "bg-[var(--color-brand)] text-white font-semibold"
                              : available
                                ? "bg-[var(--bg-tint-2)] text-[var(--text-primary)] font-semibold hover:bg-[var(--bg-tint-3)]"
                                : "text-[var(--text-muted)]/50 cursor-default"
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Times for the selected day */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{daySlots[0] ? fmtDay(daySlots[0]) : "Pick a day"}</p>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:max-h-[340px] md:overflow-y-auto md:pr-1">
                {daySlots.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSlot(s); setStep("details"); setError(null); }}
                    className="px-3 py-2.5 rounded-lg border border-[var(--border-subtle)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    {fmtTime(s)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)]">Time zone: {tz().replace(/_/g, " ")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
