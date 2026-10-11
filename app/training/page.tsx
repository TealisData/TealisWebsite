import type { Metadata } from "next";
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
    title: "Official Microsoft courses",
    text: "Instructor-led Microsoft curriculum, delivered by Microsoft Certified Trainers.",
    points: [
      "Classroom or remote delivery",
      "Hands-on labs",
      "Certification preparation: gap analysis, exam-style practice and a clear plan to pass",
    ],
  },
  {
    title: "Custom programs",
    text: "Training designed around your tools, your data and your business context.",
    points: ["Discovery workshop on your needs", "Curriculum built on your stack", "Exercises on your real data", "Follow-up Q&A sessions"],
  },
  {
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
          line="teach"
          title="The Teach line: the Microsoft data & AI stack, taught by people who build on it."
          subtitle="Official Microsoft courses and custom programs on Fabric, Power BI, Databricks, AI and Power Platform — taught by Microsoft Certified Trainers who build these solutions every day."
          groups={TRAINING_GROUPS}
          programs={TRAINING_PROGRAMS}
          explorerTitle="Pick a stop"
          explorerIntro="Five programmes, each a station on the Teach line. Every one can be an official Microsoft course or shaped around your team."
          ctaLabel="Ask about this programme"
        />
        <ApproachSection line="teach" title="Three ways to ride the Teach line" intro="Practical and hands-on, so it sticks after the course ends." items={FORMATS} />
        <CtaBand
          line="teach"
          title="Let's plan your team's route"
          text="Tell us your stack and goals in a 30-minute call. We'll propose the right mix of courses, labs and certification prep."
        />
      </div>
    </div>
  );
}
