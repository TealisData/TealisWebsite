import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Tealis",
  description: "We are a team of certified Microsoft specialists based in Tallinn, Estonia.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20 flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)]">About</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Who we are.
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
            Tealis is a Microsoft-specialized data consultancy founded in Tallinn, Estonia.
            We work with organizations across Europe to turn raw data into decisions,
            manual processes into automation, and teams into data-literate organizations.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="text-xl font-semibold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our approach.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We don&apos;t just deliver projects and disappear. We build capability inside your team —
            transferring knowledge at every step so you stay autonomous long after the engagement ends.
            That&apos;s why every project includes training, documentation and a handover that actually works.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="text-xl font-semibold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Microsoft Partnership.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Tealis is a certified Microsoft partner with deep specialization in the Data & AI workload.
            Our team holds certifications across Power BI, Microsoft Fabric, Azure Data, Power Platform
            and Microsoft Copilot — 15+ active certifications across the practice.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="text-xl font-semibold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Based in Tallinn.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We are incorporated as Tealisdata OÜ under Estonian law — a jurisdiction known for
            its digital governance and business-friendly environment. We work remotely with clients
            across the EU and beyond.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Tealisdata OÜ · Tallinn, Estonia · VAT EE102990636
          </p>
        </div>

      </div>
    </div>
  );
}
