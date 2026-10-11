import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RouteMap from "@/components/lines/RouteMap";
import NextSlots from "@/components/lines/NextSlots";
import Station from "@/components/lines/Station";
import { CONSULTING_SERVICES } from "@/components/consulting/consultingContent";
import { TRAINING_PROGRAMS } from "@/components/training/trainingContent";

type LineKey = "build" | "teach";

/** How an engagement travels. `lines` says which line(s) the stop belongs to. */
const JOURNEY: { stop: string; who: string; text: string; lines: LineKey[] }[] = [
  { stop: "Discovery call", who: "Gabriele", text: "Thirty minutes on Teams, free. You tell us where you are and where you want to go.", lines: ["build", "teach"] },
  { stop: "Assessment", who: "Gabriele & Luca", text: "We look at your data, your tools and your team's skills, then say plainly what we would do and why.", lines: ["build", "teach"] },
  { stop: "Proposal", who: "Gabriele", text: "Scope, timeline and cost in writing before anything starts. No surprises later.", lines: ["build", "teach"] },
  { stop: "Build", who: "Luca", text: "We design and build the solution with your people in the loop, explaining each decision as we make it.", lines: ["build"] },
  { stop: "Teach", who: "Gabriele & Luca", text: "Microsoft-certified training on the tools you actually use, from first steps to certification.", lines: ["teach"] },
  { stop: "Handover", who: "Your team", text: "The documentation, the code and the know-how stay with you. No black boxes, no lock-in.", lines: ["build", "teach"] },
];

const VALUES = [
  { name: "Transparency", text: "You see the plan, the reasoning and the cost before we start, and every decision is written down in what we hand over." },
  { name: "Knowledge sharing", text: "We explain as we build and teach what we know. The goal is a team that no longer needs us for the day-to-day." },
  { name: "Competence", text: "Microsoft Certified Trainers who build what they teach, on Fabric, Power BI, Databricks, Power Platform and AI." },
  { name: "Tailored, not out of the box", text: "No packaged solutions. We start from your context, your data and your people, and design for them." },
];

const FOUNDERS = [
  { name: "Gabriele Nicosia", role: "Business Developer · Microsoft Certified Trainer", photo: "/team/gabriele.png", line: "teach" as const },
  { name: "Luca Canonico", role: "Data Architect & Developer · Microsoft Certified Trainer", photo: "/team/luca.png", line: "build" as const },
];

const code = (cert: string) => cert.split(" · ")[0];

