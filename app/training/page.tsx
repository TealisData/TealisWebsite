import type { Metadata } from "next";
import { GraduationCap, Users, Wrench } from "lucide-react";
import ProgramShowcase from "@/components/showcase/ProgramShowcase";
import ApproachSection from "@/components/showcase/ApproachSection";
import CtaBand from "@/components/showcase/CtaBand";
import { TRAINING_GROUPS, TRAINING_PROGRAMS } from "@/components/training/trainingContent";

export const metadata: Metadata = {
  title: "Training Programs – Tealis",
  description:
    "Official Microsoft courses and custom programs on Microsoft Fabric, Power BI, Azure Databricks, AI & Copilot and Power Platform — led by Microsoft Certified Trainers.",
};

const FORMATS = [
  {
    icon: <GraduationCap size={20} />,
    title: "Official Microsoft courses",
    text: "Instructor-led Microsoft curriculum, delivered by Microsoft Certified Trainers.",
    points: [
      "Classroom or remote delivery",
      "Hands-on labs",
      "Certification preparation: gap analysis, exam-style practice and a clear plan to pass",
    ],
  },
  {
    icon: <Wrench size={20} />,
    title: "Custom programs",
    text: "Training designed around your tools, your data and your business context.",
    points: ["Discovery workshop on your needs", "Curriculum built on your stack", "Exercises on your real data", "Follow-up Q&A sessions"],
  },
  {
    icon: <Users size={20} />,
    title: "Training on the job",
    text: "We build alongside your team on a real project — and leave the skills behind.",
    points: ["Side-by-side implementation", "Code & design reviews", "Weekly debriefs", "Documentation & knowledge base"],
  },
];

export default function TrainingPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <ProgramShowcase
          label="Training tracks"
          title="The Microsoft data & AI stack, taught by people who build on it."
          subtitle="Official Microsoft courses and custom programs on Fabric, Power BI, Databricks, AI and Power Platform — taught by Microsoft Certified Trainers who build these solutions every day."
          groups={TRAINING_GROUPS}
          programs={TRAINING_PROGRAMS}
          explorerLabel="Explore the programs"
          ctaLabel="Request a quote"
        />
        <ApproachSection label="How we teach" title="Practical, hands-on, built to stick." items={FORMATS} />
        <CtaBand
          title="Let's design your team's learning path."
          text="Tell us your stack and goals — we'll propose the right mix of courses, labs and certification prep."
          button="Request a quote"
        />
      </div>
    </div>
  );
}
