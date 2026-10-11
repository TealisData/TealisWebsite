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
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-x-12 gap-y-12">
            <div className="flex flex-col gap-4">
              <span className="h-[6px] w-12 rounded-full bg-[var(--line-teach)]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Book a call</h2>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
                30 minutes on Microsoft Teams with Gabriele, to discuss your project or needs. Free, no commitment.
              </p>
              <NextSlots label="Open the calendar" />
            </div>

            <div className="flex flex-col gap-4">
              <span className="h-[6px] w-12 rounded-full bg-[var(--line-build)]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Send a message</h2>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
                Tell us about your project and we&apos;ll get back to you within one business day.
              </p>
              <ContactButton variant="outline" className="self-start">Write to us</ContactButton>
            </div>

            <div className="flex flex-col gap-4">
              <span className="h-[6px] w-12 rounded-full bg-[var(--line-build)]" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Follow along</h2>
              <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
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
          </div>
        </Station>

        <ApproachSection last title="What happens next" intro="Simple, fast, no strings attached." items={NEXT_STEPS} />

      </div>
    </div>
  );
}
