import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, FileText, Mail, MessageSquare, Users } from "lucide-react";
import ApproachSection from "@/components/showcase/ApproachSection";
import ContactButton from "@/components/showcase/ContactButton";
import WaveArt from "@/components/showcase/WaveArt";

export const metadata: Metadata = {
  title: "Contact – Tealis",
  description: "Book a 30-minute call, send us a message or connect on LinkedIn — we reply within one business day.",
};

const NEXT_STEPS = [
  {
    icon: <Mail size={20} />,
    title: "We reply",
    text: "A real person gets back to you within one business day.",
    points: ["Plain-language answers", "The right person for your topic"],
  },
  {
    icon: <CalendarDays size={20} />,
    title: "Discovery call",
    text: "A 30-minute call on Microsoft Teams to understand your goals and context.",
    points: ["Your data, stack and team", "What success looks like"],
  },
  {
    icon: <FileText size={20} />,
    title: "Tailored proposal",
    text: "A clear proposal for consulting, training or both — scope, timeline and cost.",
    points: ["Concrete next steps", "No commitment required"],
  },
];

const cardBase = "relative overflow-hidden rounded-[var(--radius-lg)] border p-6 md:p-8 flex flex-col gap-5";

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">

        <section className="py-10 md:py-14 border-b border-[var(--border-subtle)]">
          <div className="flex flex-col gap-3 mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">Contact</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Let&apos;s talk about your data &amp; AI goals.
            </h1>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              Whether you have a specific project in mind, want to explore training options, or just want to understand
              what we do — we&apos;re happy to talk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured: book a meeting */}
            <div className={`${cardBase} bg-[var(--color-dark)] text-[var(--bg-primary)] border-transparent`}>
              <WaveArt id="wave-art-contact" className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
              <div className="relative flex flex-col gap-3">
                <CalendarDays size={20} className="text-[var(--color-brand)]" />
                <h2 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  Book a meeting
                </h2>
                <p className="text-sm leading-relaxed opacity-80">
                  Pick a time for a 30-minute call on Microsoft Teams to discuss your project or needs.
                </p>
              </div>
              <Link
                href="/contact/meet"
                className="relative mt-auto self-start px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--bg-primary)] text-[var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                Open calendar
              </Link>
            </div>

            <div className={`${cardBase} bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]`}>
              <div className="flex flex-col gap-3">
                <MessageSquare size={20} className="text-[var(--color-brand)]" />
                <h2 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  Send a message
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-primary)]/70">
                  Tell us about your project and we&apos;ll get back to you within one business day.
                </p>
              </div>
              <ContactButton className="mt-auto self-start">Write to us</ContactButton>
            </div>

            <div className={`${cardBase} bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)]`}>
              <div className="flex flex-col gap-3">
                <Users size={20} className="text-[var(--color-brand)]" />
                <h2 className="text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  Connect on LinkedIn
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-primary)]/70">
                  Follow us for updates, insights and news from the Microsoft data &amp; AI world.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/company/tealisdata"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto self-start px-5 py-2.5 text-sm font-semibold rounded-lg bg-[var(--color-dark)] text-[var(--bg-primary)] hover:opacity-80 transition-opacity"
              >
                Follow us on LinkedIn
              </a>
            </div>
          </div>
        </section>

        <ApproachSection label="What happens next" title="Simple, fast, no strings attached." items={NEXT_STEPS} />

      </div>
    </div>
  );
}
