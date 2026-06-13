"use client";

import { motion } from "framer-motion";
import TeamMember from "@/components/TeamMember";
import { Target, Eye, Lightbulb, Users, Heart, Zap, ShieldCheck, Handshake } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const values = [
  {
    icon: <Eye size={22} />,
    title: "Transparency",
    desc: "We operate with complete openness — in our processes, our pricing, and our communication. No black boxes, ever.",
  },
  {
    icon: <Users size={22} />,
    title: "Collaboration",
    desc: "We work as an extension of your team, not as external vendors. Shared goals, shared outcomes.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Simplicity",
    desc: "We turn complexity into clarity. Simple solutions that solve real problems, without unnecessary overhead.",
  },
  {
    icon: <Zap size={22} />,
    title: "Innovation",
    desc: "We stay at the forefront of Microsoft technology to deliver solutions that are future-proof and cutting-edge.",
  },
  {
    icon: <Heart size={22} />,
    title: "Empowerment",
    desc: "We believe our clients should own their solutions. We build capability, not dependency.",
  },
];

const team = [
  {
    name: "Name Surname",
    role: "Managing Director",
    initials: "MD",
  },
  {
    name: "Name Surname",
    role: "Data & Analytics Consultant",
    initials: "DA",
  },
];

export default function AboutPage() {
  const openContact = () => window.dispatchEvent(new CustomEvent("tealis:open-contact"));

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-[#F7F9FC] to-[#EEF3FA] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A86E8]/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EEF3FA] border border-[#4A86E8]/20 rounded-full mb-6">
              <ShieldCheck size={14} className="text-[#4A86E8]" />
              <span className="text-xs font-semibold text-[#4A86E8] tracking-wide uppercase">About Tealis</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#22252A] leading-tight mb-6">
              People Behind{" "}
              <span className="text-[#4A86E8]">Tealis</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Technology experts committed to transparency, capability building and business transformation through data and Microsoft technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#4A86E8] to-[#6FA8FF] rounded-2xl p-10 text-white flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                &ldquo;We optimize business processes through data, automation and modern Microsoft technologies while ensuring our clients become fully autonomous in managing and evolving their solutions.&rdquo;
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Data", "Automation", "Microsoft", "Autonomy"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#22252A] rounded-2xl p-10 text-white flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                &ldquo;To become the trusted partner organizations rely on to transform complexity into clarity through data-driven decision making.&rdquo;
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Trusted Partner", "Clarity", "Data-Driven"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-white/70">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">What Drives Us</p>
            <h2 className="text-4xl font-bold text-[#22252A]">Our Values</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              These principles guide every engagement, every conversation, and every line of code we deliver.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#4A86E8]/30 hover:shadow-sm transition-all flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EEF3FA] flex items-center justify-center text-[#4A86E8]">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#22252A] text-lg">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}

            {/* Extra value card to make 6 total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#4A86E8]/30 hover:shadow-sm transition-all flex flex-col gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EEF3FA] flex items-center justify-center text-[#4A86E8]">
                <Handshake size={22} />
              </div>
              <h3 className="font-bold text-[#22252A] text-lg">Long-Term Partnership</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We invest in lasting relationships, not one-off projects. Our success is measured by yours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-3">The Team</p>
            <h2 className="text-4xl font-bold text-[#22252A]">The People Who Make It Happen</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Experienced consultants and engineers who are passionate about delivering real business outcomes.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-16">
            {team.map((member, i) => (
              <TeamMember key={i} {...member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#EEF3FA] to-[#F7F9FC]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold text-[#22252A] mb-5">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-500 mb-8 text-lg leading-relaxed">
              Ready to start your data transformation journey? We&apos;d love to hear about your challenges and goals.
            </p>
            <button
              onClick={openContact}
              className="px-10 py-4 bg-[#4A86E8] text-white font-bold rounded-xl hover:bg-[#3a70d0] transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
