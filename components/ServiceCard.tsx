"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  capabilities: string[];
  index?: number;
}

export default function ServiceCard({ icon, title, description, capabilities, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(74,134,232,0.15)" }}
      className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-5 transition-shadow duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#EEF3FA] flex items-center justify-center text-[#4A86E8]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#22252A]">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      <ul className="flex flex-wrap gap-2 mt-auto">
        {capabilities.map((cap) => (
          <li
            key={cap}
            className="px-3 py-1 bg-[#EEF3FA] text-[#4A86E8] text-xs font-medium rounded-full"
          >
            {cap}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
