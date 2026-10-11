"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SceneBuild, SceneHandover, SceneTeach, SceneWorkshop } from "@/components/clearline/Scenes";

// three.js only loads in the browser, after the page itself
const Logo3D = dynamic(() => import("@/components/Logo3D"), { ssr: false });

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  // The starting state must match on server and client (a reduced-motion branch here left the
  // hero stuck invisible after hydration); reduced motion only removes the movement and timing.
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
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

const STRIP = [
  { scene: SceneWorkshop, caption: "Assess & design", text: "We start from your goals and your data, not from a product catalogue." },
  { scene: SceneBuild, caption: "Build & deliver", text: "End-to-end delivery, from the data platform to dashboards, apps and agents." },
  { scene: SceneTeach, caption: "Train", text: "Official Microsoft courses and custom programs, taught by Microsoft Certified Trainers." },
  { scene: SceneHandover, caption: "Enable & hand over", text: "Your team owns the solution — no black boxes, no lock-in." },
];

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* First viewport: the 3D mark sits behind the hero only */}
      <div className="relative flex flex-col md:min-h-[calc(100svh-69px)] overflow-hidden">
        <div className="hidden md:block">
          <Logo3D />
        </div>

        {/* Content — aligned with header logo, left half; sits in the upper part of the viewport */}
        <div className="relative z-10 flex-1 flex items-start pt-24 pb-12 md:pt-[14vh]">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {/* Logo SVG has ~27% inner left whitespace (x=108/400); offset matches it */}
            <div data-particle-avoid className="max-w-2xl flex flex-col gap-7 pl-[27px] md:pl-[38px]">

              <FadeIn delay={0.05}>
                <h1
                  className="text-[28px] sm:text-[32px] md:text-[42px] font-bold leading-tight tracking-tight text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Data Partner:
                  <br />
                  Engineering Solutions,
                  <br />
                  Training Teams
                </h1>
              </FadeIn>

              <FadeIn delay={0.15}>
                <dl className="max-w-lg flex flex-col gap-4">
                  {PILLARS.map((p) => (
                    <div key={p.label} className="flex flex-col items-start gap-1.5">
                      <dt className="caption-box">{p.label}</dt>
                      <dd className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="flex flex-wrap items-center gap-3">
                  <Link data-press href="/contact/meet" className="btn-ink">
                    Book a meeting
                  </Link>
                  <a data-press href="mailto:info@tealisdata.com" className="btn-line">
                    Send us an email
                  </a>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </div>

      {/* How we work, drawn as a four-panel strip */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 band [--band:var(--bg-tint-1)] py-10 md:py-14">
        <div className="flex flex-col items-start gap-4 mb-8">
          <span className="caption-box">How we work</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            We transfer skills, not black boxes.
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STRIP.map(({ scene: Scene, caption, text }) => (
            <li key={caption} className="panel overflow-hidden flex flex-col">
              <div className="relative bg-[var(--fill-sky)] border-b-[length:var(--line-w)] border-[var(--line)] px-3 pt-10">
                <span className="caption-box absolute left-3 top-3">{caption}</span>
                <Scene className="w-full h-auto" />
              </div>
              <p className="p-5 text-sm text-[var(--text-muted)] leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
