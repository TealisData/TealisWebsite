import type { Metadata } from "next";
import Scribble from "@/components/handmade/Scribble";
import ValuesSection from "@/components/handmade/ValuesSection";

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
        <section className="band [--band:var(--bg-tint-1)] py-8 md:py-12">
          <div className="flex flex-col items-start gap-4 mb-8">
            <span className="caption-box">About</span>
            <h1 className="text-3xl md:text-[44px] font-bold text-[var(--text-primary)] leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: "var(--font-heading)" }}>
              Meet the <Scribble>founders</Scribble>.
            </h1>
          </div>

          {/* The two founders, one panel each */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {TEAM.map((member) => (
              <article key={member.name} className="panel overflow-hidden flex flex-col">
                <div className="flex items-end gap-5 px-6 pt-6 pb-0 bg-[var(--fill-sky)] border-b-[length:var(--line-w)] border-[var(--line)]">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-28 h-28 md:w-32 md:h-32 object-cover object-top shrink-0 rounded-t-[10px] border-[length:var(--line-w)] border-b-0 border-[var(--line)] bg-[var(--bg-primary)]"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-t-[10px] flex items-center justify-center text-white text-lg font-bold shrink-0" style={{ backgroundColor: "var(--color-brand-solid)" }}>
                      {member.initials}
                    </div>
                  )}
                  <div className="pb-5">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                      {member.name}
                    </h2>
                    <p className="text-sm font-semibold text-[var(--color-brand-text)] mt-1">{member.title}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6 flex-1">
                  {member.bio.map((para, j) => (
                    <p key={j} className="text-[15px] text-[var(--text-muted)] leading-relaxed">
                      {para}
                    </p>
                  ))}
                  <a
                    data-press
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line mt-auto self-start"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ValuesSection title="What working with us looks like." band="var(--bg-primary)" />
      </div>
    </div>
  );
}
