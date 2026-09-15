"use client";

import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    // Open the contact drawer automatically when landing on /contact
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("tealis:open-contact"));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20 flex flex-col gap-12">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">Contact</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get in touch.
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
            Whether you have a specific project in mind, want to explore training options,
            or just want to understand what we do — we&apos;re happy to talk.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p
              className="text-base font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Book a meeting.
            </p>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Schedule a 30-minute introductory call to discuss your needs.
            </p>
            <button
              onClick={openContact}
              className="mt-2 w-fit inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors"
            >
              Open calendar
            </button>
          </div>

          <div className="h-px bg-[var(--border-subtle)]" />

          <div className="flex flex-col gap-2">
            <p
              className="text-base font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Send an email.
            </p>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Prefer email? We respond within one business day.
            </p>
            <a
              href="mailto:info@tealisdata.com"
              className="mt-2 w-fit text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              info@tealisdata.com
            </a>
          </div>

          <div className="h-px bg-[var(--border-subtle)]" />

          <div className="flex flex-col gap-2">
            <p
              className="text-base font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Connect on LinkedIn.
            </p>
            <a
              href="https://www.linkedin.com/company/tealisdata"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-fit text-sm font-medium text-[var(--color-brand)] hover:underline"
            >
              linkedin.com/company/tealisdata
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