function LineDots({ lines }: { lines: LineKey[] }) {
  return (
    <span className="flex gap-1 shrink-0" role="img" aria-label={lines.length === 2 ? "Both lines" : lines[0] === "build" ? "Build line" : "Teach line"}>
      {lines.map((l) => (
        <span key={l} className="h-3 w-3 rounded-full border-[3px]" style={{ borderColor: `var(--line-${l})` }} />
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        {/* ── First viewport: the offer, the action, the route ── */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] gap-8 lg:gap-10 items-center pt-8 pb-4 md:pt-16 md:pb-12">
          <div className="flex flex-col gap-7">
            <h1 className="text-[38px] leading-[1.05] sm:text-5xl lg:text-[52px] font-bold tracking-[-0.03em] text-[var(--text-primary)] text-balance">
              We build your data platform. Then we teach your team to run it.
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-xl">
              Tealisdata is two Microsoft Certified Trainers who also design and build data solutions. Every project travels
              two lines, <span className="font-semibold text-[var(--text-primary)]">build</span> and{" "}
              <span className="font-semibold text-[var(--color-brand-text)]">teach</span>, and ends at the same stop: your team owning the work.
            </p>
            <NextSlots />
          </div>
          <div className="lg:-mr-6 xl:-mr-10"><RouteMap /></div>
        </section>

        {/* ── The route, one station per section ── */}
        <Station
          first
          title="How a project travels"
          intro="Six stops, always in this order. At each one you know what happens, who does it and what you walk away with."
        >
          <ol className="flex flex-col">
            {JOURNEY.map((j) => (
              <li
                key={j.stop}
                className="grid grid-cols-1 md:grid-cols-[220px_150px_1fr] gap-x-8 gap-y-1 py-5 border-t border-[var(--border-subtle)] first:border-t-0 first:pt-0"
              >
                <span className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  <LineDots lines={j.lines} />
                  {j.stop}
                </span>
                <span className="text-sm font-semibold text-[var(--text-muted)] md:pt-1">{j.who}</span>
                <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[60ch]">{j.text}</p>
              </li>
            ))}
          </ol>
        </Station>

        <Station
          line="build"
          title="The Build line"
          intro="Development: we design and build the platform, from architecture to the last report."
          className="band [--band:var(--bg-tint-1)]"
        >
          <ul className="flex flex-col">
            {CONSULTING_SERVICES.map((sv) => {
              const tech = sv.facts.find((f) => f.label === "Technologies")?.items ?? [];
              return (
                <li key={sv.id} className="border-t border-[var(--border-subtle)] first:border-t-0">
                  <Link
                    href={`/consulting#${sv.id}`}
                    className="group grid grid-cols-1 md:grid-cols-[300px_1fr_auto] items-baseline gap-x-8 gap-y-1 py-4"
                  >
                    <span className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand-text)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      <span className="h-3 w-3 rounded-full border-[3px] border-[var(--line-build)] transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                      {sv.label}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{tech.slice(0, 4).join(" · ")}</span>
                    <span className="text-sm text-[var(--text-muted)]">{sv.headline}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Station>

        <Station
          line="teach"
          title="The Teach line"
          intro="Training: certified courses on the same stack we build with, shaped around your team."
        >
          <ul className="flex flex-col">
            {TRAINING_PROGRAMS.map((p) => {
              const levels = p.facts.find((f) => f.label === "Levels")?.items ?? [];
              const certs = p.facts.find((f) => f.label === "Certification path")?.items ?? [];
              return (
                <li key={p.id} className="border-t border-[var(--border-subtle)] first:border-t-0">
                  <Link
                    href={`/training#${p.id}`}
                    className="group grid grid-cols-1 md:grid-cols-[300px_1fr_auto] items-baseline gap-x-8 gap-y-1 py-4"
                  >
                    <span className="flex items-center gap-3 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand-text)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      <span className="h-3 w-3 rounded-full border-[3px] border-[var(--line-teach)] transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                      {p.label}
                    </span>
                    <span className="tabular text-sm font-semibold text-[var(--color-brand-text)] tracking-wide">
                      {certs.map(code).join(" · ")}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">{levels.join(" → ")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Station>

        <Station
          title="What you can expect from us"
          intro="Four commitments we hold ourselves to, on both lines."
          className="band [--band:var(--bg-tint-2)]"
        >
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
            {VALUES.map((v) => (
              <div key={v.name} className="flex flex-col gap-2">
                <dt className="text-2xl font-bold tracking-[-0.01em] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{v.name}</dt>
                <dd className="text-base text-[var(--text-muted)] leading-relaxed max-w-[52ch]">{v.text}</dd>
              </div>
            ))}
          </dl>
        </Station>

        <Station
          title="Two people, both lines"
          intro="No account managers in between: the people you meet on the call are the people who build and teach."
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            {FOUNDERS.map((f) => (
              <li key={f.name}>
                <Link href="/about" className="group flex items-center gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.photo}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-full object-cover object-top border-[5px] transition-transform duration-300 group-hover:scale-105"
                    style={{ borderColor: `var(--line-${f.line})` }}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand-text)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>{f.name}</span>
                    <span className="text-sm text-[var(--text-muted)] leading-snug">{f.role}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/about" className="self-start inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-text)] hover:underline">
            Meet the founders <ArrowRight size={16} />
          </Link>
        </Station>

        <Station
          last
          title="Your next stop: a 30-minute call"
          intro="Pick a time that suits you. We listen first, and tell you honestly whether and how we can help."
          className="band [--band:var(--bg-tint-1)]"
        >
          <NextSlots label="See all free times" />
        </Station>

      </div>
    </div>
  );
}
