import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Tealis",
  description: "We are a team of certified Microsoft specialists based in Tallinn, Estonia.",
};

const TEAM = [
  {
    initials: "GN",
    name: "Gabriele Nicosia",
    title: "Business Developer",
    linkedin: "https://www.linkedin.com/in/gabrielenicosia/",
    // Replace with actual photo: photo: "/team/gabriele.jpg"
    photo: "/team/gabriele.png" as string | null,
    bio: [
      "I help organizations find the right data solution for their context — and then make sure it actually happens.",
      "With a background in communication, business development and consulting, I bridge business needs and technology. As a Microsoft Certified Trainer who also teaches data analysis, I know the tools we recommend from the inside. At Tealisdata I'm your main point of contact, from the first conversation to training your team.",
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
      "I've been working with data since 2019 — as a consultant on client projects and as a Microsoft Certified Trainer — before co-founding Tealisdata.",
      "I design and develop end-to-end data solutions — architecture, data engineering, semantic models, dashboards and deployment — and optimise existing ones for performance and cost, with a strong focus on solutions that are built to last and that teams can actually own.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        {/* Header */}
        <div className="py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-text)] mb-2">About</p>
          <h1
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Meet the founders.
          </h1>
        </div>

        {/* Two-column team split */}
        <div className="flex flex-col lg:flex-row">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className={`flex-1 flex flex-col py-10 ${
                i === 0
                  ? "lg:pr-12"
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
                    style={{ backgroundColor: "var(--color-brand-solid)" }}
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
                  <p className="text-xs font-semibold text-[var(--color-brand-text)] mt-0.5">
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
                className="text-xs font-semibold text-[var(--color-brand-text)] hover:underline mt-auto inline-flex items-center gap-1.5"
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

      </div>
    </div>
  );
}
