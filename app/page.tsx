"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import {
  LayoutGrid,
  DatabaseZap,
  GraduationCap,
  Zap,
  CheckSquare,
  BarChart3,
  Layers,
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

const pillars = [
  {
    icon: <Zap size={24} />,
    title: "Automate",
    desc: "Eliminate manual effort with intelligent automation that scales with your business.",
  },
  {
    icon: <CheckSquare size={24} />,
    title: "Standardize",
    desc: "Build consistent, governed data processes that your entire organization can trust.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Visualize",
    desc: "Turn raw data into clear, actionable insights through intuitive dashboards and reports.",
  },
  {
    icon: <Layers size={24} />,
    title: "Architect",
    desc: "Design scalable, cost-efficient data architectures built for long-term growth.",
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

function DataIllustration() {
  return (
    <svg viewBox="0 0 520 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`vg${i}`} x1={60 + i * 60} y1="20" x2={60 + i * 60} y2="360" stroke="#EEF3FA" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`hg${i}`} x1="20" y1={40 + i * 60} x2="500" y2={40 + i * 60} stroke="#EEF3FA" strokeWidth="1" />
      ))}
      <path d="M 60 200 C 120 200 120 120 180 120" stroke="#4A86E8" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.5" />
      <path d="M 60 200 C 120 200 120 280 180 280" stroke="#6FA8FF" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.5" />
      <path d="M 200 120 C 280 120 280 190 340 190" stroke="#4A86E8" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
      <path d="M 200 280 C 280 280 280 190 340 190" stroke="#6FA8FF" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" />
      <path d="M 360 190 C 420 190 420 190 460 190" stroke="#4A86E8" strokeWidth="2.5" opacity="0.7" />
      <rect x="20" y="175" width="80" height="50" rx="10" fill="#EEF3FA" stroke="#4A86E8" strokeWidth="1.5" />
      <text x="60" y="198" textAnchor="middle" fontSize="9" fill="#4A86E8" fontWeight="600">DATA</text>
      <text x="60" y="212" textAnchor="middle" fontSize="9" fill="#4A86E8" fontWeight="600">SOURCES</text>
      <rect x="165" y="95" width="70" height="50" rx="10" fill="white" stroke="#4A86E8" strokeWidth="1.5" />
      <text x="200" y="116" textAnchor="middle" fontSize="8" fill="#22252A" fontWeight="600">SQL DB</text>
      <text x="200" y="130" textAnchor="middle" fontSize="8" fill="#6FA8FF">Ingestion</text>
      <rect x="165" y="255" width="70" height="50" rx="10" fill="white" stroke="#6FA8FF" strokeWidth="1.5" />
      <text x="200" y="276" textAnchor="middle" fontSize="8" fill="#22252A" fontWeight="600">APIs</text>
      <text x="200" y="290" textAnchor="middle" fontSize="8" fill="#6FA8FF">Streams</text>
      <rect x="310" y="155" width="80" height="70" rx="12" fill="#4A86E8" />
      <text x="350" y="184" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">Microsoft</text>
      <text x="350" y="198" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">Fabric</text>
      <text x="350" y="214" textAnchor="middle" fontSize="8" fill="white" opacity="0.8">OneLake</text>
      <rect x="430" y="160" width="70" height="60" rx="10" fill="#22252A" />
      <text x="465" y="183" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">Power BI</text>
      <rect x="443" y="195" width="6" height="16" rx="1" fill="#4A86E8" />
      <rect x="453" y="188" width="6" height="23" rx="1" fill="#6FA8FF" />
      <rect x="463" y="192" width="6" height="19" rx="1" fill="#4A86E8" opacity="0.7" />
      <rect x="473" y="185" width="6" height="26" rx="1" fill="#6FA8FF" opacity="0.8" />
      <rect x="120" y="30" width="90" height="40" rx="8" fill="white" stroke="#EEF3FA" strokeWidth="1.5" />
      <text x="135" y="47" fontSize="8" fill="#4A86E8" fontWeight="700">↑ 42%</text>
      <text x="135" y="60" fontSize="7" fill="#999">Efficiency</text>
      <rect x="320" y="300" width="90" height="40" rx="8" fill="white" stroke="#EEF3FA" strokeWidth="1.5" />
      <text x="335" y="317" fontSize="8" fill="#0F9D58" fontWeight="700">● Live</text>
      <text x="335" y="330" fontSize="7" fill="#999">Analytics</text>
      <rect x="60" y="310" width="80" height="35" rx="8" fill="white" stroke="#EEF3FA" strokeWidth="1.5" />
      <text x="100" y="326" textAnchor="middle" fontSize="8" fill="#4A86E8">Governance</text>
      <text x="100" y="338" textAnchor="middle" fontSize="7" fill="#999">Automated</text>
    </svg>
  );
}

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EEF3FA] rounded-full w-fit">
              <span className="w-2 h-2 bg-[#4A86E8] rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#4A86E8] tracking-wide uppercase">Microsoft Data &amp; Analytics Partner</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#22252A] leading-tight tracking-tight">
              We don&apos;t just deliver solutions,{" "}
              <span className="text-[#4A86E8]">we build capability.</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[380px] lg:h-[440px]"
          >
            <div className="absolute inset-0 bg-white rounded-2xl border border-gray-100 shadow-xl p-6 overflow-hidden">
              <DataIllustration />
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

      {/* VALUE PILLARS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">Our Approach</p>
            <h2 className="text-4xl font-bold text-[#22252A]">The 4 Value Pillars</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-gradient-to-b from-[#EEF3FA] to-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4A86E8] flex items-center justify-center text-white">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-[#22252A]">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                <span className="absolute top-6 right-6 text-5xl font-black text-[#4A86E8]/10 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-24 bg-[#EEF3FA]">
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
      <section className="py-24 bg-white">
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
                className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-[#4A86E8]/30 hover:shadow-sm transition-all"
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

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-[#22252A] to-[#1a1d22]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold text-white mb-5">
              Ready to Modernize Your Data Ecosystem?
            </h2>
            <p className="text-white/60 mb-8 text-lg leading-relaxed">
              Let&apos;s discuss your challenges and build the right solution together.
            </p>
            <button
              onClick={openContact}
              className="px-10 py-4 bg-[#4A86E8] text-white font-bold rounded-xl text-base hover:bg-[#3a70d0] transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
