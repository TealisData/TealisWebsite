"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "data-strategy",
    label: "Data Strategy & Governance",
    headline: "Turn data into a strategic asset.",
    description:
      "We help organizations design and implement enterprise-grade data ecosystems. From defining governance frameworks to building data products that scale, we bring structure where there is chaos — and visibility where there is noise.",
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
    description:
      "We design and deploy analytics solutions that make information accessible to everyone in your organization — from the C-suite to the operational teams. Power BI done right: semantic models, row-level security, performance optimization.",
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
    description:
      "We build the plumbing that makes analytics possible — ingestion, transformation, storage and orchestration. Whether you need a modern lakehouse on Microsoft Fabric or a legacy migration to the cloud, we cover the full engineering lifecycle.",
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
    description:
      "We digitalize manual processes using Microsoft Power Platform — building custom apps, automated workflows and business portals that replace spreadsheets and email chains. Delivered fast, built to last.",
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
    description:
      "We implement Microsoft Copilot and AI-powered solutions within your Microsoft 365 environment — from Copilot Studio agents to AI-augmented data pipelines. Practical, governed, and grounded in your actual business context.",
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
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">

      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-3">Consulting</p>
        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Services.
        </h1>
        <p className="mt-4 text-[var(--text-muted)] max-w-xl leading-relaxed">
          End-to-end Microsoft data consulting — from strategy to engineering, analytics and automation. One partner for the full journey.
        </p>
      </div>

      {/* Split-screen */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-0 border border-[var(--border-subtle)] rounded-2xl overflow-hidden">

          {/* Left — service list */}
          <nav className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <ul>
              {services.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={`w-full text-left px-6 py-5 flex items-center justify-between gap-3 text-sm font-medium transition-colors duration-150 ${
                      active === s.id
                        ? "bg-[var(--bg-primary)] text-[var(--color-brand)] border-l-2 border-[var(--color-brand)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/50"
                    } ${i < services.length - 1 ? "border-b border-[var(--border-subtle)]" : ""}`}
                  >
                    {s.label}
                    {active === s.id && <ArrowRight size={14} className="shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — detail */}
          <div className="flex-1 p-8 md:p-12 min-h-[480px]">
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
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {current.headline}
                  </h2>
                  <p className="text-[var(--text-muted)] leading-relaxed max-w-lg">{current.description}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">What we deliver</p>
                  <ul className="flex flex-col gap-2">
                    {current.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {current.tools.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--bg-surface)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={openContact}
                  className="mt-auto w-fit inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors"
                >
                  Get in touch <ArrowRight size={15} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
