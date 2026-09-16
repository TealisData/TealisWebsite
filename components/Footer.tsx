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
  {
    label: "X / Twitter",
    href: "https://twitter.com/tealisdata",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@tealisdata",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
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
            Tealisdata OÜ · Tallinn, Estonia · VAT EE102990636
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
                className="text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="h-3.5 w-px bg-[var(--border-subtle)]" aria-hidden="true" />

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-[var(--text-primary)] transition-colors">
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
