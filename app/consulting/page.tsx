import type { Metadata } from "next";
import { Compass, GraduationCap, Rocket } from "lucide-react";
import ProgramShowcase from "@/components/showcase/ProgramShowcase";
import ApproachSection from "@/components/showcase/ApproachSection";
import CtaBand from "@/components/showcase/CtaBand";
import { CONSULTING_GROUPS, CONSULTING_SERVICES } from "@/components/consulting/consultingContent";

export const metadata: Metadata = {
  title: "Consulting Services – Tealis",
  description:
    "Modern data architecture, data strategy & governance, and AI & agents on Microsoft Fabric, Azure Databricks, Power BI, Purview and Copilot — built for your team to own.",
};

const APPROACH = [
  {
    icon: <Compass size={20} />,
    title: "Assess & design",
    text: "We start from your goals and your data, not from a product catalogue.",
    points: ["Discovery workshops", "Target architecture", "Prioritized roadmap"],
  },
  {
    icon: <Rocket size={20} />,
    title: "Build & deliver",
    text: "End-to-end delivery, from the data platform to dashboards, apps and agents.",
    points: ["Iterative delivery", "Tested, versioned code", "Deployment & monitoring"],
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Enable & hand over",
    text: "Your team owns the solution — no black boxes, no lock-in.",
    points: ["Documentation", "Training on the job", "Ongoing support when you need it"],
  },
];

export default function ConsultingPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <ProgramShowcase
          label="Consulting"
          title="End-to-end Microsoft data & AI solutions, built for your team to own."
          subtitle="We build modern data platforms, put the strategy and governance around them, and bring AI into your daily work — on the Microsoft stack, with knowledge transfer built in, so you never depend on us."
          groups={CONSULTING_GROUPS}
          programs={CONSULTING_SERVICES}
          explorerLabel="Explore our services"
          ctaLabel="Get in touch"
        />
        <ApproachSection label="How we work" title="From first workshop to full ownership." items={APPROACH} />
        <CtaBand
          title="Let's talk about your data."
          text="Tell us your goals and current stack — we'll propose the right architecture and a roadmap to get there."
          button="Get in touch"
        />
      </div>
    </div>
  );
}
