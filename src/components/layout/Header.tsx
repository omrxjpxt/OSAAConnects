"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/creators", label: "Creators" },
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-card border-b border-beige"
          : "bg-transparent"
      )}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="OSAA Connects Home">
              <div className="relative w-[52px] h-[52px] flex items-center justify-center bg-[#faf9f6] rounded-full overflow-hidden shadow-sm flex-shrink-0 border border-beige/60">
                <Image
                  src="/logo-icon-v2.png"
                  alt="OSAA Connects Logo"
                  fill
                  className="object-cover scale-[1.35]"
                  priority
                />
              </div>
              <span className="font-playfair font-bold text-charcoal text-[22px] group-hover:text-gold transition-colors duration-200 tracking-wide">
                OSAA <span className="text-gold">Connects</span>
              </span>
            </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-body-sm font-medium transition-colors duration-200 relative group",
                  pathname === href
                    ? "text-gold"
                    : "text-charcoal hover:text-gold"
                )}
              >
                {label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gold rounded-full transition-all duration-300",
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact#creator-form" className="btn-ghost text-sm">
              Join as Creator
            </Link>
            <Link href="/contact#brand-form" className="btn-primary text-sm">
              Work with Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-beige transition-colors"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 z-40 bg-cream md:hidden flex flex-col"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 p-6 flex-1"
            >
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center py-4 px-3 text-lg font-medium border-b border-beige transition-colors duration-200",
                      pathname === href ? "text-gold" : "text-charcoal hover:text-gold"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-6 flex flex-col gap-3">
              <Link href="/contact#creator-form" className="btn-secondary text-center">
                Join as Creator
              </Link>
              <Link href="/contact#brand-form" className="btn-primary text-center">
                Work with Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
