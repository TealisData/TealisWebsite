"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const courses = [
  {
    id: "power-bi",
    label: "Power BI",
    headline: "From data to insight, fast.",
    subtitle: "From Power Query to certified Power BI Data Analyst — all levels.",
    description:
      "Hands-on Power BI training covering the full pipeline — data modeling with DAX and Power Query, building reports, dashboards and semantic models that your business can actually use. Available from beginner to advanced.",
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
    subtitle: "Lakehouse, pipelines, notebooks and real-time analytics — in one environment.",
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
    subtitle: "Real business scenarios — so adoption happens fast and sticks.",
    description:
      "Practical training to get your team productive with Microsoft 365 Copilot and Copilot Studio. We focus on actual use cases — writing, summarizing, automating — not generic demos.",
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
    subtitle: "Design and operate modern Azure data solutions.",
    description:
      "Azure data training covering storage, compute and orchestration services used in modern data engineering. From Azure Data Factory to Synapse Analytics, we prepare your team for real cloud workloads.",
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
    subtitle: "Built on your actual tools, data and business context.",
    description:
      "Not everything fits a standard curriculum. We design bespoke training programs built around your real infrastructure — delivered in the format that works best for your team, in-person or remote.",
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
    subtitle: "The most effective form of knowledge transfer.",
    description:
      "We embed alongside your team during a real project — acting as both implementers and coaches. Your team delivers the work and builds the skills simultaneously. No slides, no theory — just learning by doing.",
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
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

        {/* ── Left column ── */}
        <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] overflow-y-auto">
          <div className="py-12 lg:pr-12 flex flex-col gap-8">

            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Training</p>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                Training Programs
              </h1>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Official Microsoft curriculum and custom corporate programs — delivered by practitioners, not just instructors.
              </p>
            </div>

            <nav>
              <ul className="border-t border-[var(--border-subtle)]">
                {courses.map((c) => (
                  <li key={c.id} className="border-b border-[var(--border-subtle)]">
                    <button
                      onClick={() => setActive(c.id)}
                      className={`w-full text-left py-4 flex items-center justify-between gap-3 transition-colors duration-150 group ${
                        active === c.id ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span className={`text-base leading-snug ${active === c.id ? "font-semibold" : "font-normal"}`}>
                        {c.label}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`shrink-0 ${active === c.id ? "text-[var(--text-primary)]" : "text-[var(--border-subtle)] group-hover:text-[var(--text-muted)]"}`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-12 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      {current.headline}
                    </h2>
                    <p className="mt-2 text-base text-[var(--text-muted)]">{current.subtitle}</p>
                  </div>
                  <button
                    onClick={openContact}
                    className="shrink-0 px-5 py-2.5 bg-[var(--color-dark)] text-[var(--bg-primary)] text-sm font-semibold rounded-lg hover:opacity-80 transition-opacity"
                  >
                    Request a quote
                  </button>
                </div>

                <hr className="border-[var(--border-subtle)]" />

                <div className="flex gap-2 flex-wrap">
                  {current.levels.map((l) => (
                    <span key={l} className="px-3 py-1 text-sm rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)]">
                      {l}
                    </span>
                  ))}
                </div>

                <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {current.description}
                </p>

                <ul className="flex flex-col gap-3">
                  {current.modules.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-base text-[var(--text-primary)]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>

                {current.cert && (
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">Certification path</p>
                    <p className="text-base text-[var(--text-primary)]">{current.cert}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
