/** "How we teach / How we work": three steps drawn as a strip of clear-line panels */
export default function ApproachSection({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: { icon?: React.ReactNode; scene?: React.ReactNode; title: string; text: string; points: string[] }[];
}) {
  return (
    <section className="band [--band:var(--bg-tint-2)] py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 mb-8 max-w-2xl">
        <span className="caption-box">{label}</span>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((f) => (
          <article key={f.title} className="panel overflow-hidden flex flex-col">
            {f.scene ? (
              <div className="bg-[var(--fill-sky)] border-b-[length:var(--line-w)] border-[var(--line)] px-4 pt-3">{f.scene}</div>
            ) : (
              f.icon && <span className="px-6 pt-6 text-[var(--color-brand-text)]">{f.icon}</span>
            )}
            <div className="flex flex-col gap-3 p-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.text}</p>
              <ul className="flex flex-col gap-2 mt-1">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-[var(--line)] bg-[var(--color-brand)]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
