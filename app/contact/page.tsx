import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Station from "@/components/lines/Station";
import NextSlots from "@/components/lines/NextSlots";
import ApproachSection from "@/components/showcase/ApproachSection";
import ContactButton from "@/components/showcase/ContactButton";

export const metadata: Metadata = {
  title: "Contact – Tealis",
  description: "Book a 30-minute call, send us a message or connect on LinkedIn — we reply within one business day.",
};

const NEXT_STEPS = [
  {
    title: "We reply",
    text: "A real person gets back to you within one business day.",
    points: ["Plain-language answers", "The right person for your topic"],
  },
  {
    title: "Discovery call",
    text: "A 30-minute call on Microsoft Teams to understand your goals and context.",
    points: ["Your data, stack and team", "What success looks like"],
  },
  {
    title: "Tailored proposal",
    text: "A clear proposal for consulting, training or both: scope, timeline and cost.",
    points: ["Concrete next steps", "No commitment required"],
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        <Station
          first
          as="h1"
          title="Let's talk about your data & AI goals"
          intro="Whether you have a project in mind, want to explore training, or just want to understand what we do, we're happy to talk. Pick the way that suits you."
          className="band [--band:var(--bg-tint-1)]"
        >
          <ol className="flex flex-col">
            <li className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-10 gap-y-3 py-6 first:pt-0">
              <h2 className="self-start flex items-center gap-3 text-xl font-bold text-[var(--text-primary)]">
                <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[var(--line-teach)]" aria-hidden="true" />
                Book a call
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
                  30 minutes on Microsoft Teams with Gabriele, to discuss your project or needs. Free, no commitment.
                </p>
                <NextSlots label="Open the calendar" />
              </div>
            </li>
            <li className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-10 gap-y-3 py-6 border-t border-[var(--border-subtle)]">
              <h2 className="self-start flex items-center gap-3 text-xl font-bold text-[var(--text-primary)]">
                <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[var(--line-build)]" aria-hidden="true" />
                Send a message
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
                  Tell us about your project and we&apos;ll get back to you within one business day.
                </p>
                <ContactButton className="self-start">Write to us</ContactButton>
              </div>
            </li>
            <li className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-10 gap-y-3 py-6 border-t border-[var(--border-subtle)]">
              <h2 className="self-start flex items-center gap-3 text-xl font-bold text-[var(--text-primary)]">
                <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[var(--line-build)]" aria-hidden="true" />
                Follow along
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
                  Updates, insights and news from the Microsoft data &amp; AI world, on LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/company/tealisdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-[var(--text-primary)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
                >
                  Tealisdata on LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
            </li>
          </ol>
        </Station>

        <ApproachSection last title="What happens next" intro="Simple, fast, no strings attached." items={NEXT_STEPS} />

      </div>
    </div>
  );
}
