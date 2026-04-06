"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Zap, Star, Globe } from "lucide-react";

const TRUST_BADGES = [
  { icon: Star, label: "45+ Vetted Creators" },
  { icon: Globe, label: "137 Brands Researched" },
  { icon: Zap, label: "48-Hour Turnaround" },
];

const CASE_STUDIES = [
  {
    id: 1,
    brand: "FashionForward",
    vertical: "Fashion",
    goal: "Product launch awareness",
    impressions: "2.4M+",
    engagement: "8.2%",
    conversions: "1,200+ DMs",
    gradient: "from-amber-50 to-orange-50",
    border: "border-amber-200",
  },
  {
    id: 2,
    brand: "TechFlow",
    vertical: "Tech & SaaS",
    goal: "App downloads campaign",
    impressions: "1.8M+",
    engagement: "6.5%",
    conversions: "3,400 installs",
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
  },
  {
    id: 3,
    brand: "FitLife Delhi",
    vertical: "Fitness & Health",
    goal: "Gym membership leads",
    impressions: "960K+",
    engagement: "11.3%",
    conversions: "240 signups",
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
];

export default function BrandsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-py bg-beige"
      aria-labelledby="brands-heading"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <p className="section-label mb-3">Case Studies</p>
          <h2
            id="brands-heading"
            className="font-playfair font-bold text-charcoal mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Real Campaigns. Real Results.
          </h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mx-auto">
            From fashion to tech to fitness — we've run campaigns across industries.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-beige shadow-card text-body-sm font-medium text-charcoal"
            >
              <Icon size={14} className="text-gold" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`bg-gradient-to-br ${cs.gradient} border ${cs.border} rounded-card p-6 shadow-card hover:shadow-card-hover transition-all`}
            >
              {/* Brand + vertical */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-playfair font-bold text-charcoal text-lg">{cs.brand}</h3>
                  <p className="text-muted text-body-sm">{cs.vertical}</p>
                </div>
                <span className="tag text-xs">{cs.vertical}</span>
              </div>

              <p className="text-body-sm text-charcoal/70 mb-5">
                <span className="font-semibold">Goal:</span> {cs.goal}
              </p>

              {/* Metrics */}
              <div className="space-y-3 border-t border-black/5 pt-4">
                {[
                  { label: "Impressions", value: cs.impressions },
                  { label: "Avg Engagement", value: cs.engagement },
                  { label: "Conversions", value: cs.conversions },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-muted text-body-sm">{label}</span>
                    <span className="font-bold text-charcoal text-body-sm">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-charcoal/60 text-body-md mb-6">
            Tell us your campaign goal & budget — we&apos;ll share a creator shortlist within{" "}
            <strong className="text-charcoal">48 hours</strong>.
          </p>
          <Link href="/contact#brand-form" className="btn-primary px-8 py-3.5 text-base gap-2">
            Request a Campaign Proposal
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
