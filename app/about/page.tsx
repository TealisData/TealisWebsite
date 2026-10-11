import type { Metadata } from "next";
import Station from "@/components/lines/Station";

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
    line: "teach" as const,
    lineName: "Teach line · client relationships, business development, training",
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
    line: "build" as const,
    lineName: "Build line · architecture, engineering, training",
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
        <Station
          first
          last
          as="h1"
          title="Meet the founders"
          intro="Two Microsoft Certified Trainers, one on each line. Together we build your platform and teach your team to run it."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14 pt-2">
            {TEAM.map((member) => (
              <article key={member.name} className="flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover object-top shrink-0 border-[6px]"
                      style={{ borderColor: `var(--line-${member.line})` }}
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
                      style={{ backgroundColor: "var(--color-brand-solid)" }}
                    >
                      {member.initials}
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">{member.name}</h2>
                    <p className="text-sm font-semibold text-[var(--color-brand-text)]">{member.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{member.lineName}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {member.bio.map((para, j) => (
                    <p key={j} className="text-base text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
                      {para}
                    </p>
                  ))}
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-text)] hover:underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  {member.name.split(" ")[0]} on LinkedIn
                </a>
              </article>
            ))}
          </div>
        </Station>
      </div>
    </div>
  );
}
