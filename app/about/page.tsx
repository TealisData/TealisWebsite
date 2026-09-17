import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Tealis",
  description: "We are a team of certified Microsoft specialists based in Tallinn, Estonia.",
};

const SKILLS = [
  "Microsoft Fabric",
  "Power BI",
  "Azure Data Factory",
  "Azure Databricks",
  "Microsoft Copilot",
  "Purview",
  "SQL Server",
  "Power Platform",
  "Azure ML",
  "dbt",
  "Python",
  "DAX",
  "Data Governance",
];

const TEAM = [
  {
    initials: "GN",
    name: "Gabriele Nicosia",
    title: "Business Developer",
    linkedin: "https://www.linkedin.com/in/gabrielenicosia/",
    // Replace with actual photo: photo: "/team/gabriele.jpg"
    photo: "/team/gabriele.png" as string | null,
    bio: [
      "I help organizations find the right data solution for their context — and then make sure it actually happens. My background spans communication, business development and consulting, which is what brought me to the Microsoft data ecosystem.",
      "I'm a Microsoft Certified Trainer and currently also teach data analysis. At Tealisdata I handle client relationships, business development and training.",
    ],
  },
  {
    initials: "LC",
    name: "Luca Canonico",
    title: "End-to-End Data Architect & Developer",
    linkedin: "https://www.linkedin.com/in/lcanonico/",
    // Replace with actual photo: photo: "/team/luca.jpg"
    photo: "/team/luca.png" as string | null,
    bio: [
      "I've been building data solutions since 2019 — from IT consulting to four years as data analytics trainer and consultant, then senior consultant before co-founding Tealisdata.",
      "I handle the full stack: architecture, data engineering, semantic models, dashboards and deployment. Microsoft Certified Trainer, with a strong focus on solutions that are built to last and that teams can actually own.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col flex-1 min-h-0">

        {/* Header */}
        <div className="py-10 border-b border-[var(--border-subtle)]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)] mb-2">About</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The team.
          </h1>
        </div>

        {/* Two-column team split */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={`flex-1 flex flex-col py-10 overflow-y-auto ${
                i === 0
                  ? "lg:pr-12 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]"
                  : "lg:pl-12"
              }`}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-6">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover object-top shrink-0 border border-[var(--border-subtle)]"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: "var(--color-brand)" }}
                  >
                    {member.initials}
                  </div>
                )}
                <div>
                  <p
                    className="text-lg font-bold text-[var(--text-primary)] leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {member.name}
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-brand)] mt-0.5">
                    {member.title}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-4 mb-8">
                {member.bio.map((para, j) => (
                  <p key={j} className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* LinkedIn */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--color-brand)] hover:underline mt-auto inline-flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn →
              </a>
            </div>
          ))}
        </div>

        {/* Shared skills */}
        <div className="border-t border-[var(--border-subtle)] py-8 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">Skills</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
