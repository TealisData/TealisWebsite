"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const services = [
  {
    id: "data-strategy",
    label: "Data Strategy & Governance",
    headline: "Turn data into a strategic asset.",
    subtitle: "Structure where there is chaos — visibility where there is noise.",
    description:
      "We help organizations design and implement enterprise-grade data ecosystems. From defining governance frameworks to building data products that scale, we bring order to complexity and turn raw data into a competitive advantage.",
    capabilities: [
      "Data maturity assessment",
      "Governance frameworks & policies",
      "Microsoft Fabric architecture",
      "Data mesh & domain modelling",
      "Master data management",
    ],
    tools: ["Microsoft Fabric", "Azure Data Factory", "Purview", "SQL Server"],
  },
  {
    id: "analytics-bi",
    label: "Analytics & Business Intelligence",
    headline: "Decisions backed by data, not instinct.",
    subtitle: "Power BI done right — from semantic model to executive dashboard.",
    description:
      "We design and deploy analytics solutions that make information accessible to everyone in your organization — from the C-suite to the operational teams. Semantic models, row-level security, performance optimization — the full stack.",
    capabilities: [
      "Power BI report & dashboard design",
      "Semantic model development",
      "Row-level security & governance",
      "KPI frameworks & metric catalogues",
      "Self-service analytics enablement",
    ],
    tools: ["Power BI", "DAX", "Power Query", "Azure Analysis Services"],
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    headline: "Reliable pipelines. Clean data. Always.",
    subtitle: "The plumbing that makes analytics possible.",
    description:
      "We build ingestion, transformation, storage and orchestration pipelines that your business can depend on. Whether you need a modern lakehouse on Microsoft Fabric or a legacy migration to the cloud, we cover the full engineering lifecycle.",
    capabilities: [
      "ETL/ELT pipeline design & development",
      "Lakehouse & warehouse architecture",
      "Real-time streaming pipelines",
      "Data quality & validation frameworks",
      "Legacy system migration",
    ],
    tools: ["Microsoft Fabric", "Azure Data Factory", "Spark", "dbt", "SQL"],
  },
  {
    id: "automation",
    label: "Business Automation",
    headline: "Automate the work that slows you down.",
    subtitle: "Replace spreadsheets and email chains with real tools.",
    description:
      "We digitalize manual processes using Microsoft Power Platform — building custom apps, automated workflows and business portals. Delivered fast, built to last, and owned by your team from day one.",
    capabilities: [
      "Power Apps (canvas & model-driven)",
      "Power Automate workflow design",
      "SharePoint & Teams integrations",
      "Custom business portals",
      "Process documentation & optimization",
    ],
    tools: ["Power Apps", "Power Automate", "SharePoint", "Dataverse", "Teams"],
  },
  {
    id: "ai-copilot",
    label: "AI & Microsoft Copilot",
    headline: "AI that works inside your existing tools.",
    subtitle: "Practical, governed, grounded in your actual business context.",
    description:
      "We implement Microsoft Copilot and AI-powered solutions within your Microsoft 365 environment — from Copilot Studio agents to AI-augmented data pipelines. No hype, no black boxes — just AI that delivers measurable value.",
    capabilities: [
      "Copilot Studio agent development",
      "Microsoft 365 Copilot deployment",
      "AI-augmented analytics",
      "Custom GPT integration via Azure OpenAI",
      "Responsible AI governance",
    ],
    tools: ["Copilot Studio", "Azure OpenAI", "Microsoft 365", "Power Platform"],
  },
];

export default function ConsultingPage() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

        {/* ── Left column ── */}
        <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] overflow-y-auto">
          <div className="py-12 lg:pr-12 flex flex-col gap-8">

            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Consulting</p>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                Consulting Services
              </h1>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                End-to-end Microsoft data consulting — from strategy to engineering, analytics and automation. One partner for the full journey.
              </p>
            </div>

            <nav>
              <ul className="border-t border-[var(--border-subtle)]">
                {services.map((s) => (
                  <li key={s.id} className="border-b border-[var(--border-subtle)]">
                    <button
                      onClick={() => setActive(s.id)}
                      className={`w-full text-left py-4 flex items-center justify-between gap-3 transition-colors duration-150 group ${
                        active === s.id ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span className={`text-base leading-snug ${active === s.id ? "font-semibold" : "font-normal"}`}>
                        {s.label}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`shrink-0 ${active === s.id ? "text-[var(--text-primary)]" : "text-[var(--border-subtle)] group-hover:text-[var(--text-muted)]"}`}
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
                    Get in touch
                  </button>
                </div>

                <hr className="border-[var(--border-subtle)]" />

                <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {current.description}
                </p>

                <ul className="flex flex-col gap-3">
                  {current.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3 text-base text-[var(--text-primary)]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {current.tools.map((t) => (
                      <span key={t} className="px-3 py-1 text-sm rounded-md border border-[var(--border-subtle)] text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
