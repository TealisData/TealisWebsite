"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import CanvasParticleBackground from "@/components/CanvasParticleBackground";
import Link from "next/link";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <div className="relative min-h-screen flex flex-col pt-14 md:pt-[69px]">
      <CanvasParticleBackground />

      {/* Main content — centered, fills viewport */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full px-6 sm:px-8 py-16 gap-16">

        {/* Badge */}
        <FadeIn delay={0.05}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-brand)]">
              Microsoft Data &amp; Analytics Partner
            </span>
          </div>
        </FadeIn>

        {/* Hero headline */}
        <FadeIn delay={0.15}>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Acceleration through Data.
            <span className="text-[var(--color-brand)]">&#x25CF;</span>
          </h1>
        </FadeIn>

        {/* Intro */}
        <FadeIn delay={0.25}>
          <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-xl">
            Tealis is your Microsoft data partner — combining engineering, analytics and training
            with real-world expertise. Founded in Tallinn by a team of certified Microsoft specialists.
          </p>
        </FadeIn>

        {/* Services */}
        <FadeIn delay={0.35}>
          <div className="flex flex-col gap-3">
            <p
              className="text-xl font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Services.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-xl">
              With deep specialization in Microsoft Fabric, Power BI and Power Platform,
              we cover the full spectrum — from data strategy and engineering to business automation
              and corporate training. One partner for the entire data journey.{" "}
              <Link href="/consulting" className="text-[var(--color-brand)] hover:underline">
                Consulting
              </Link>{" "}
              and{" "}
              <Link href="/formation" className="text-[var(--color-brand)] hover:underline">
                Formation
              </Link>
              .
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <FadeIn delay={0.45}>
          <div className="flex flex-col gap-3">
            <p
              className="text-xl font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Values.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-xl">
              We speak plainly, move fast and keep things transparent. No black boxes, no jargon.
              Our goal is not just to deliver projects — it is to build capability inside your team
              so you stay autonomous long after we&apos;re gone.
            </p>
          </div>
        </FadeIn>

        {/* Get in touch */}
        <FadeIn delay={0.55}>
          <div className="flex flex-col gap-3">
            <p
              className="text-xl font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get in touch.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed">
              If you&apos;d like to have a chat, you can{" "}
              <button
                onClick={openContact}
                className="text-[var(--color-brand)] hover:underline"
              >
                book a meeting
              </button>{" "}
              or{" "}
              <a
                href="mailto:info@tealisdata.com"
                className="text-[var(--color-brand)] hover:underline"
              >
                send us an email
              </a>
              .
            </p>
          </div>
        </FadeIn>

      </main>
    </div>
  );
}
