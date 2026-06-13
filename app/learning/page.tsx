"use client";

import { motion } from "framer-motion";
import CourseCard from "@/components/CourseCard";
import { BookOpen, Award, Users, Target, CheckCircle2, GraduationCap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const courses = [
  {
    code: "DP-900",
    title: "Introduction to Microsoft Azure Data",
    duration: "1 Day",
    description: "Foundational knowledge of core data concepts and Azure data services including storage, processing and analytics.",
  },
  {
    code: "DP-080",
    title: "Query and Modify Data with Transact-SQL",
    duration: "3 Days",
    description: "Learn to write Transact-SQL queries to retrieve, filter, sort, modify and shape data in relational databases.",
  },
  {
    code: "PL-300",
    title: "Design and Manage Analytics Solutions Using Power BI",
    duration: "3 Days",
    description: "Build and publish interactive reports, dashboards and data models using Microsoft Power BI.",
  },
  {
    code: "DP-600",
    title: "Implementing Analytics Solutions Using Microsoft Fabric",
    duration: "4 Days",
    description: "Design and implement end-to-end analytics solutions on Microsoft Fabric including lakehouses, pipelines and semantic models.",
  },
  {
    code: "DP-100",
    title: "Designing and Implementing a Data Science Solution on Azure",
    duration: "3 Days",
    description: "Train, deploy and manage machine learning models using Azure Machine Learning and the Azure ecosystem.",
  },
];

const additionalCerts = ["DP-700", "PL-900", "AI-102", "MB-620", "MB-410", "MB-100"];

const certFeatures = [
  { icon: <Target size={18} />, title: "Exam Preparation", desc: "Structured preparation aligned with official Microsoft exam objectives." },
  { icon: <BookOpen size={18} />, title: "Mock Exams", desc: "Realistic practice tests that simulate the actual certification experience." },
  { icon: <CheckCircle2 size={18} />, title: "Gap Analysis", desc: "Identify knowledge gaps early and focus learning where it matters most." },
  { icon: <Award size={18} />, title: "Confidence Building", desc: "Progressive skill building so candidates enter exams fully prepared." },
];

const paths = [
  {
    icon: <GraduationCap size={28} />,
    title: "Official Microsoft Curriculum",
    color: "from-[#4A86E8] to-[#6FA8FF]",
    points: [
      "Delivered according to Microsoft standards and guidelines",
      "Aligned with official certification exam objectives",
      "Industry best practices embedded throughout",
      "Recognized globally by employers and institutions",
    ],
  },
  {
    icon: <Users size={28} />,
    title: "Custom-Tailored Training",
    color: "from-[#22252A] to-[#3a3f47]",
    points: [
      "Scenarios built around your real business processes",
      "Custom learning paths for your specific roles and tools",
      "Accelerated adoption of your existing Microsoft investments",
      "Flexible scheduling and delivery format",
    ],
  },
];

export default function LearningPage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-[#22252A] via-[#2d3138] to-[#1a1d22] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A86E8]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6FA8FF]/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full mb-6">
              <GraduationCap size={14} className="text-[#6FA8FF]" />
              <span className="text-xs font-semibold text-[#6FA8FF] tracking-wide uppercase">Corporate Learning</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Microsoft Training &{" "}
              <span className="text-[#6FA8FF]">Capability Building</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Official Microsoft courses, custom learning programs and hands-on enablement for your entire organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">Training Approach</p>
            <h2 className="text-4xl font-bold text-[#22252A]">Two Learning Paths</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Whether you need Microsoft-standard certification training or a program built around your specific business, we design the right path for your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`bg-gradient-to-br ${path.color} rounded-2xl p-8 text-white flex flex-col gap-6`}
              >
                <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center">
                  {path.icon}
                </div>
                <h3 className="text-2xl font-bold">{path.title}</h3>
                <ul className="flex flex-col gap-3">
                  {path.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-white/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE CATALOG */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">Course Catalog</p>
            <h2 className="text-4xl font-bold text-[#22252A]">Microsoft Official Courses</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Authorized Microsoft training delivered by certified instructors with deep real-world experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {courses.map((course, i) => (
              <CourseCard key={course.code} {...course} index={i} />
            ))}
            <CourseCard
              code="CUSTOM"
              title="Custom Training Programs"
              duration=""
              description="Tailored courses built around customer-specific use cases, projects and technology stacks."
              index={courses.length}
              isCustom
            />
            <CourseCard
              code="ON-JOB"
              title="Training on the Job"
              duration=""
              description="Hands-on coaching and knowledge transfer during real project execution — learning by doing."
              index={courses.length + 1}
              isCustom
            />
          </div>

          {/* Additional certifications */}
          <motion.div {...fadeUp} className="mt-12 p-6 bg-[#F7F9FC] rounded-2xl border border-gray-100">
            <p className="text-sm font-semibold text-[#22252A] mb-4">Additional Certifications Available</p>
            <div className="flex flex-wrap gap-3">
              {additionalCerts.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-[#22252A] hover:border-[#4A86E8] hover:text-[#4A86E8] transition-colors cursor-default"
                >
                  {cert}
                </span>
              ))}
              <span className="px-4 py-2 bg-white border border-dashed border-gray-300 rounded-full text-sm text-gray-400">
                + More on request
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATION PREP */}
      <section className="py-24 bg-[#EEF3FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-4">Certification</p>
              <h2 className="text-4xl font-bold text-[#22252A] mb-6">Certification Preparation</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We provide structured, focused preparation programs designed to maximize your team&apos;s success rate on Microsoft certification exams.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certFeatures.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white rounded-xl p-4 border border-gray-100 flex gap-3"
                  >
                    <div className="text-[#4A86E8] shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <p className="font-semibold text-sm text-[#22252A] mb-1">{f.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#4A86E8] to-[#6FA8FF] rounded-2xl p-10 text-white text-center shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={30} className="text-white" />
                </div>
                <p className="text-2xl font-bold leading-snug mb-4">
                  &ldquo;We help professionals achieve Microsoft certifications faster and with greater confidence.&rdquo;
                </p>
                <p className="text-white/70 text-sm">
                  Structured programs · Mock exams · Gap analysis · Expert instructors
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#22252A]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-5">
              Build Internal Data &amp; Analytics Excellence
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Let&apos;s design the right learning program for your organization.
            </p>
            <button
              onClick={openContact}
              className="px-10 py-4 bg-[#4A86E8] text-white font-bold rounded-xl hover:bg-[#3a70d0] transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Request Training Information
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
