"use client";

import Link from "next/link";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tealisdata",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Left — institutional */}
        <div className="flex items-center">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Tealisdata OÜ · Tallinn, Estonia · VAT EE102990636 ·{" "}
            <a href="mailto:info@tealisdata.com" className="py-2 hover:text-[var(--color-brand-text)] transition-colors">
              info@tealisdata.com
            </a>
          </p>
        </div>

        {/* Right — social + legal */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3.5">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="-m-2 p-2 text-[var(--text-muted)] hover:text-[var(--color-brand-text)] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="h-3.5 w-px bg-[var(--border-subtle)]" aria-hidden="true" />

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <Link href="/privacy-policy" className="py-2 hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="py-2 hover:text-[var(--text-primary)] transition-colors">
              Cookies
            </Link>
          </div>

          <p className="text-xs text-[var(--text-muted)] hidden sm:block">
            © 2026 Tealisdata OÜ
          </p>
        </div>

      </div>
    </footer>
  );
}
