import ContactButton from "@/components/showcase/ContactButton";
import { SceneCalendar } from "@/components/clearline/Scenes";

/** Closing panel with a contact CTA, in the clear-line style */
export default function CtaBand({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <section className="band [--band:var(--bg-primary)] py-8 md:py-12">
      <div className="panel overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_300px] items-stretch bg-[var(--fill-sky)]">
        <div className="flex flex-col items-start gap-4 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-xl">{text}</p>
          <ContactButton>{button}</ContactButton>
        </div>
        <div className="hidden md:flex items-end border-l-[length:var(--line-w)] border-[var(--line)] bg-[var(--bg-primary)] px-4 pt-4">
          <SceneCalendar className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
