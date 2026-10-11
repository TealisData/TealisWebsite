import { DoodleCompetence, DoodleSharing, DoodleTailored, DoodleTransparency } from "@/components/handmade/Doodles";

const VALUES = [
  {
    icon: DoodleTransparency,
    title: "Transparency",
    text: "You see the plan, the reasoning and the cost in writing before anything starts.",
    practice: "No hidden extras, no jargon to hide behind.",
  },
  {
    icon: DoodleSharing,
    title: "Knowledge sharing",
    text: "We explain each decision as we make it and document what we build.",
    practice: "Your team can carry on without us.",
  },
  {
    icon: DoodleCompetence,
    title: "Competence",
    text: "Microsoft Certified Trainers who build what they teach, on real projects.",
    practice: "The people you meet are the people who do the work.",
  },
  {
    icon: DoodleTailored,
    title: "Tailored, not out of the box",
    text: "We start from your data, your tools and your people, never from a template.",
    practice: "Every solution and every course is shaped around you.",
  },
];

/** How working with us actually looks: the four values, each turned into a concrete commitment */
export default function ValuesSection({ title = "Four promises we keep.", band = "var(--bg-tint-1)" }: { title?: string; band?: string }) {
  return (
    <section className="band py-8 md:py-12" style={{ ["--band" as string]: band }}>
      <div className="flex flex-col items-start gap-4 mb-8 max-w-2xl">
        <span className="caption-box">Our values</span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {VALUES.map(({ icon: Icon, title: t, text, practice }) => (
          <div key={t} className="panel flex flex-col gap-3 p-6">
            <Icon className="h-12 w-12 -ml-1 text-[var(--color-brand)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{t}</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{text}</p>
            <p className="mt-auto pt-3 border-t-2 border-dashed border-[var(--border-subtle)] text-sm font-semibold text-[var(--color-brand-text)]">{practice}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
