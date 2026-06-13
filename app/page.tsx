"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import {
  LayoutGrid,
  DatabaseZap,
  GraduationCap,
  BarChart3,
  ShieldCheck,
  RefreshCcw,
  Eye,
  Handshake,
  Scale,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const services = [
  {
    icon: <LayoutGrid size={22} />,
    title: "Business Applications & Automation",
    description:
      "We digitalize your business processes using Microsoft Power Platform — from ideation to full deployment.",
    capabilities: ["Custom Apps", "Power Apps", "Process Automation", "Cloud Flows", "Business Portals"],
  },
  {
    icon: <DatabaseZap size={22} />,
    title: "Data Strategy & Governance",
    description:
      "Design and implementation of enterprise analytics ecosystems powered by Microsoft Fabric, Power BI and SQL technologies.",
    capabilities: ["Data Engineering", "Data Warehousing", "Microsoft Fabric", "Power BI", "SQL Solutions", "Governance Frameworks"],
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Strategic Training",
    description:
      "Official Microsoft training and customized corporate learning programs that build lasting internal capability.",
    capabilities: ["Certification Preparation", "Microsoft Official Curriculum", "Custom Training", "Training on the Job"],
  },
];


const steps = [
  { number: "01", title: "Discovery & Requirement Analysis", desc: "We analyze business objectives, challenges and existing processes to define the right scope." },
  { number: "02", title: "Architecture & Solution Design", desc: "We design scalable and cost-optimized solutions aligned with your technology landscape." },
  { number: "03", title: "Implementation & Development", desc: "Transparent and collaborative development with regular checkpoints and client involvement." },
  { number: "04", title: "Knowledge Transfer & Training", desc: "Empowering your team to become fully autonomous in managing and evolving their solutions." },
  { number: "05", title: "Post-Launch Support", desc: "Continuous optimization, monitoring and strategic support to maximize long-term value." },
];

const whyTealis = [
  { icon: <ShieldCheck size={20} />, title: "Microsoft Expertise", desc: "Deep specialization in the full Microsoft data and analytics stack." },
  { icon: <RefreshCcw size={20} />, title: "End-to-End Delivery", desc: "From strategy to deployment and training — one partner for the full journey." },
  { icon: <Eye size={20} />, title: "Transparency First", desc: "Clear communication, open processes, and no black-box delivery." },
  { icon: <BarChart3 size={20} />, title: "Business-Oriented Approach", desc: "Technology in service of business outcomes, not the other way around." },
  { icon: <Scale size={20} />, title: "Scalable Architecture", desc: "Solutions designed to grow with your organization and evolve with technology." },
  { icon: <Handshake size={20} />, title: "Long-Term Partnership", desc: "We invest in your success beyond the project — relationships built to last." },
];


export default function HomePage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-[#F7F9FC] to-[#EEF3FA] pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 right-0 w-[600px] h-[600px] bg-[#4A86E8]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6FA8FF]/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EEF3FA] rounded-full w-fit">
              <span className="w-2 h-2 bg-[#4A86E8] rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#4A86E8] tracking-wide uppercase">Microsoft Data &amp; Analytics Partner</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#22252A] leading-tight tracking-tight">
              We don&apos;t just deliver solutions,{" "}
              <span className="text-[#4A86E8]">we build capability.</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              We optimize your processes today, empowering your team to scale and manage them tomorrow.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={openContact}
                className="px-7 py-3.5 bg-[#4A86E8] text-white font-semibold rounded-xl hover:bg-[#3a70d0] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Book a Consultation
              </button>
              <a
                href="#services"
                className="px-7 py-3.5 border border-gray-200 text-[#22252A] font-semibold rounded-xl hover:border-[#4A86E8] hover:text-[#4A86E8] transition-all"
              >
                Explore Services
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[["200+", "Projects Delivered"], ["98%", "Client Satisfaction"], ["15+", "Certifications"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className="text-2xl font-bold text-[#4A86E8]">{n}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">Services</p>
            <h2 className="text-4xl font-bold text-[#22252A]">What We Do</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
              We deliver capability, autonomy, transparency and long-term business value — not just technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>


      {/* METHODOLOGY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-[#22252A]">Our End-to-End Methodology</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-[#4A86E8]/20 hidden lg:block" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col gap-4"
                >
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="w-16 h-16 rounded-full bg-[#4A86E8] flex items-center justify-center text-white font-bold text-lg shadow-md relative z-10">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#22252A] text-sm leading-snug mb-2">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY TEALIS */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">Why Tealis</p>
            <h2 className="text-4xl font-bold text-[#22252A]">Built for Enterprise. Designed for You.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyTealis.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#4A86E8]/30 hover:shadow-md transition-all"
              >
                <div className="mt-0.5 text-[#4A86E8] shrink-0">{w.icon}</div>
                <div>
                  <h4 className="font-semibold text-[#22252A] mb-1.5">{w.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
