"use client";

import { useRef, useState } from "react";
import { ArrowRight, Bot, ChartColumnBig, Database, Layers, Users, Workflow, Wrench } from "lucide-react";
import TrainingHeroArt from "@/components/training/TrainingHeroArt";

type Track = {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  headline: string;
  description: string;
  modules: string[];
  levels: string[];
  certs: string[];
};

const TRACKS: Track[] = [
  {
    id: "fabric",
    label: "Microsoft Fabric",
    category: "Data platform",
    icon: <Layers size={20} />,
    summary: "Lakehouses, pipelines, notebooks and semantic models in one governed environment.",
    headline: "One platform, end to end.",
    description:
      "Learn to design and run analytics on Microsoft Fabric — from ingestion and Lakehouse design to Spark engineering, real-time data and semantic models that Power BI can trust.",
    modules: [
      "Fabric architecture & OneLake",
      "Ingestion with pipelines & Dataflows Gen2",
      "Lakehouse & Warehouse design",
      "Spark notebooks & data engineering",
      "Real-time intelligence",
      "Semantic models & Power BI in Fabric",
    ],
    levels: ["Intermediate", "Advanced"],
    certs: ["DP-600 · Fabric Analytics Engineer Associate", "DP-700 · Fabric Data Engineer Associate"],
  },
  {
    id: "power-bi",
    label: "Power BI",
    category: "Analytics",
    icon: <ChartColumnBig size={20} />,
    summary: "From Power Query to certified analyst — modeling, DAX and reports people use.",
    headline: "From data to decisions.",
    description:
      "The full Power BI workflow: shaping data with Power Query and M, building solid models, writing DAX with confidence, and publishing secure reports your business actually uses.",
    modules: [
      "Power Query & M",
      "Data modeling best practices",
      "DAX fundamentals to advanced",
      "Report design & UX",
      "Row-level security & governance",
      "Power BI Service & deployment",
    ],
    levels: ["Beginner", "Intermediate", "Advanced"],
    certs: ["PL-300 · Power BI Data Analyst Associate"],
  },
  {
    id: "databricks",
    label: "Azure Databricks",
    category: "Data engineering",
    icon: <Database size={20} />,
    summary: "Delta Lake, Delta Live Tables and Workflows for production-grade pipelines.",
    headline: "Lakehouse engineering at scale.",
    description:
      "Hands-on data engineering on Azure Databricks: reliable Delta tables, declarative pipelines, orchestrated workloads and the Python and SQL skills to run them.",
    modules: [
      "Delta Lake fundamentals",
      "Pipelines with Delta Live Tables",
      "Orchestration with Databricks Workflows",
      "Spark with Python & SQL",
      "Governance with Unity Catalog",
    ],
    levels: ["Intermediate", "Advanced"],
    certs: ["DP-750 · Azure Databricks Data Engineer Associate"],
  },
  {
    id: "ai",
    label: "AI & Copilot",
    category: "Artificial intelligence",
    icon: <Bot size={20} />,
    summary: "Copilot, Azure AI Foundry and Azure ML — from business value to working solutions.",
    headline: "Put AI to work, responsibly.",
    description:
      "From identifying where generative AI creates value to building with Copilot Studio, Azure AI Foundry and Azure Machine Learning — with governance and responsible AI built in.",
    modules: [
      "Business value of generative AI",
      "Microsoft 365 Copilot in daily work",
      "Building agents with Copilot Studio",
      "Azure AI Foundry",
      "Azure Machine Learning fundamentals",
      "Responsible AI & governance",
    ],
    levels: ["Beginner", "Intermediate", "Advanced"],
    certs: [
      "AI-901 · Azure AI Fundamentals",
      "AB-730 · AI Business Professional",
      "AB-731 · AI Transformation Leader",
      "AB-620 · AI Agent Builder Associate",
      "AI-103 · Azure AI Apps and Agents Developer Associate",
      "AI-300 · Machine Learning Operations Engineer Associate",
    ],
  },
  {
    id: "power-platform",
    label: "Power Platform",
    category: "Low-code & automation",
    icon: <Workflow size={20} />,
    summary: "Power Apps, Power Automate and Power Fx — apps and flows your team can own.",
    headline: "Apps and automation, built by your team.",
    description:
      "Practical low-code training: build apps with Power Apps and Power Fx, automate processes with Power Automate, and keep it all governed and maintainable.",
    modules: [
      "Canvas & model-driven Power Apps",
      "Power Fx formulas",
      "Process automation with Power Automate",
      "Dataverse essentials",
      "Governance & application lifecycle",
    ],
    levels: ["Beginner", "Intermediate"],
    certs: ["PL-900 · Power Platform Fundamentals", "PL-400 / AB-400 · Power Platform Developer Associate"],
  },
  {
    id: "custom",
    label: "Custom Programs",
    category: "Tailored",
    icon: <Wrench size={20} />,
    summary: "Curricula built on your tools, your data and your business context.",
    headline: "Training built around your stack.",
    description:
      "Not everything fits a standard curriculum. We design programs around your real infrastructure and data — delivered in the format that works best for your team, in person or remote.",
    modules: [
      "Requirements discovery workshop",
      "Custom curriculum design",
      "Exercises on your real data",
      "In-person or remote delivery",
      "Follow-up Q&A sessions",
    ],
    levels: ["All levels"],
    certs: [],
  },
  {
    id: "on-the-job",
    label: "Training on the Job",
    category: "Learning by doing",
    icon: <Users size={20} />,
    summary: "We build alongside your team on a real project — and leave the skills behind.",
    headline: "Learn while you ship.",
    description:
      "We embed with your team during a real project, as implementers and coaches. Your people deliver the work and build the skills at the same time — no black boxes.",
    modules: [
      "Joint project scoping",
      "Side-by-side implementation",
      "Code & design reviews",
      "Weekly debriefs",
      "Documentation & knowledge base",
    ],
    levels: ["Intermediate", "Advanced"],
    certs: [],
  },
];

