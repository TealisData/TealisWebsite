"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import DotArt, { type DotShape } from "@/components/dots/DotArt";
import { CONSULTING_GROUPS } from "@/components/consulting/consultingContent";
import { TRAINING_GROUPS } from "@/components/training/trainingContent";

// three.js only loads in the browser, after the page itself
const Logo3D = dynamic(() => import("@/components/Logo3D"), { ssr: false });

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  // Same starting state on server and client; reduced motion only drops the movement and timing
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PILLARS = [
  { label: "Who we are", text: "Expert consultants, developers and Microsoft Certified Trainers." },
  { label: "What we do", text: "Modern Data Architecture, Data Strategy & Governance, AI & Agents, and Microsoft Training." },
  { label: "Our approach", text: "We transfer skills, not black boxes: your team gains full autonomy." },
];

// Mosaic: each line opens with its intro tile, then one tile per area with a dot picture
const CONSULTING_SHAPES: Record<string, DotShape> = { "data-architecture": "architecture", "data-strategy": "shield", ai: "chat" };
const TRAINING_SHAPES: Record<string, DotShape> = { data: "layers", apps: "app", ai: "chat" };
const TRAINING_TARGET: Record<string, string> = { data: "fabric", apps: "power-platform", ai: "ai" };

const TILE_TONES = [
  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
  "bg-[var(--bg-tint-2)] text-[var(--text-primary)]",
  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
];

const FOUNDERS = [
  { name: "Gabriele Nicosia", role: "Business Developer", photo: "/team/gabriele.png" },
  { name: "Luca Canonico", role: "End-to-End Data Architect & Developer", photo: "/team/luca.png" },
];

function AreaTile({ href, title, text, shape, tone, id }: { href: string; title: string; text: string; shape: DotShape; tone: string; id: string }) {
  return (
    <Link href={href} className={`group relative flex flex-col justify-between gap-6 p-7 md:p-8 min-h-[300px] ${tone} transition-colors`}>
      <DotArt id={id} shape={shape} color="var(--text-primary)" className="w-32 h-32 md:w-36 md:h-36 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-text)]">
          See details <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">

      {/* ── First viewport: a dark field, the dot logo, our words ── */}
      <section className="relative isolate overflow-hidden bg-[var(--field-ink)] text-[var(--on-field)] md:min-h-[86svh]">
        <div className="hidden md:block">
          <Logo3D ink="#E8EAED" />
        </div>
        {/* Phones get the mark as a still dot picture instead of the 3D build */}
        <DotArt id="hero-mark" shape="book" color="var(--on-field)" accent="var(--color-brand)" step={7} radius={1.8} className="md:hidden absolute right-[-12%] bottom-[-6%] w-[78%] h-auto opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-56 md:pt-[22vh] md:pb-24">
          <div data-particle-avoid className="max-w-[47rem] flex flex-col gap-8">
            <FadeIn delay={0.05}>
              <h1 className="text-[40px] leading-[1.02] sm:text-5xl md:text-[68px] font-extrabold tracking-[-0.035em]">
                Your Data Partner:
                <br />
                <span className="text-[var(--on-field-accent)]">Engineering Solutions,</span>
                <br />
                Training Teams
              </h1>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div className="flex flex-wrap items-center gap-3">
                <Link data-press href="/contact/meet" className="inline-flex items-center gap-2 rounded-full bg-[var(--field-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:brightness-110">
                  Book a meeting <ArrowRight size={18} />
                </Link>
                <a data-press href="mailto:info@tealisdata.com" className="inline-flex items-center rounded-full border border-white/35 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
                  Send us an email
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Three statements, editorial ── */}
      <section className="bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {PILLARS.map((p) => (
            <div key={p.label} className="flex flex-col gap-4 border-t-[3px] border-[var(--text-primary)] pt-5">
              <span className="text-sm font-semibold text-[var(--color-brand-text)]">{p.label}</span>
              <p className="text-2xl md:text-[28px] font-bold leading-[1.2] tracking-[-0.015em] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What we do: a mosaic, one row per line of work ── */}
      <section className="bg-[var(--bg-tint-1)]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--border-subtle)] rounded-[20px] overflow-hidden">
            <Link href="/consulting" className="group relative flex flex-col justify-between gap-8 p-7 md:p-8 min-h-[300px] bg-[var(--field-blue)] text-white">
              <DotArt id="tile-consulting" shape="book" color="#ffffff" accent="var(--field-ink)" className="w-28 h-28 md:w-32 md:h-32" />
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-extrabold tracking-[-0.02em]">Consulting</h2>
                <p className="text-sm leading-relaxed text-white/85">
                  We build modern data platforms, put the strategy and governance around them, and bring AI into your daily work — on the Microsoft stack, with knowledge transfer built in, so you never depend on us.
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Explore consulting <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            {CONSULTING_GROUPS.map((g, i) => (
              <AreaTile key={g.id} id={`c-${g.id}`} href={`/consulting#${g.id}`} title={g.title} text={g.summary} shape={CONSULTING_SHAPES[g.id] ?? "layers"} tone={TILE_TONES[i % 3]} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--border-subtle)] rounded-[20px] overflow-hidden">
            <Link href="/training" className="group relative flex flex-col justify-between gap-8 p-7 md:p-8 min-h-[300px] bg-[var(--field-ink)] text-[var(--on-field)]">
              <DotArt id="tile-training" shape="book" color="var(--on-field)" accent="var(--color-brand)" className="w-28 h-28 md:w-32 md:h-32" />
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-extrabold tracking-[-0.02em]">Training</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  Official Microsoft courses and custom programs on Fabric, Power BI, Databricks, AI and Power Platform — taught by Microsoft Certified Trainers who build these solutions every day.
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--on-field-accent)]">
                  Explore training <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            {TRAINING_GROUPS.map((g, i) => (
              <AreaTile key={g.id} id={`t-${g.id}`} href={`/training#${TRAINING_TARGET[g.id] ?? ""}`} title={g.title} text={g.summary} shape={TRAINING_SHAPES[g.id] ?? "layers"} tone={TILE_TONES[(i + 1) % 3]} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The two of us ── */}
      <section className="bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
              We transfer skills,<br />not black boxes.
            </h2>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-md">
              Expert consultants, developers and Microsoft Certified Trainers.
            </p>
            <Link href="/about" className="self-start inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-text)] hover:underline">
              Meet the founders <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {FOUNDERS.map((f) => (
              <Link key={f.name} href="/about" className="group flex flex-col gap-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[var(--field-blue)]">
                  {/* Duotone: the photo in ink tones over the logo blue */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale contrast-125 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{f.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{f.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close: full-width blue ── */}
      <section className="bg-[var(--field-blue)] text-white">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-[-0.03em]">Let&apos;s talk about your data.</h2>
            <p className="text-base md:text-lg text-white/85 leading-relaxed">
              Tell us your goals and current stack — we&apos;ll propose the right architecture and a roadmap to get there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link data-press href="/contact/meet" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[var(--field-ink)] transition-opacity hover:opacity-90">
              Book a meeting <ArrowRight size={18} />
            </Link>
            <a data-press href="mailto:info@tealisdata.com" className="inline-flex items-center rounded-full border border-white/50 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              Send us an email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
