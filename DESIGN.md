---
name: Tealis — Two Lines
description: Transit-diagram identity for Tealisdata. Every engagement travels the Build line (development, ink) and the Teach line (training, brand blue); pages are routes and sections are stations.
colors:
  brand: "#4A86E8"          # dark: #5D97F5 — fills, rails of the Teach line, decorative
  brand-text: "#2A66C9"     # dark: #5D97F5 — brand-coloured text and icons (≥4.5:1)
  brand-solid: "#2A66C9"    # dark: #3B74D1 — filled controls with white text
  ink: "#22252A"            # dark: #F8FAFC (color-dark) — the one filled action
  text-primary: "#22252A"   # dark: #E8EAED
  text-muted: "#22252A"     # dark: #A8B0BD
  bg-primary: "#FDFDFE"     # dark: #0A0C10
  bg-tint-1: "#F6F9FE"      # dark: #11161F — section bands
  bg-tint-2: "#EEF4FC"      # dark: #161D2A
  bg-tint-3: "#E6EEFA"      # dark: #1C2435
  line-build: "var(--text-primary)"
  line-teach: "var(--color-brand)"
typography:
  heading: "Plus Jakarta Sans, 700–800, tracking -0.02 to -0.03em"
  body: "Inter, 400–600"
  scale: { hero: "38→52px", h1: "34→48px", h2: "30→44px", station-name: "18–20px", body: "16–18px", meta: "13–14px" }
rounded: { chip: "999px", card: "20px" }
spacing: { station-padding: "3.5rem mobile / 5rem desktop", rail-column: "44px mobile / 64px desktop" }
components: [RouteMap, Station, NextSlots, LogoMark, ProgramShowcase, ApproachSection, CtaBand, ContactButton, BookingWidget]
---

# Design System: Tealis — Two Lines

**Creative North Star: "The people who build your platform are the people who teach your team."**

## Overview

The site is drawn as a transit diagram on the existing Tealis palette. Two lines run through every page:
the **Build line** (development, ink) and the **Teach line** (training, brand blue). They start together at the
Discovery call, split, and meet again at **Handover** — drawn as the Tealis mark (roof over the open book), the
moment the client's team owns the work. The logo itself is the map's interchange.

**Key characteristics**
- Rails, not cards: page structure is a left-hand rail (`Station`) where each section is a station; consecutive
  stations join into one continuous route. Both rails always run in parallel; the page's own line is solid, the
  other stays a faint track.
- Only 45° bends, round caps, white station dots with coloured rings, interchange capsules where both lines meet.
- People are stations: founders' portraits sit on their line (Gabriele on Teach, Luca on Build).
- One filled control per view: "Book a call" (ink pill). Everything else is outline or text link.
- Station labels follow a strict order: name · code/technology · level/headline.
- The primary action is live: `NextSlots` shows the next three real free call times from Microsoft Bookings.

## Colour

Tokens live in `app/globals.css` and are final unless the user asks. Line tokens: `--line-build` (=`--text-primary`)
and `--line-teach` (=`--color-brand`), `--line-w: 6px`, `--rail-gap: 4px`. Brand-coloured text always uses
`--color-brand-text`; white text sits only on `--color-brand-solid`. All pairs meet WCAG AA in both themes.

## Typography

Headings in Plus Jakarta Sans, body in Inter. No eyebrow/kicker labels above headings: the station marker beside
the heading is the section's identity. Certification codes and times use tabular numerals (`.tabular`).

## Motion

One grammar, "step one station at a time": `--ease-snap` (arrive, small overshoot, settle) for station markers
and the active stop; `--ease-out-expo` for the rail filling as the visitor reaches a station; the home map draws
station by station on load. All of it is disabled under `prefers-reduced-motion`.

## Components

- `components/lines/RouteMap.tsx` — home map (horizontal ≥768px, vertical on phones); stations link to sections.
- `components/lines/Station.tsx` — section-as-station with rail, marker (dot, capsule, or custom e.g. portrait).
- `components/lines/NextSlots.tsx` — Book button + next free times; `?slot=` preselects a time on `/contact/meet`.
- `components/showcase/ProgramShowcase.tsx` — a line's branches and its programmes as a station tab list.

## Do / Don't

- Do keep both rails continuous and in fixed positions; never jog a line between sections.
- Do keep the founders and the Tealis mark on the map.
- Don't add equal three-column card rows, eyebrows, gradient text or extra filled buttons.
- Don't invent clients, testimonials, numbers or durations.
