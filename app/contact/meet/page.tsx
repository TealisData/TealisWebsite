import type { Metadata } from "next";
import BookingWidget from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "Book a meeting – Tealis",
  description: "Pick a time for a free 30-minute discovery call on Microsoft Teams.",
};

export default function MeetPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <section className="band [--band:var(--bg-tint-1)] py-8 md:py-12">
          <div className="flex flex-col gap-3 mb-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Book a meeting</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Pick a time that works for you.
            </h1>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              Choose a day and a time below. You&apos;ll receive a confirmation e-mail with the Microsoft Teams link.
            </p>
          </div>
          <BookingWidget />
        </section>
      </div>
    </div>
  );
}
