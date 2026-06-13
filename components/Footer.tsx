"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About Us" },
];

function AnimatedLogo() {
  return (
    <svg viewBox="98 24 204 140" width="100" height="70" aria-label="Tealis" fill="none">
      {/* Book pages — spread outward from center */}
      <motion.path
        fill="#ffffff"
        d="M124 98 L194 98 Q198 98 199 103 L200 110 L201 103 Q202 98 206 98 L276 98 L292 110 L222 110 Q212 110 208 114 Q200 122 192 114 Q188 110 178 110 L108 110 Z"
        initial={{ scaleX: 0.04, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.34, 1.4, 0.64, 1] }}
        style={{ transformOrigin: "200px 104px" }}
      />
      {/* Blue roof — rises up from the book */}
      <motion.path
        fill="#4A86E8"
        d="M134 84 L191 44 Q200 39 209 44 L266 84 L252 84 L212 66 Q200 61 188 66 L148 84 Z"
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
      />
      {/* TEALIS text */}
      <motion.text
        x="108" y="150"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="19"
        fontWeight="700"
        textLength="184"
        lengthAdjust="spacing"
        fill="#ffffff"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        TEALIS
      </motion.text>
    </svg>
  );
}

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export default function Footer() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => setAtBottom((e as CustomEvent).detail);
    window.addEventListener("tealis:at-bottom", handler);
    return () => window.removeEventListener("tealis:at-bottom", handler);
  }, []);

  return (
    <footer className="bg-[#22252A] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="flex flex-col items-center gap-5 md:col-span-1">
            <AnimatedLogo />
            <AnimatePresence>
              {atBottom && (
                <motion.button
                  onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#4A86E8] text-white text-sm font-semibold rounded-full shadow-lg hover:bg-[#3a70d0] transition-colors group"
                >
                  <span>Get In Touch</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-4">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-4">Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/company/tealisdata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tealisdata.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  info@tealisdata.com
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  Book a Call
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#4A86E8] mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2026 Tealisdata OÜ</p>
          <p>VAT Number EE102990636</p>
        </div>
      </div>
    </footer>
  );
}
