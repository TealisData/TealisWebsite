import type { Metadata } from "next";
import { GraduationCap, MonitorPlay, Target } from "lucide-react";
import TrainingHeroArt from "@/components/training/TrainingHeroArt";
import TrainingTracks from "@/components/training/TrainingTracks";
import ContactButton from "@/components/training/ContactButton";

export const metadata: Metadata = {
  title: "Training Programs – Tealis",
  description:
    "Official Microsoft courses and custom programs on Microsoft Fabric, Power BI, Azure Databricks, AI & Copilot and Power Platform — led by Microsoft Certified Trainers.",
};

const FORMATS = [
  {
    icon: <MonitorPlay size={20} />,
    title: "Official Microsoft courses",
    text: "Instructor-led Microsoft curriculum, in the classroom or remote, with hands-on labs.",
  },
  {
    icon: <Target size={20} />,
    title: "Programs on your data",
    text: "Exercises built on your own tools and datasets, so skills transfer straight to the job.",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Certification preparation",
    text: "Gap analysis, exam-style practice and a clear plan to pass with confidence.",
  },
];

const labelClass = "text-xs font-semibold uppercase tracking-widest";

export default function TrainingPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        {/* ── Hero ── */}
        <section className="pt-8 md:pt-12">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
            <div className="relative z-10 flex flex-col justify-center gap-5 p-8 md:p-12">
              <p className={`${labelClass} text-[var(--color-brand)]`}>Training</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Microsoft data &amp; AI skills your team keeps.
              </h1>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-md">
                Official Microsoft courses and custom programs on Fabric, Power BI, Databricks, AI and Power Platform —
                taught by Microsoft Certified Trainers who build these solutions every day.
              </p>
              <ContactButton className="self-start mt-2">Plan your training</ContactButton>
            </div>
            <TrainingHeroArt
              id="training-art-hero"
              className="w-full h-56 md:h-full md:absolute md:inset-y-0 md:right-0 md:w-3/5"
            />
          </div>
        </section>

        <TrainingTracks />

        {/* ── Delivery formats ── */}
        <section className="py-14 md:py-20 border-b border-[var(--border-subtle)]">
          <div className="flex flex-col gap-3 mb-10 max-w-2xl">
            <p className={`${labelClass} text-[var(--color-brand)]`}>How we teach</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Practical, hands-on, built to stick.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMATS.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6">
                <span className="text-[var(--color-brand)]">{f.icon}</span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 md:py-20">
          <div className="rounded-[var(--radius-xl)] bg-[var(--color-dark)] text-[var(--bg-primary)] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Let&apos;s design your team&apos;s learning path.
              </h2>
              <p className="text-sm md:text-base opacity-75 leading-relaxed">
                Tell us your stack and goals — we&apos;ll propose the right mix of courses, labs and certification prep.
              </p>
            </div>
            <ContactButton variant="inverted" className="self-start md:self-auto shrink-0">Request a quote</ContactButton>
          </div>
        </section>

      </div>
    </div>
  );
}
