"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About Us" },
];

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
            <Image
              src="/logos/logo-tealis-full-white.svg"
              alt="Tealis"
              width={110}
              height={34}
              unoptimized
            />
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