// Bento layout on desktop: wide tiles for the flagship and the hands-on format
const SPAN: Record<string, string> = {
  fabric: "md:col-span-2",
  "on-the-job": "md:col-span-2",
};

const labelClass = "text-xs font-semibold uppercase tracking-widest";

export default function TrainingTracks() {
  const [active, setActive] = useState(TRACKS[0].id);
  const explorerRef = useRef<HTMLDivElement>(null);
  const current = TRACKS.find((t) => t.id === active)!;
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  const explore = (id: string) => {
    setActive(id);
    explorerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Tracks grid ── */}
      <section className="py-14 md:py-20 border-b border-[var(--border-subtle)]">
        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          <p className={`${labelClass} text-[var(--color-brand)]`}>Training tracks</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            The Microsoft data &amp; AI stack, taught by people who build on it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRACKS.map((t) => {
            const featured = t.id === "fabric";
            return (
              <button
                key={t.id}
                onClick={() => explore(t.id)}
                className={`group relative overflow-hidden text-left rounded-[var(--radius-lg)] border p-6 md:p-8 flex flex-col gap-4 min-h-[240px] transition-shadow hover:shadow-[var(--shadow-card-hover)] ${SPAN[t.id] ?? ""} ${
                  featured
                    ? "bg-[var(--color-dark)] text-[var(--bg-primary)] border-transparent"
                    : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                }`}
              >
                {featured && (
                  <TrainingHeroArt id="training-art-tile" className="absolute inset-y-0 right-0 w-2/3 h-full opacity-60 pointer-events-none" />
                )}
                <div className="relative flex items-center gap-3">
                  <span className="text-[var(--color-brand)]">{t.icon}</span>
                  <span className={`${labelClass} ${featured ? "opacity-70" : "text-[var(--text-primary)]/60"}`}>{t.category}</span>
                </div>
                <div className="relative flex flex-col gap-2 max-w-md">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {t.label}
                  </h3>
                  <p className={`text-sm leading-relaxed ${featured ? "opacity-80" : "text-[var(--text-primary)]/70"}`}>{t.summary}</p>
                </div>
                <div className="relative mt-auto flex justify-end">
                  <ArrowRight size={18} className="shrink-0 text-[var(--color-brand)] transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Program explorer ── */}
      <section ref={explorerRef} className="py-14 md:py-20 border-b border-[var(--border-subtle)] scroll-mt-20">
        <div className="flex flex-col gap-3 mb-8">
          <p className={`${labelClass} text-[var(--color-brand)]`}>Explore the programs</p>
        </div>

        <div className="flex gap-6 overflow-x-auto overflow-y-hidden border-b border-[var(--border-subtle)] -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist">
          {TRACKS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`relative shrink-0 pb-3 text-sm font-medium transition-colors ${
                active === t.id ? "text-[var(--color-brand)]" : "text-[var(--text-primary)] hover:text-[var(--color-brand)]"
              }`}
            >
              {t.label}
              <span className={`absolute left-0 -bottom-px h-0.5 bg-[var(--color-brand)] transition-all ${active === t.id ? "w-full" : "w-0"}`} />
            </button>
          ))}
        </div>

        <div role="tabpanel" className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 pt-10">
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {current.headline}
            </h3>
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">{current.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {current.modules.map((m) => (
                <li key={m} className="flex items-start gap-3 text-base text-[var(--text-primary)]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 self-start">
            <div className="flex flex-col gap-2">
              <p className={`${labelClass} text-[var(--text-muted)]`}>Levels</p>
              <div className="flex gap-2 flex-wrap">
                {current.levels.map((l) => (
                  <span key={l} className="px-3 py-1 text-sm rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)]">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            {current.certs.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className={`${labelClass} text-[var(--text-muted)]`}>Certification path</p>
                <ul className="flex flex-col gap-1.5">
                  {current.certs.map((c) => (
                    <li key={c} className="text-sm text-[var(--text-primary)]">{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={openContact}
              className="px-5 py-2.5 bg-[var(--color-dark)] text-[var(--bg-primary)] text-sm font-semibold rounded-lg hover:opacity-80 transition-opacity"
            >
              Request a quote
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
