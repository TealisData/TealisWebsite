import ContactButton from "@/components/showcase/ContactButton";

/** Closing dark band with a contact CTA */
export default function CtaBand({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <section className="py-8 md:py-12">
      <div className="rounded-[var(--radius-xl)] bg-[var(--color-dark)] text-[var(--bg-primary)] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h2>
          <p className="text-sm md:text-base opacity-75 leading-relaxed">{text}</p>
        </div>
        <ContactButton variant="inverted" className="self-start md:self-auto shrink-0">{button}</ContactButton>
      </div>
    </section>
  );
}
