# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally (confirmed 2026-10-11):

- **Decision makers evaluating a data partner** — IT, data or business leads at small and mid-sized companies who need a Microsoft data platform designed, built, governed or extended with AI. Success: they book a discovery call.
- **People responsible for upskilling a team** — team leads, L&D / HR or managers looking for Microsoft-certified training (Fabric, Power BI, Databricks, Power Platform, AI & agents). Success: they ask for a tailored programme or book a call.

Both arrive mostly from LinkedIn, referrals and search, usually on a laptop during work hours, comparing a few providers.

## Product Purpose

Tealisdata OÜ (Tallinn, Estonia) is a two-founder Microsoft data consultancy and training company. It does two things that reinforce each other:

- **Development** — designs and builds end-to-end data solutions: modern data architecture, data strategy & governance, AI & agents.
- **Training** — Microsoft Certified Trainers teaching the same stack, with certification paths (e.g. DP-600, DP-700, PL-300).

The website exists to make visitors trust two specific people enough to start a conversation.

## Positioning

The people who build your platform are the same people who train your team on it. Projects end with the client's team able to own and extend the work ("we transfer skills, not black boxes").

## Brand Commitments

- **Logo:** an open book (training) with a roof / hat above it (development). The logo must be kept; its particle animation on the home page may be rethought.
- **Colors:** keep the existing palette and token system in `app/globals.css` (brand blue, dark ink, light and dark themes, AA contrast rules).
- **Values:** transparency · knowledge sharing · competence · solutions that are not out-of-the-box (tailored to each client's context).
- **Voice:** plain, direct, human; English only.
- The user wants the site to feel more human, with a distinct identity, and must be able to go back to the current version (tag `live-before-redesign-2026-10-11`).

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind v4, framer-motion, deployed on Vercel from `main`; redesign happens on branch `redesign/human-identity` with a Vercel preview.
- Pages: Home, Consulting, Training, About (founders), Contact, in-site booking (`/contact/meet`, Microsoft Bookings via Graph), privacy and cookie policies.
- Contact form via Web3Forms; GA4 behind cookie consent.

## Evidence on Hand

- Real: founders' names, roles, bios and photos (`public/team/`), service and training-programme content (`components/consulting`, `components/training`), Microsoft certification codes.
- **Not available — must not be fabricated:** client logos, testimonials, case studies, project numbers, photos of classrooms or work.

## Product Principles

1. Show how we work, not just what we sell — transparency is demonstrated, not claimed.
2. Every page teaches something small: knowledge sharing is visible in the site itself.
3. Two real people, not a faceless agency.
4. Tailored over templated: nothing on the site should look out-of-the-box.

## Accessibility & Inclusion

WCAG AA contrast in light and dark themes; reduced-motion respected for all animations.
