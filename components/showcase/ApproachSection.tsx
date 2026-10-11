import Station, { type Line } from "@/components/lines/Station";

/** "How we teach / How we work": the stops of an engagement, in order, as one station */
export default function ApproachSection({
  line = "both",
  last = false,
  title,
  intro,
  items,
}: {
  line?: Line;
  last?: boolean;
  title: string;
  intro?: string;
  items: { title: string; text: string; points: string[] }[];
}) {
  return (
    <Station line={line} last={last} title={title} intro={intro} className="band [--band:var(--bg-tint-2)]">
      <ol className="flex flex-col">
        {items.map((f) => (
          <li
            key={f.title}
            className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-x-10 gap-y-2 py-6 border-t border-[var(--border-subtle)] first:border-t-0 first:pt-0"
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{f.title}</h3>
            <div className="flex flex-col gap-3">
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">{f.text}</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-teach)]" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Station>
  );
}
