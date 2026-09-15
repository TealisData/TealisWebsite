"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    id: "power-bi",
    label: "Power BI",
    headline: "From data to insight, fast.",
    description:
      "Hands-on Power BI training covering the full pipeline — from data modeling with DAX and Power Query, to building reports, dashboards and semantic models that your business can actually use. Available from beginner to advanced.",
    modules: [
      "Power Query & data transformation",
      "Data modeling best practices",
      "DAX fundamentals to advanced",
      "Report design & UX principles",
      "Row-level security & governance",
      "Power BI Service & deployment",
    ],
    levels: ["Beginner", "Intermediate", "Advanced"],
    cert: "PL-300 Microsoft Certified: Power BI Data Analyst Associate",
  },
  {
    id: "fabric",
    label: "Microsoft Fabric",
    headline: "The unified analytics platform.",
    description:
      "Microsoft Fabric is the new end-to-end data platform. We teach your team how to work with Lakehouses, data pipelines, notebooks, semantic models and real-time analytics — all within a single governed environment.",
    modules: [
      "Fabric architecture & OneLake",
      "Data ingestion with Data Factory",
      "Lakehouse & Warehouse design",
      "Spark notebooks & data engineering",
      "Real-time analytics & Eventstream",
      "Semantic models & Power BI in Fabric",
    ],
    levels: ["Intermediate", "Advanced"],
    cert: "DP-600 Microsoft Certified: Fabric Analytics Engineer Associate",
  },
  {
    id: "copilot",
    label: "Microsoft Copilot",
    headline: "AI in your daily workflow.",
    description:
      "Practical training to get your team productive with Microsoft 365 Copilot and Copilot Studio. We focus on real business scenarios — writing, summarizing, automating — so adoption happens fast and sticks.",
    modules: [
      "Microsoft 365 Copilot overview",
      "Copilot in Word, Excel, PowerPoint, Teams",
      "Prompt engineering for business users",
      "Copilot Studio: building custom agents",
      "Governance, security & responsible AI",
    ],
    levels: ["Beginner", "Intermediate"],
    cert: "MS-4004 / MS-4005 Microsoft Applied Skills",
  },
  {
    id: "azure",
    label: "Azure Data",
    headline: "Cloud data engineering at scale.",
    description:
      "Azure data training covering storage, compute and orchestration services used in modern data engineering. From Azure Data Factory to Synapse Analytics, we prepare your team to design and operate cloud data solutions.",
    modules: [
      "Azure storage (ADLS, Blob)",
      "Azure Data Factory pipelines",
      "Azure Synapse Analytics",
      "Azure Databricks fundamentals",
      "Monitoring, cost & optimization",
    ],
    levels: ["Intermediate", "Advanced"],
    cert: "DP-203 Microsoft Certified: Azure Data Engineer Associate",
  },
  {
    id: "custom",
    label: "Custom Programs",
    headline: "Training built around your stack.",
    description:
      "Not everything fits a standard curriculum. We design bespoke training programs built around your actual tools, processes and data infrastructure — delivered in the format that works best for your team.",
    modules: [
      "Requirements discovery workshop",
      "Custom curriculum design",
      "Exercises based on your real data",
      "Delivered in-person or remote",
      "Ongoing support & Q&A sessions",
    ],
    levels: ["All levels"],
    cert: undefined,
  },
  {
    id: "on-the-job",
    label: "Training on the Job",
    headline: "Learn while you ship.",
    description:
      "We embed alongside your team during a real project — acting as both implementers and coaches. Your team delivers the work and builds the skills simultaneously. The most effective form of knowledge transfer.",
    modules: [
      "Joint project scoping",
      "Side-by-side implementation",
      "Code & design reviews",
      "Weekly debriefs & retrospectives",
      "Documentation & knowledge base",
    ],
    levels: ["Intermediate", "Advanced"],
    cert: undefined,
  },
];

export default function FormationPage() {
  const [active, setActive] = useState(courses[0].id);
  const current = courses.find((c) => c.id === active)!;

  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-3">Formation</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Training.
        </h1>
        <p className="mt-4 text-[var(--text-muted)] max-w-xl leading-relaxed">
          Official Microsoft curriculum and custom corporate programs — delivered by practitioners, not just instructors.
        </p>
      </div>

      {/* Split-screen */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-0 border border-[var(--border-subtle)] rounded-2xl overflow-hidden">

          {/* Left — course list */}
          <nav className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <ul>
              {courses.map((c, i) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActive(c.id)}
                    className={`w-full text-left px-6 py-4 flex items-center justify-between gap-3 text-sm font-medium transition-colors duration-150 ${
                      active === c.id
                        ? "bg-[var(--bg-primary)] text-[var(--color-brand)] border-l-2 border-[var(--color-brand)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/50"
                    } ${i < courses.length - 1 ? "border-b border-[var(--border-subtle)]" : ""}`}
                  >
                    {c.label}
                    {active === c.id && <ArrowRight size={14} className="shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — detail */}
          <div className="flex-1 p-8 md:p-12 min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-7 h-full"
              >
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {current.levels.map((l) => (
                      <span
                        key={l}
                        className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {current.headline}
                  </h2>
                  <p className="text-[var(--text-muted)] leading-relaxed max-w-lg">{current.description}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">Program modules</p>
                  <ul className="flex flex-col gap-2">
                    {current.modules.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {current.cert && (
                  <div className="px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-1">Certification path</p>
                    <p className="text-sm text-[var(--text-primary)]">{current.cert}</p>
                  </div>
                )}

                <button
                  onClick={openContact}
                  className="mt-auto w-fit inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors"
                >
                  Request a quote <ArrowRight size={15} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
