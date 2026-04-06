"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { UserCheck, Search, Film, BarChart3 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserCheck,
    title: "Onboard",
    description:
      "Creators submit their profile. Brands send their campaign brief, goals, and budget.",
    color: "bg-gold/10 border-gold/20",
    iconColor: "text-gold",
  },
  {
    number: "02",
    icon: Search,
    title: "Match",
    description:
      "We shortlist creators who are perfectly aligned with your product, audience, and vision.",
    color: "bg-charcoal/5 border-charcoal/10",
    iconColor: "text-charcoal",
  },
  {
    number: "03",
    icon: Film,
    title: "Campaign",
    description:
      "Creators produce authentic content. We manage briefing, delivery, and quality control.",
    color: "bg-gold/10 border-gold/20",
    iconColor: "text-gold",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Report",
    description:
      "We track performance — impressions, engagement, conversions — and share actionable insights.",
    color: "bg-charcoal/5 border-charcoal/10",
    iconColor: "text-charcoal",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-py bg-cream"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Process</p>
          <h2
            id="how-it-works-heading"
            className="font-playfair font-bold text-charcoal mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            How OSAA Connects Works
          </h2>
          <p className="text-body-lg text-charcoal/60 max-w-xl mx-auto">
            From brief to results — a streamlined process designed to get campaigns live fast.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold via-charcoal/20 to-gold"
            aria-hidden
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative p-6 rounded-2xl border-2 ${step.color} transition-shadow hover:shadow-card-hover`}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-label text-muted">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-card flex items-center justify-center">
                    <step.icon size={22} className={step.iconColor} />
                  </div>
                </div>
                <h3 className="font-playfair font-bold text-charcoal text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-charcoal/60 text-body-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
