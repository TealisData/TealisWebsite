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

const PILLARS = [
  { label: "Who we are", text: "A team of Microsoft experts: hands-on consultants and Microsoft Certified Trainers." },
  {
    label: "What we do",
    text: "We design and build modern data architectures, data strategy & governance, and AI & agents — and train the teams who run them.",
  },
  { label: "How we work", text: "We transfer skills, not black boxes: every project leaves your team more autonomous." },
];

export default function HomePage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <div className="hidden md:block">
        <CanvasParticleBackground />
      </div>

      {/* Content — aligned with header logo, left half; sits in the upper part of the viewport */}
      <div className="relative z-10 flex-1 flex items-start pt-24 pb-12 md:pt-[14vh]">
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
                Engineering Solutions,
                <br />
                Training Teams
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <dl className="max-w-lg flex flex-col gap-4">
                {PILLARS.map((p) => (
                  <div key={p.label} className="flex flex-col gap-1">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">{p.label}</dt>
                    <dd className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">{p.text}</dd>
                  </div>
                ))}
              </dl>
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
