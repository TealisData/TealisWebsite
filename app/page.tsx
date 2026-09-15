"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import CanvasParticleBackground from "@/components/CanvasParticleBackground";
import Link from "next/link";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    /* Full-viewport split: left = content, right = canvas */
    <div className="relative h-screen flex flex-col pt-14 md:pt-[69px] overflow-hidden">

      {/* Canvas fills the entire background */}
      <CanvasParticleBackground />

      {/* Content — left half on desktop, full width on mobile */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 max-w-2xl">

        <div className="flex flex-col gap-10">

          {/* Headline */}
          <FadeIn delay={0.05}>
            <h1
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Acceleration<br />through Data.
            </h1>
          </FadeIn>

          {/* Intro */}
          <FadeIn delay={0.15}>
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-sm">
              Tealis is your Microsoft data partner — combining engineering, analytics and training
              with real-world expertise. Based in Tallinn.
            </p>
          </FadeIn>

          {/* Sections */}
          <div className="flex flex-col gap-6">

            <FadeIn delay={0.25}>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Services.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
                  Microsoft Fabric, Power BI, Power Platform — end-to-end.{" "}
                  <Link href="/consulting" className="text-[var(--color-brand)] hover:underline">Consulting</Link>{" "}
                  and{" "}
                  <Link href="/formation" className="text-[var(--color-brand)] hover:underline">Formation</Link>.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Values.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
                  Plain language, fast delivery, no black boxes. We build capability inside your team,
                  not dependency on us.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.39}>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Get in touch.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  <button onClick={openContact} className="text-[var(--color-brand)] hover:underline">
                    Book a meeting
                  </button>
                  {" "}or{" "}
                  <a href="mailto:info@tealisdata.com" className="text-[var(--color-brand)] hover:underline">
                    send us an email
                  </a>.
                </p>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}
