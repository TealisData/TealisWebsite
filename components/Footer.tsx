"use client";

import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About Us" },
];

export default function Footer() {
  return (
    <footer className="bg-[#22252A] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div className="flex flex-col gap-4">
            <Logo variant="white" width={110} height={46} />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Transforming data into business value through end-to-end data management, analytics, automation and Microsoft-powered solutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Navigation</h4>
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

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Ready to transform your data ecosystem?
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
              className="mt-4 px-5 py-2.5 bg-[#4A86E8] text-white text-sm font-semibold rounded-lg hover:bg-[#3a70d0] transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Tealis. All rights reserved.</p>
          <p>Data Management · Analytics · Microsoft Solutions · Corporate Training</p>
        </div>
      </div>
    </footer>
  );
}
