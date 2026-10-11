import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, FileText, Mail } from "lucide-react";
import ApproachSection from "@/components/showcase/ApproachSection";
import ContactButton from "@/components/showcase/ContactButton";
import { SceneCalendar, SceneConnect, SceneCustom, SceneMessage } from "@/components/clearline/Scenes";
import Scribble from "@/components/handmade/Scribble";

export const metadata: Metadata = {
  title: "Contact – Tealis",
  description: "Book a 30-minute call, send us a message or connect on LinkedIn — we reply within one business day.",
};

const NEXT_STEPS = [
  {
    scene: <SceneMessage className="w-full h-auto" />,
    icon: <Mail size={20} />,
    title: "We reply",
    text: "A real person gets back to you within one business day.",
    points: ["Plain-language answers", "The right person for your topic"],
  },
  {
    scene: <SceneCalendar className="w-full h-auto" />,
    icon: <CalendarDays size={20} />,
    title: "Discovery call",
    text: "A 30-minute call on Microsoft Teams to understand your goals and context.",
    points: ["Your data, stack and team", "What success looks like"],
  },
  {
    scene: <SceneCustom className="w-full h-auto" />,
    icon: <FileText size={20} />,
    title: "Tailored proposal",
    text: "A clear proposal for consulting, training or both — scope, timeline and cost.",
    points: ["Concrete next steps", "No commitment required"],
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        <section className="band [--band:var(--bg-tint-1)] py-8 md:py-12">
          <div className="flex flex-col items-start gap-4 mb-8 max-w-2xl">
            <span className="caption-box">Contact</span>
            <h1 className="text-3xl md:text-[44px] font-bold text-[var(--text-primary)] leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: "var(--font-heading)" }}>
              Let&apos;s talk about your data &amp; AI <Scribble>goals</Scribble>.
            </h1>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              Whether you have a specific project in mind, want to explore training options, or just want to understand
              what we do — we&apos;re happy to talk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="panel overflow-hidden flex flex-col">
              <div className="border-b-[length:var(--line-w)] border-[var(--line)] px-4 pt-3 bg-[var(--fill-sky)]">
                <SceneCalendar className="w-full h-auto" />
              </div>
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Book a meeting
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Pick a time for a 30-minute call on Microsoft Teams to discuss your project or needs.
                </p>
                <div className="mt-auto pt-2"><Link data-press href="/contact/meet" className="btn-ink">Open calendar</Link></div>
              </div>
            </article>
            <article className="panel overflow-hidden flex flex-col">
              <div className="border-b-[length:var(--line-w)] border-[var(--line)] px-4 pt-3">
                <SceneMessage className="w-full h-auto" />
              </div>
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Send a message
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Tell us about your project and we&apos;ll get back to you within one business day.
                </p>
                <div className="mt-auto pt-2"><ContactButton>Write to us</ContactButton></div>
              </div>
            </article>
            <article className="panel overflow-hidden flex flex-col">
              <div className="border-b-[length:var(--line-w)] border-[var(--line)] px-4 pt-3">
                <SceneConnect className="w-full h-auto" />
              </div>
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h2 className="text-xl md:text-2xl font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Connect on LinkedIn
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Follow us for updates, insights and news from the Microsoft data &amp; AI world.
                </p>
                <div className="mt-auto pt-2"><a data-press href="https://www.linkedin.com/company/tealisdata" target="_blank" rel="noopener noreferrer" className="btn-line">Follow us on LinkedIn</a></div>
              </div>
            </article>
          </div>
        </section>

        <ApproachSection label="What happens next" title="Simple, fast, no strings attached." items={NEXT_STEPS} />

      </div>
    </div>
  );
}
