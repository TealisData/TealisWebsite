import { Bot, Layers, ShieldCheck } from "lucide-react";
import type { Group, Program } from "@/components/showcase/ProgramShowcase";

const tech = (items: string[]) => ({ label: "Technologies", items, variant: "chips" as const });

// Three service areas: each group card summarizes one area, its tab holds the detail
export const CONSULTING_SERVICES: Program[] = [
  {
    id: "data-architecture",
    label: "Modern Data Architecture",
    headline: "A data platform built to scale.",
    description:
      "We design and build modern lakehouse platforms on Microsoft Fabric and Azure Databricks — reliable pipelines, clean data and semantic models, from ingestion to the dashboards your business runs on.",
    modules: [
      { title: "Lakehouse & Warehouse Architecture", text: "Medallion design on Microsoft Fabric and Azure Databricks" },
      { title: "Ingestion & Orchestration", text: "Pipelines, Dataflows Gen2, Azure Data Factory, and Lakeflow Jobs" },
      { title: "Transformation", text: "Spark, SQL, and dbt with tested, versioned logic" },
      { title: "Real-Time Data", text: "Streaming ingestion and real-time analytics" },
      { title: "Semantic Models & BI", text: "Star schemas, DAX, Direct Lake, and Power BI reports" },
      { title: "Performance at Scale", text: "Optimized pipelines, models, and capacity" },
      { title: "Cloud Migration", text: "From on-premises SQL Server or Azure Synapse to Microsoft Fabric" },
      { title: "DevOps & CI/CD", text: "Git integration, deployment pipelines, and environments" },
    ],
    facts: [tech(["Microsoft Fabric", "Azure Databricks", "Azure Data Factory", "Power BI", "dbt", "SQL"])],
  },
  {
    id: "data-strategy",
    label: "Data Strategy & Governance",
    headline: "Turn data into a strategic asset.",
    description:
      "We assess where you are, design where you need to be, and put the governance in place to get there — so your data stays trusted, secure and well owned as it grows.",
    modules: [
      { title: "Data Maturity Assessment", text: "Current state, gaps, and opportunities" },
      { title: "Target Architecture & Roadmap", text: "Platform choice and a prioritized plan on Microsoft Fabric and Azure" },
      { title: "Governance Framework", text: "Ownership, roles, policies, and standards" },
      { title: "Catalog & Lineage", text: "Discovery, classification, and lineage with Microsoft Purview" },
      { title: "Security & Compliance", text: "Access control, row-level security, and sensitivity labels" },
      { title: "Data Quality", text: "Rules, monitoring, and accountability for trusted data" },
      { title: "Data Domains & Products", text: "Domain modeling and reusable, well-owned data products" },
      { title: "Master Data & KPI Definitions", text: "Consistent reference data and shared metric definitions" },
    ],
    facts: [tech(["Microsoft Purview", "Microsoft Fabric", "Power BI"])],
  },
  {
    id: "ai",
    label: "AI & Agents",
    headline: "AI that works inside your existing tools.",
    description:
      "Practical, governed AI grounded in your business context — from Microsoft 365 Copilot adoption to custom agents, intelligent automation and machine learning in production. No hype, no black boxes.",
    modules: [
      { title: "AI Strategy & Use Cases", text: "Where AI creates value, with a clear business case" },
      { title: "Microsoft 365 Copilot Adoption", text: "Rollout, enablement, and measurable usage" },
      { title: "Copilot Studio Agents", text: "Agents grounded in your knowledge and connected to your systems" },
      { title: "Custom AI Apps & Agents", text: "Solutions built with Microsoft Foundry and Microsoft Agent Framework" },
      { title: "AI on Your Data", text: "Fabric data agents and AI-ready semantic models" },
      { title: "Intelligent Automation", text: "AI Builder and agents in Power Apps and Power Automate processes" },
      { title: "Machine Learning & MLOps", text: "Azure Machine Learning models in production" },
      { title: "Responsible AI & Governance", text: "Evaluation, monitoring, and guardrails" },
    ],
    facts: [tech(["Microsoft 365 Copilot", "Copilot Studio", "Microsoft Foundry", "Azure Machine Learning", "Power Platform"])],
  },
];

export const CONSULTING_GROUPS: Group[] = [
  {
    id: "data-architecture",
    title: "Modern data architecture",
    icon: <Layers size={20} />,
    summary: "Lakehouse platforms, reliable pipelines and semantic models — from ingestion to the dashboards your business runs on.",
    items: [
      { name: "Microsoft Fabric", program: "data-architecture" },
      { name: "Azure Databricks", program: "data-architecture" },
      { name: "Azure Data Factory", program: "data-architecture" },
      { name: "SQL Server & Azure SQL", program: "data-architecture" },
      { name: "dbt", program: "data-architecture" },
      { name: "Power BI", program: "data-architecture" },
    ],
  },
  {
    id: "data-strategy",
    title: "Data strategy & governance",
    icon: <ShieldCheck size={20} />,
    summary: "Assessment, roadmap and governance that make data a trusted, secure and well-owned asset.",
    items: [
      { name: "Microsoft Purview", program: "data-strategy" },
      { name: "Microsoft Fabric", program: "data-strategy" },
      { name: "Power BI", program: "data-strategy" },
    ],
  },
  {
    id: "ai",
    title: "AI & agents",
    icon: <Bot size={20} />,
    summary: "From Copilot adoption to custom agents, intelligent automation and machine learning in production.",
    items: [
      { name: "Microsoft 365 Copilot", program: "ai" },
      { name: "Copilot Cowork", program: "ai" },
      { name: "Copilot Studio", program: "ai" },
      { name: "Microsoft Foundry", program: "ai" },
      { name: "Azure Machine Learning", program: "ai" },
      { name: "Power Platform", program: "ai" },
    ],
  },
];
