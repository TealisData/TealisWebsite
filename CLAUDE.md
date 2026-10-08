@AGENTS.md

# Tealis Website — Project Guide for Claude

This document is the single source of truth for any Claude session working on this codebase. Read it fully before making any change.

---

## Project overview

Corporate website for **Tealisdata OÜ** — a Microsoft data consulting and training company based in Tallinn, Estonia.

- **Repo:** https://github.com/TealisData/TealisWebsite
- **Local path:** `tealis-website/` inside the repo root
- **Live site:** deployed via Vercel (connected to `main` branch)
- **Language:** English only — all UI text, comments, and copy must be in English

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router (see AGENTS.md — breaking changes vs older versions) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Inter (body), Plus Jakarta Sans (headings) via `next/font/google` |
| Animations | framer-motion |
| Icons | lucide-react |
| Theme | next-themes with `attribute="data-theme"` |
| Analytics | Google Analytics 4 (`G-NEX7TNM74M`) via `next/script` |
| Cookie consent | Custom implementation — `components/CookieBanner.tsx` |

---

## File structure

```
app/
  layout.tsx          — root layout: Header, Footer, ContactDrawer, CookieBanner
  page.tsx            — Home (particle background, hero text)
  consulting/page.tsx — Consulting: same structure as Training (groups + service explorer, How we work, CTA)
  training/page.tsx   — Training: track groups + program explorer, How we teach, CTA
  about/page.tsx      — Team profiles (Gabriele + Luca)
  contact/page.tsx    — Contact: intro, 3 cards (book a meeting / message / LinkedIn), What happens next
  privacy-policy/     — Privacy policy (updated Sept 2026 for GA4)
  cookie-policy/      — Cookie policy (updated Sept 2026 for GA4)
  globals.css         — CSS variables / design tokens

components/
  Header.tsx                  — Fixed header, logo, nav, theme toggle, mobile hamburger
  Footer.tsx                  — Footer with company info, social links
  Logo.tsx                    — SVG logo component, variant="default"|"white"
  CanvasParticleBackground    — Animated particle canvas (home page, desktop only)
  ContactDrawer.tsx           — Slide-in contact form (global, triggered via custom event)
  CookieBanner.tsx            — GDPR cookie consent banner
  GoogleAnalytics.tsx         — GA4 script loader (only when consent given)
  ThemeProvider.tsx           — next-themes wrapper
  showcase/                   — shared by Training & Consulting: ProgramShowcase (intro, 3 groups,
                                tabbed explorer), ApproachSection, CtaBand, WaveArt, ContactButton
  training/trainingContent    — Training groups & programs data
  consulting/consultingContent — Consulting groups & services data

public/
  team/gabriele.png   — Gabriele Nicosia profile photo
  team/luca.png       — Luca Canonico profile photo
  logos/              — Logo SVG variants
```

---

## Design system — CSS variables

Always use CSS variables, never hardcoded colors.

```css
/* Brand */
--color-brand         /* #4A86E8 light / #5D97F5 dark */
--color-brand-hover
--color-dark          /* #22252A light / #F8FAFC dark — used for CTA button backgrounds */

/* Backgrounds */
--bg-primary          /* #FDFDFE light / #0A0C10 dark */
--bg-surface          /* slightly elevated surface */
--bg-tint-1/2/3       /* section bands: very light brand-tinted scale (dark-mode equivalents defined) */

/* Text */
--text-primary        /* #22252A light / #FFFFFF dark */
--text-muted          /* same as text-primary (both black/white by mode) */

/* Borders */
--border-subtle       /* rgba with low opacity */

/* Typography */
--font-heading        /* Plus Jakarta Sans */
--font-body           /* Inter */
```

**Section bands:** sections are separated by full-width background bands, not divider lines.
Use the `band` utility with a tint, e.g. `className="band [--band:var(--bg-tint-1)]"`; alternate tint-1 /
primary / tint-2 / primary. Cards on tinted bands use `bg-[var(--bg-primary)]`.

**CTA buttons** use `bg-[var(--color-dark)] text-[var(--bg-primary)]` — this auto-inverts correctly in both themes.

---

## Hard rules — do not break these

1. **Do not change any colors.** The design tokens are final. Never introduce new color values outside of `globals.css`.
2. **Do not change typography or section label style.** Font sizes, weights, spacing, and the `text-xs font-semibold uppercase tracking-widest` section label pattern are intentional.
3. **Mobile-first.** When fixing mobile issues, do not touch desktop layout. Use `md:` breakpoints to isolate.
4. **Always ask for review before committing and pushing.** Never run `git commit` + `git push` without explicit user approval of the changes.
5. **All text must be in English.** No Italian anywhere in the UI.
6. **No animations unless requested.** Framer-motion is used in limited places. Do not add new animations speculatively.

---

## Mobile patterns

- **Home:** particle background hidden on mobile (`hidden md:block` wrapper)
- **Consulting / Training:** single scrolling page; group cards stack to one column on mobile, technology chips scroll to the tabbed explorer (tabs scroll horizontally)
- **Header:** transparent only on `/` (home); all other pages always show `bg-[var(--bg-primary)]/90 backdrop-blur-md`
- **Logo:** `width={100} height={53}` on mobile, `md:w-[140px] md:h-[74px]` on desktop

---

## Theme (dark/light mode)

- Controlled by `next-themes`, stored as `data-theme` attribute on `<html>`
- Logo switches variant: `variant={mounted && resolvedTheme === "dark" ? "white" : "default"}`
- Particle colors computed per-frame in the render loop (not at build time) using `isRoof: boolean`
- `MutationObserver` on `data-theme` rebuilds particles on theme change

---

## Analytics & consent

- GA4 loads **only after** the user accepts analytics cookies
- Consent stored in `localStorage` key `tealis_cookie_consent` as `{ analytics: boolean }`
- If no consent stored → banner shows; if `analytics: false` → GA4 script never loads
- Do not add any other tracking without updating the cookie policy page

---

## Git workflow

- Branch: `main` (deploys directly to Vercel)
- Always stage specific files — never `git add -A` blindly
- Commit message format: short imperative summary, then bullet details
- Co-authorship line: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
- **Never commit or push without user approval**

---

## Team

| Person | Role |
|---|---|
| Gabriele Nicosia | Business Developer, client relationships, training |
| Luca Canonico | End-to-End Data Architect & Developer |

Contact email: info@tealisdata.com
