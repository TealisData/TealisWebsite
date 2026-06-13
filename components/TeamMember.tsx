"use client";

import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  index?: number;
  initials?: string;
}

export default function TeamMember({ name, role, index = 0, initials }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex flex-col items-center text-center gap-4"
    >
      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#EEF3FA] to-[#D6E4F9] flex items-center justify-center shadow-sm border border-[#D6E4F9] overflow-hidden">
        {initials ? (
          <span className="text-3xl font-bold text-[#4A86E8]">{initials}</span>
        ) : (
          <svg viewBox="0 0 128 128" className="w-20 h-20 text-[#4A86E8]/40" fill="currentColor">
            <circle cx="64" cy="48" r="24" />
            <path d="M16 112c0-26.51 21.49-48 48-48s48 21.49 48 48H16z" />
          </svg>
        )}
      </div>
      <div>
        <p className="font-semibold text-[#22252A] text-lg">{name}</p>
        <p className="text-[#4A86E8] text-sm font-medium mt-0.5">{role}</p>
      </div>
    </motion.div>
  );
}
