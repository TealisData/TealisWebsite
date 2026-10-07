import type { Metadata } from "next";
import { GraduationCap, Users, Wrench } from "lucide-react";
import TrainingTracks from "@/components/training/TrainingTracks";
import ContactButton from "@/components/training/ContactButton";

export const metadata: Metadata = {
  title: "Training Programs – Tealis",
  description:
    "Official Microsoft courses and custom programs on Microsoft Fabric, Power BI, Azure Databricks, AI & Copilot and Power Platform — led by Microsoft Certified Trainers.",
};

const FORMATS = [
  {
    icon: <GraduationCap size={20} />,
    title: "Official Microsoft courses",
    text: "Instructor-led Microsoft curriculum, delivered by Microsoft Certified Trainers.",
    points: [
      "Classroom or remote delivery",
      "Hands-on labs",
      "Certification preparation: gap analysis, exam-style practice and a clear plan to pass",
    ],
  },
  {
    icon: <Wrench size={20} />,
    title: "Custom programs",
    text: "Training designed around your tools, your data and your business context.",
    points: ["Discovery workshop on your needs", "Curriculum built on your stack", "Exercises on your real data", "Follow-up Q&A sessions"],
  },
  {
    icon: <Users size={20} />,
    title: "Training on the job",
    text: "We build alongside your team on a real project — and leave the skills behind.",
    points: ["Side-by-side implementation", "Code & design reviews", "Weekly debriefs", "Documentation & knowledge base"],
  },
];

const labelClass = "text-xs font-semibold uppercase tracking-widest";

export default function TrainingPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

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
                <ul className="flex flex-col gap-2 mt-1">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
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
