"use client";

import { useRef, useState } from "react";
import { Bot, Layers, Workflow } from "lucide-react";
import TrainingHeroArt from "@/components/training/TrainingHeroArt";

// A module is a short line, or a titled entry with a one-line explanation
type Module = string | { title: string; text: string };

type Track = {
  id: string;
  label: string;
  headline: string;
  description: string;
  modules: Module[];
  levels: string[];
  certs: string[];
};

const TRACKS: Track[] = [
  {
    id: "fabric",
    label: "Microsoft Fabric",
    headline: "One platform, end to end.",
    description:
      "The full Microsoft Fabric platform, hands-on: storage, ingestion, processing, real-time analytics, AI, and business intelligence — built on enterprise governance, security, and ALM practices.",
    // Macro topics of the official Microsoft Fabric labs (microsoftlearning.github.io/mslearn-fabric)
    modules: [
      { title: "OneLake & Catalog", text: "Unified lakehouse storage, shortcuts, and data discovery" },
      { title: "Data Ingestion & Orchestration", text: "Low-code Dataflows Gen2 and Data Pipelines" },
      { title: "Medallion & Lakehouse Architecture", text: "Spark, Delta tables, and scalable data engineering" },
      { title: "Data Warehouse & Operational DBs", text: "Enterprise T-SQL Data Warehouse, SQL Database, and API for GraphQL" },
      { title: "Real-Time Intelligence", text: "Eventstream, Eventhouse, KQL, and automated alerts with Activator" },
      { title: "Data Science & ML", text: "Machine learning lifecycles, experimentation, and model tracking with MLflow" },
      { title: "Semantic Modeling & BI", text: "High-performance DAX, Direct Lake mode, and reporting" },
      { title: "Fabric IQ & Data Agents", text: "Domain ontologies, knowledge graphs, and conversational agents over your data" },
      { title: "Copilot in Fabric", text: "Generative AI assistance for analytics, code generation, and exploration" },
      { title: "Security & Governance", text: "Fine-grained access control, RLS/OLS, and Microsoft Purview integration" },
      { title: "Monitoring & Operations", text: "Capacity management, performance tracking, and health metrics" },
      { title: "Application Lifecycle Management", text: "Deployment Pipelines, Git integration, and CI/CD best practices" },
    ],
    levels: ["Intermediate", "Advanced"],
    certs: ["DP-600 · Fabric Analytics Engineer Associate", "DP-700 · Fabric Data Engineer Associate"],
  },
  {
    id: "power-bi",
    label: "Power BI",
    headline: "From data to decisions.",
    description:
      "The complete Power BI journey, hands-on: connecting and shaping data, scalable semantic models, DAX, and reports people use — run with gateways, deployment, and enterprise governance.",
    // PL-300 lab and demo topics (microsoftlearning.github.io/PL-300-Microsoft-Power-BI-Data-Analyst),
    // plus scalable modeling, gateways and governance
    modules: [
      { title: "Get Data & Connectivity", text: "Databases, files, and cloud sources; Import, DirectQuery, and storage modes" },
      { title: "Power Query & M", text: "Cleaning, shaping, and loading data with reusable transformations" },
      { title: "Data Modeling", text: "Star schemas, relationships, and semantic model configuration" },
      { title: "Scalable Model Design", text: "Composite models, aggregations, incremental refresh, and large semantic models" },
      { title: "DAX Fundamentals", text: "Measures, calculated columns, and core calculation patterns" },
      { title: "Advanced DAX", text: "Filter context, time intelligence, and visual calculations" },
      { title: "Report Design & UX", text: "Effective visuals, navigation, bookmarks, and accessibility" },
      { title: "Analytics & Insights", text: "Trends, forecasting, anomaly detection, and AI visuals" },
      { title: "Performance Optimization", text: "Performance Analyzer, DAX tuning, and model size reduction" },
      { title: "Workspaces, Apps & Deployment", text: "Workspaces, apps, dashboards, and deployment pipelines" },
      { title: "Gateways & Refresh", text: "On-premises data gateway, scheduled refresh, and data source management" },
      { title: "Security & Governance", text: "Row-level security, sensitivity labels, endorsement, and Microsoft Purview" },
    ],
    levels: ["Beginner", "Intermediate", "Advanced"],
    certs: ["PL-300 · Power BI Data Analyst Associate"],
  },
  {
    id: "databricks",
    label: "Azure Databricks",
    headline: "Lakehouse engineering at scale.",
    description:
      "Production-grade data engineering on Azure Databricks, hands-on: Unity Catalog security and governance, Delta Lake modeling, ingestion and declarative pipelines, orchestration with Lakeflow Jobs — plus CI/CD and performance tuning.",
    // DP-750 lab topics (microsoftlearning.github.io/DP-750T00-Implement-Data-Engineering-Solutions-using-Azure-Databricks)
    modules: [
      { title: "Workspace & Compute", text: "Notebooks in Python and SQL, AI-assisted coding with Genie Code, clusters, and libraries" },
      { title: "Unity Catalog Organization", text: "Catalogs, medallion schemas, managed tables, views, volumes, and SQL functions" },
      { title: "Security & Access Control", text: "Fine-grained permissions, row filters, column masks, and Key Vault-backed secrets" },
      { title: "Governance & Lineage", text: "PII tagging, retention and VACUUM, lineage, and audit logs from system tables" },
      { title: "Data Modeling with Delta Lake", text: "SCD Type 2, liquid clustering, Change Data Feed, and time travel" },
      { title: "Data Ingestion", text: "COPY INTO, CTAS, and Auto Loader for exactly-once incremental loads" },
      { title: "Cleansing & Transformation", text: "Data types, deduplication, missing values, joins, and PIVOT/UNPIVOT" },
      { title: "Data Quality & Declarative Pipelines", text: "Lakeflow Spark Declarative Pipelines, expectations, and schema drift handling" },
      { title: "Medallion Pipelines", text: "Bronze, silver, and gold layers with error handling and parameterized notebooks" },
      { title: "Orchestration with Lakeflow Jobs", text: "Task dependencies, scheduled and event triggers, retries, and notifications" },
      { title: "Development Lifecycle", text: "Testing with pytest and deployment with Declarative Automation Bundles" },
      { title: "Monitoring & Optimization", text: "Spark UI diagnostics, data skew, Adaptive Query Execution, and shuffle reduction" },
    ],
    levels: ["Intermediate", "Advanced"],
    certs: ["DP-750 · Azure Databricks Data Engineer Associate"],
  },
  {
    id: "power-platform",
    label: "Business Apps & Automation",
    headline: "Apps and automation, built by your team.",
    description:
      "Digitalize business processes with low-code and AI, hands-on: Dataverse data, canvas and model-driven apps, portals, automated workflows, and agents — governed and built to last.",
    // Merged from AB-410T00 (Build intelligent applications) and PL-900T00 (Power Platform fundamentals)
    modules: [
      { title: "Business Value & Solution Design", text: "Power Platform capabilities, AI-first solution design, and Plans" },
      { title: "Dataverse Data Modeling", text: "Tables, columns, and relationships for your business data" },
      { title: "Dataverse Security", text: "Security roles and access to business data" },
      { title: "Canvas Apps", text: "Build, customize, publish, and share apps for any device" },
      { title: "Model-Driven Apps", text: "Data-first apps on Dataverse with charts and dashboards" },
      { title: "Power Pages", text: "External websites and portals for customers and partners" },
      { title: "Power Automate", text: "Cloud flows, connectors, and Dataverse triggers and actions" },
      { title: "Approvals & Process Automation", text: "Approval flows and end-to-end digitalized processes" },
      { title: "AI Builder & Prompts", text: "Effective generative AI prompts grounded in your Dataverse data" },
      { title: "Copilot Studio Agents", text: "Agent capabilities that extend your apps and flows" },
      { title: "Copilot in Power Platform", text: "Building apps and flows with natural language" },
      { title: "Governance & Administration", text: "Environments, data policies, and platform administration" },
    ],
    levels: ["Beginner", "Intermediate"],
    certs: [
      "PL-900 · Power Platform Fundamentals",
      "AB-410 · Intelligent Applications Builder Associate",
      "PL-400 · Power Platform Developer Associate",
    ],
  },
  {
    id: "ai",
    label: "AI & Agents",
    headline: "Put AI to work, responsibly.",
    description:
      "From business adoption to production engineering, hands-on: Copilot at work, AI strategy, Copilot Studio and Azure agents, Microsoft Foundry apps, and MLOps and GenAIOps — with responsible AI throughout.",
    // Learning paths of AI-901T00, AB-730T00, AB-731T00, AB-620T00, AI-103T00 and AI-300T00
    modules: [
      { title: "AI Fundamentals", text: "Generative AI, agents, language, speech, vision, and retrieval-augmented generation" },
      { title: "AI Strategy & Business Value", text: "Use cases, business value, responsible AI, and scaling AI across the organization" },
      { title: "Copilot at Work", text: "Effective prompts, content, data analysis, meetings, and Copilot Cowork" },
      { title: "Copilot Studio Agents", text: "Topics, tools, generative answers, and Adaptive Cards" },
      { title: "Multi-Agent Solutions", text: "Child and connected agents, and cross-platform orchestration with Agent2Agent" },
      { title: "Enterprise Integration & Grounding", text: "Connectors, REST APIs, MCP, and enterprise knowledge with Azure AI Search" },
      { title: "Generative AI Apps with Microsoft Foundry", text: "Model selection, deployment, chat apps with tools, and evaluation" },
      { title: "AI Agents on Azure", text: "Microsoft Agent Framework, custom and MCP tools, Foundry IQ, and Microsoft 365 integration" },
      { title: "Language, Speech & Vision", text: "Text analysis, speech and voice agents, translation, and image and video generation" },
      { title: "Information Extraction & Knowledge Mining", text: "Content Understanding, Document Intelligence, and Azure AI Search" },
      { title: "MLOps with Azure Machine Learning", text: "Experiments, MLflow tracking, pipelines, and deployment with GitHub Actions" },
      { title: "GenAIOps & Responsible AI", text: "Prompt management, automated evaluations, monitoring, and tracing" },
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
    id: "custom",
    label: "Custom Programs",
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

type Group = {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  // track: the program tab that covers this technology, if any
  items: { name: string; track?: string }[];
};

const GROUPS: Group[] = [
  {
    id: "data",
    title: "Data stack",
    icon: <Layers size={20} />,
    summary: "Data engineering end to end: storage, ingestion, processing, warehousing and modeling across the Microsoft data stack.",
    items: [
      { name: "Microsoft Fabric", track: "fabric" },
      { name: "Power BI", track: "power-bi" },
      { name: "Azure Data Factory", track: "fabric" },
      { name: "Azure Databricks", track: "databricks" },
      { name: "SQL Server & Azure SQL" },
      { name: "dbt" },
      { name: "Microsoft Purview", track: "fabric" },
    ],
  },
  {
    id: "apps",
    title: "Business applications & automation",
    icon: <Workflow size={20} />,
    summary: "Transactional apps, forms, workflows and the digitalization of business processes.",
    items: [
      { name: "Power Apps", track: "power-platform" },
      { name: "Power Automate", track: "power-platform" },
      { name: "Power Pages", track: "power-platform" },
      { name: "Microsoft Dataverse", track: "power-platform" },
    ],
  },
  {
    id: "ai",
    title: "AI & agents",
    icon: <Bot size={20} />,
    summary: "The intelligent layer: LLMs, Copilot, custom agents and machine learning models.",
    items: [
      { name: "Microsoft 365 Copilot", track: "ai" },
      { name: "Copilot Cowork", track: "ai" },
      { name: "Copilot Studio", track: "ai" },
      { name: "Microsoft Foundry", track: "ai" },
      { name: "Azure Machine Learning", track: "ai" },
    ],
  },
];

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
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            The Microsoft data &amp; AI stack, taught by people who build on it.
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Official Microsoft courses and custom programs on Fabric, Power BI, Databricks, AI and Power Platform — taught by
            Microsoft Certified Trainers who build these solutions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GROUPS.map((g, i) => {
            const featured = i === 0;
            const chip = featured
              ? "border-current/20 hover:border-[var(--color-brand)]"
              : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--color-brand)]";
            return (
              <div
                key={g.id}
                className={`relative overflow-hidden rounded-[var(--radius-lg)] border p-6 md:p-8 flex flex-col gap-5 ${
                  featured
                    ? "bg-[var(--color-dark)] text-[var(--bg-primary)] border-transparent"
                    : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]"
                }`}
              >
                {featured && (
                  <TrainingHeroArt id="training-art-tile" className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
                )}
                <div className="relative flex flex-col gap-3">
                  <span className="text-[var(--color-brand)]">{g.icon}</span>
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {g.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${featured ? "opacity-80" : "text-[var(--text-primary)]/70"}`}>{g.summary}</p>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      {it.track ? (
                        <button
                          onClick={() => explore(it.track!)}
                          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${chip}`}
                        >
                          {it.name}
                        </button>
                      ) : (
                        <span className={`inline-block px-3 py-1.5 text-sm rounded-md border ${chip.split(" hover:")[0]}`}>{it.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
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
            {/* CSS columns fill top-to-bottom, so the first half of the list forms column 1 */}
            <ul className="sm:columns-2 gap-x-8">
              {current.modules.map((m) => {
                const key = typeof m === "string" ? m : m.title;
                return (
                  <li key={key} className="flex items-start gap-3 mb-3 break-inside-avoid text-base text-[var(--text-primary)]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                    {typeof m === "string" ? (
                      m
                    ) : (
                      <span className="flex flex-col">
                        <span className="font-semibold">{m.title}</span>
                        <span className="text-sm text-[var(--text-muted)] leading-relaxed">{m.text}</span>
                      </span>
                    )}
                  </li>
                );
              })}
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
