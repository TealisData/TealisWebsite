import { Bot, Layers, Workflow } from "lucide-react";
import type { Group, Program } from "@/components/showcase/ProgramShowcase";

const tech = (items: string[]) => ({ label: "Technologies", items, variant: "chips" as const });

export const CONSULTING_SERVICES: Program[] = [
  {
    id: "data-strategy",
    label: "Data Strategy & Governance",
    headline: "Turn data into a strategic asset.",
    description:
      "We assess where you are, design where you need to be, and put the governance in place to get there — so your data ecosystem scales with structure instead of chaos.",
    modules: [
      { title: "Data Maturity Assessment", text: "Current state, gaps, and a prioritized roadmap" },
      { title: "Target Architecture", text: "Platform choice and design on Microsoft Fabric and Azure" },
      { title: "Governance Framework", text: "Ownership, policies, and data quality standards" },
      { title: "Catalog & Classification", text: "Microsoft Purview for discovery, lineage, and sensitivity labels" },
      { title: "Data Domains & Products", text: "Domain modeling and reusable, well-owned data products" },
      { title: "Master Data Management", text: "Consistent customers, products, and reference data" },
    ],
    facts: [tech(["Microsoft Fabric", "Microsoft Purview", "Azure Data Factory", "SQL Server"])],
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    headline: "Reliable pipelines. Clean data. Always.",
    description:
      "We build the ingestion, transformation, storage and orchestration your business depends on — from a modern lakehouse on Microsoft Fabric or Azure Databricks to migrating legacy platforms to the cloud.",
    modules: [
      { title: "Lakehouse & Warehouse Architecture", text: "Medallion design on Microsoft Fabric and Azure Databricks" },
      { title: "Ingestion & Orchestration", text: "Pipelines, Dataflows Gen2, Azure Data Factory, and Lakeflow Jobs" },
      { title: "Transformation", text: "Spark, SQL, and dbt with tested, versioned logic" },
      { title: "Real-Time Data", text: "Streaming ingestion and real-time analytics" },
      { title: "Data Quality", text: "Validation rules, expectations, and monitoring" },
      { title: "Cloud Migration", text: "From on-premises SQL Server or Azure Synapse to Microsoft Fabric" },
      { title: "DevOps & CI/CD", text: "Git integration, deployment pipelines, and environments" },
    ],
    facts: [tech(["Microsoft Fabric", "Azure Databricks", "Azure Data Factory", "dbt", "SQL"])],
  },
  {
    id: "analytics-bi",
    label: "Analytics & BI",
    headline: "Decisions backed by data, not instinct.",
    description:
      "Power BI done right — from semantic model to executive dashboard. We make information accessible to everyone, from the C-suite to operational teams, with performance and security built in.",
    modules: [
      { title: "Semantic Models", text: "Star schemas, DAX, and Direct Lake built for scale" },
      { title: "Reports & Dashboards", text: "From executive views to operational reports" },
      { title: "KPI Frameworks", text: "Shared metric definitions and catalogues" },
      { title: "Performance Optimization", text: "Faster models and reports at enterprise scale" },
      { title: "Security & Governance", text: "Row-level security, workspaces, and endorsement" },
      { title: "Self-Service Enablement", text: "Certified semantic models and guidance for business users" },
    ],
    facts: [tech(["Power BI", "DAX", "Power Query", "Microsoft Fabric"])],
  },
  {
    id: "business-apps",
    label: "Business Apps & Automation",
    headline: "Automate the work that slows you down.",
    description:
      "We replace spreadsheets and email chains with apps, workflows and portals on Microsoft Power Platform — delivered fast, built to last, and owned by your team from day one.",
    modules: [
      { title: "Process Discovery", text: "Map manual processes and prioritize what to digitalize" },
      { title: "Business Apps", text: "Canvas and model-driven Power Apps on Dataverse" },
      { title: "Workflow Automation", text: "Approvals and integrations with Power Automate" },
      { title: "Portals", text: "External sites for customers and partners with Power Pages" },
      { title: "Microsoft 365 Integration", text: "SharePoint, Teams, and Outlook" },
      { title: "AI in Processes", text: "AI Builder and agents embedded in apps and flows" },
      { title: "Governance & ALM", text: "Environments, data policies, and solution deployment" },
    ],
    facts: [tech(["Power Apps", "Power Automate", "Power Pages", "Dataverse", "SharePoint", "Teams"])],
  },
  {
    id: "ai",
    label: "AI & Agents",
    headline: "AI that works inside your existing tools.",
    description:
      "Practical, governed AI grounded in your business context — from Microsoft 365 Copilot adoption to custom agents and machine learning in production. No hype, no black boxes.",
    modules: [
      { title: "AI Strategy & Use Cases", text: "Where AI creates value, with a clear business case" },
      { title: "Microsoft 365 Copilot Adoption", text: "Rollout, enablement, and measurable usage" },
      { title: "Copilot Studio Agents", text: "Agents grounded in your knowledge and connected to your systems" },
      { title: "Custom AI Apps & Agents", text: "Solutions built with Microsoft Foundry and Microsoft Agent Framework" },
      { title: "AI on Your Data", text: "Fabric data agents and AI-ready semantic models" },
      { title: "Machine Learning & MLOps", text: "Azure Machine Learning models in production" },
      { title: "Responsible AI & Governance", text: "Evaluation, monitoring, and guardrails" },
    ],
    facts: [tech(["Microsoft 365 Copilot", "Copilot Studio", "Microsoft Foundry", "Azure Machine Learning", "Microsoft Fabric"])],
  },
];

export const CONSULTING_GROUPS: Group[] = [
  {
    id: "data",
    title: "Data stack",
    icon: <Layers size={20} />,
    summary: "Data engineering end to end: storage, ingestion, processing, warehousing and modeling across the Microsoft data stack.",
    items: [
      { name: "Microsoft Fabric", program: "data-engineering" },
      { name: "Power BI", program: "analytics-bi" },
      { name: "Azure Data Factory", program: "data-engineering" },
      { name: "Azure Databricks", program: "data-engineering" },
      { name: "SQL Server & Azure SQL", program: "data-engineering" },
      { name: "dbt", program: "data-engineering" },
      { name: "Microsoft Purview", program: "data-strategy" },
    ],
  },
  {
    id: "apps",
    title: "Business applications & automation",
    icon: <Workflow size={20} />,
    summary: "Transactional apps, forms, workflows and the digitalization of business processes.",
    items: [
      { name: "Power Apps", program: "business-apps" },
      { name: "Power Automate", program: "business-apps" },
      { name: "Power Pages", program: "business-apps" },
      { name: "Microsoft Dataverse", program: "business-apps" },
    ],
  },
  {
    id: "ai",
    title: "AI & agents",
    icon: <Bot size={20} />,
    summary: "The intelligent layer: LLMs, Copilot, custom agents and machine learning models.",
    items: [
      { name: "Microsoft 365 Copilot", program: "ai" },
      { name: "Copilot Cowork", program: "ai" },
      { name: "Copilot Studio", program: "ai" },
      { name: "Microsoft Foundry", program: "ai" },
      { name: "Azure Machine Learning", program: "ai" },
    ],
  },
];
