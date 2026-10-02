"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import CanvasParticleBackground from "@/components/CanvasParticleBackground";

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
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <div className="hidden md:block">
        <CanvasParticleBackground />
      </div>

      {/* Content — aligned with header logo, left half */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Logo SVG has ~27% inner left whitespace (x=108/400); offset matches it */}
          <div data-particle-avoid className="max-w-2xl flex flex-col gap-7 pl-[27px] md:pl-[38px]">

            <FadeIn delay={0.05}>
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your Data Partner:
                <br />
                Engineering Solutions, Training Teams
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="max-w-lg text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                We build scalable data and AI solutions while training your team as
                Microsoft Certified Trainers — turning every project into a step
                toward internal autonomy.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                <button onClick={openContact} className="text-[var(--color-brand)] hover:underline">
                  Book a meeting
                </button>
                {" "}or{" "}
                <a href="mailto:info@tealisdata.com" className="text-[var(--color-brand)] hover:underline">
                  send us an email
                </a>.
              </p>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  );
}
