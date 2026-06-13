"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface CourseCardProps {
  code: string;
  title: string;
  duration: string;
  description: string;
  index?: number;
  isCustom?: boolean;
}

export default function CourseCard({ code, title, duration, description, index = 0, isCustom = false }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -3, boxShadow: "0 16px 32px rgba(74,134,232,0.12)" }}
      className={`rounded-2xl p-6 border flex flex-col gap-4 transition-shadow duration-300 ${
        isCustom
          ? "bg-gradient-to-br from-[#4A86E8] to-[#6FA8FF] border-transparent text-white"
          : "bg-white border-gray-100 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
            isCustom ? "bg-white/20 text-white" : "bg-[#EEF3FA] text-[#4A86E8]"
          }`}
        >
          {code}
        </span>
        {duration && (
          <span className={`flex items-center gap-1 text-xs font-medium ${isCustom ? "text-white/80" : "text-gray-400"}`}>
            <Clock size={12} />
            {duration}
          </span>
        )}
      </div>
      <h3 className={`font-semibold text-base leading-snug ${isCustom ? "text-white" : "text-[#22252A]"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${isCustom ? "text-white/85" : "text-gray-500"}`}>{description}</p>
    </motion.div>
  );
}
