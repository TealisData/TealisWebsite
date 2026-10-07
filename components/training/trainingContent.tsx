import { Bot, Layers, Workflow } from "lucide-react";
import type { Group, Module, Program } from "@/components/showcase/ProgramShowcase";

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
];


export const TRAINING_GROUPS: Group[] = [
  {
    id: "data",
    title: "Data stack",
    icon: <Layers size={20} />,
    summary: "Data engineering end to end: storage, ingestion, processing, warehousing and modeling across the Microsoft data stack.",
    items: [
      { name: "Microsoft Fabric", program: "fabric" },
      { name: "Power BI", program: "power-bi" },
      { name: "Azure Data Factory", program: "fabric" },
      { name: "Azure Databricks", program: "databricks" },
      { name: "SQL Server & Azure SQL" },
      { name: "dbt" },
      { name: "Microsoft Purview", program: "fabric" },
    ],
  },
  {
    id: "apps",
    title: "Business applications & automation",
    icon: <Workflow size={20} />,
    summary: "Transactional apps, forms, workflows and the digitalization of business processes.",
    items: [
      { name: "Power Apps", program: "power-platform" },
      { name: "Power Automate", program: "power-platform" },
      { name: "Power Pages", program: "power-platform" },
      { name: "Microsoft Dataverse", program: "power-platform" },
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

export const TRAINING_PROGRAMS: Program[] = TRACKS.map(({ levels, certs, ...t }) => ({
  ...t,
  facts: [
    { label: "Levels", items: levels, variant: "chips" },
    { label: "Certification path", items: certs, variant: "list" },
  ],
}));
