import Link from "next/link";

export default function MeetPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-col gap-4">

        <div>
          <Link
            href="/contact"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Contact
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Book a meeting</p>
          <h1
            className="text-3xl font-bold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let&apos;s talk.
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
            Choose a time that works for you. The call will be via Microsoft Teams.
          </p>
        </div>

      </div>

      {/* Cal.com embed — full width, fills remaining height */}
      <div className="flex-1 min-h-0">
        <iframe
          src="https://app.cal.com/gabriele-nicosia-pmuolr/30min?layout=month_view&embedType=inline"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", minHeight: "580px" }}
          title="Book a meeting with Tealisdata"
        />
      </div>
    </div>
  );
}
