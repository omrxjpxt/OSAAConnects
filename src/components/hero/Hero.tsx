"use client";

import { useState, useEffect } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";

const STATS = [
  { value: 45, suffix: "+", label: "Vetted Creators" },
  { value: 137, suffix: "+", label: "Brands Researched" },
  { value: 98, suffix: "%", label: "Campaigns Delivered" },
  { value: 12, suffix: "+", label: "Content Niches" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Animated number ──────────────────────────────────────────────────────────
function CountNumber({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target, count]);

  return (
    <span ref={ref} className="font-playfair font-bold text-charcoal" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
      {display}{suffix}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-hero"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" aria-hidden />

      <div className="container-site relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.p variants={itemVariants} className="section-label mb-4">
            Influencer Marketing Platform
          </motion.p>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-playfair font-bold text-charcoal text-balance mb-6 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Connect Brands With High-Performing Creators.
          </motion.h1>

          {/* Subhead */}
          <motion.p variants={itemVariants} className="text-body-lg text-charcoal/70 max-w-xl mb-2">
            We match brands with creators across fashion, tech, fitness, AI and
            more —{" "}
            <em className="not-italic font-semibold text-charcoal">fast.</em>
          </motion.p>
          <motion.p variants={itemVariants} className="text-body-sm text-muted mb-10">
            Managed from Delhi — global reach.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/contact#brand-form" className="btn-primary text-base px-8 py-3.5 gap-2">
              Work with Creators
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact#creator-form" className="btn-secondary text-base px-8 py-3.5">
              Join Our Network
            </Link>
            <a href="#how-it-works" className="btn-ghost text-base flex items-center gap-2">
              <Play size={16} className="text-gold" />
              See how it works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map(({ value, suffix, label }) => (
              <motion.div key={label} variants={itemVariants} className="flex flex-col">
                <CountNumber target={value} suffix={suffix} />
                <p className="text-body-sm text-muted mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-label text-muted">Scroll to explore</p>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} className="text-gold" />
        </motion.div>
      </div>
    </section>
  );
}
