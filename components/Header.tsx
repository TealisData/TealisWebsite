"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learning" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("tealis:open-contact"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Tealis home">
            <Logo width={110} height={46} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === href ? "text-[#4A86E8]" : "text-[#22252A] hover:text-[#4A86E8]"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#4A86E8] transition-all duration-200 ${
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <button
              onClick={openContact}
              className="px-5 py-2.5 bg-[#4A86E8] text-white text-sm font-semibold rounded-lg hover:bg-[#3a70d0] transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#22252A]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium py-2 border-b border-gray-50 ${
                    pathname === href ? "text-[#4A86E8]" : "text-[#22252A]"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openContact(); }}
                className="mt-2 w-full px-5 py-3 bg-[#4A86E8] text-white text-sm font-semibold rounded-lg hover:bg-[#3a70d0] transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
