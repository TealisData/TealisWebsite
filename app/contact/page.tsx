"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74, 134, 232, 0); border-color: rgba(74, 134, 232, 0.35); }
          50%       { box-shadow: 0 0 18px 4px rgba(74, 134, 232, 0.18); border-color: rgba(74, 134, 232, 0.75); }
        }
        .card-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-10 py-12">

        {/* Top row: paragraph left, map right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Paragraph */}
          <div className="flex flex-col gap-6 lg:w-[38%]">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Contact</p>
              <h1
                className="text-3xl font-bold text-[var(--text-primary)] leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Get in touch.
              </h1>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Whether you have a specific project in mind, want to explore
              training options, or just want to understand what we do —
              we&apos;re happy to talk.
            </p>
            <div className="flex flex-col gap-1 text-sm text-[var(--text-muted)]">
              <p className="font-medium text-[var(--text-primary)]">Tealisdata OÜ</p>
              <p>Pärnu mnt 388b</p>
              <p>Nõmme, Tallinn</p>
              <p>Estonia</p>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-xl overflow-hidden border border-[var(--border-subtle)] min-h-[260px] lg:min-h-[300px]">
            <iframe
              src="https://maps.google.com/maps?q=P%C3%A4rnu+mnt+388b%2C+Tallinn%2C+Estonia&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tealisdata OÜ — Pärnu mnt 388b, Tallinn"
            />
          </div>
        </div>

        {/* Bottom row: 3 contact options horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[var(--border-subtle)] pt-8">

          {/* Book a meeting — highlighted with glow */}
          <div className="card-glow flex flex-col gap-3 p-6 rounded-xl border transition-colors">
            <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Book a meeting.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">
              Schedule a 30-minute call to discuss your project or needs.
            </p>
            <Link
              href="/contact/meet"
              className="text-xs font-semibold text-[var(--color-brand)] hover:underline"
            >
              Open calendar →
            </Link>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--color-brand)] transition-colors">
            <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Send an email.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">
              We respond within one business day.
            </p>
            <a
              href="mailto:info@tealisdata.com"
              className="text-xs font-semibold text-[var(--color-brand)] hover:underline"
            >
              info@tealisdata.com →
            </a>
          </div>

          <div className="flex flex-col gap-3 p-6 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--color-brand)] transition-colors">
            <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
              Connect on LinkedIn.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">
              Follow us for updates, insights and news.
            </p>
            <a
              href="https://www.linkedin.com/company/tealisdata"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--color-brand)] hover:underline"
            >
              linkedin.com/company/tealisdata →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
