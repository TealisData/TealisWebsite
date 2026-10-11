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
          as="h1"
          title="Meet the founders"
          intro="Two Microsoft Certified Trainers, one on each line. Together we build your platform and teach your team to run it."
        />
        {TEAM.map((member, i) => (
          <Station
            key={member.name}
            line={member.line}
            last={i === TEAM.length - 1}
            title={member.name}
            className={i % 2 === 0 ? "band [--band:var(--bg-tint-1)]" : ""}
            marker={
              member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo}
                  alt=""
                  className="block max-w-none w-14 h-14 md:w-[72px] md:h-[72px] rounded-full object-cover object-top border-[5px] bg-[var(--bg-primary)]"
                  style={{ borderColor: `var(--line-${member.line})` }}
                />
              ) : undefined
            }
            intro={
              <span className="flex flex-col gap-1">
                <span className="font-semibold text-[var(--color-brand-text)]">{member.title}</span>
                <span className="text-sm">{member.lineName}</span>
              </span>
            }
          >
            <div className="flex flex-col gap-4">
              {member.bio.map((para, j) => (
                <p key={j} className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-[64ch]">
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
          </Station>
        ))}
      </div>
    </div>
  );
}
