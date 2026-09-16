"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/",           label: "Home" },
  { href: "/consulting", label: "Consulting" },
  { href: "/training",   label: "Training" },
  { href: "/about",      label: "About" },
  { href: "/contact",    label: "Contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return <div className="w-11 h-11" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-11 h-11 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors duration-200"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const mobileVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial:  { opacity: 0, height: 0 },
        animate:  { opacity: 1, height: "auto" },
        exit:     { opacity: 0, height: 0 },
      };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-sm border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-[69px]">

          {/* Logo */}
          <Link href="/" aria-label="Tealis home" className="shrink-0">
            <Logo
              width={140}
              height={74}
              variant={mounted && resolvedTheme === "dark" ? "white" : "default"}
            />
          </Link>

          {/* Desktop nav — right-aligned, sits between logo and theme toggle */}
          <nav className="hidden md:flex items-center gap-8 ml-auto mr-6" aria-label="Primary navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    active
                      ? "text-[var(--color-brand)]"
                      : "text-[var(--text-primary)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-brand)] transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side: dark mode toggle + mobile hamburger */}
          <div className="flex items-center gap-1">
            <ThemeToggle />

            <button
              className="md:hidden flex items-center justify-center w-11 h-11 text-[var(--text-primary)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={mobileVariants.initial}
            animate={mobileVariants.animate}
            exit={mobileVariants.exit}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] shadow-lg"
          >
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm font-medium py-3 px-2 rounded-lg transition-colors duration-150 ${
                      active
                        ? "text-[var(--color-brand)] bg-[var(--bg-surface)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
