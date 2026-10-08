/** "How we teach / How we work" section: three approaches with key points */
export default function ApproachSection({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: { icon: React.ReactNode; title: string; text: string; points: string[] }[];
}) {
  return (
    <section className="band [--band:var(--bg-tint-2)] py-8 md:py-12">
      <div className="flex flex-col gap-3 mb-6 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">{label}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((f) => (
          <div key={f.title} className="flex flex-col gap-3 rounded-[var(--radius-lg)] bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-6">
            <span className="text-[var(--color-brand)]">{f.icon}</span>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.text}</p>
            <ul className="flex flex-col gap-2 mt-1">
              {f.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
