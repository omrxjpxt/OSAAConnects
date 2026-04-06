"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { value: 45, suffix: "+", label: "Vetted Creators", description: "Across 12+ content niches" },
  { value: 137, suffix: "+", label: "Brands Researched", description: "Global and Indian brands" },
  { value: 98, suffix: "%", label: "Campaigns Delivered", description: "On time, every time" },
  { value: 250, suffix: "M+", label: "Combined Reach", description: "Total creator followers" },
];

const TIMELINE = [
  { year: "2022", event: "OSAA Connects founded in Delhi with 5 creators" },
  { year: "2023", event: "Expanded to 25 creators across fashion, tech & fitness" },
  { year: "2024", event: "Researched 137 brands, launched campaign management service" },
  { year: "2025", event: "45+ creators, global reach, payment integrations live" },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-py bg-charcoal"
      aria-labelledby="stats-heading"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3 text-gold">By the Numbers</p>
          <h2
            id="stats-heading"
            className="font-playfair font-bold text-cream mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Trusted by Creators & Brands
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-playfair font-bold text-cream mb-1" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                {inView && <CountUp to={stat.value} suffix={stat.suffix} />}
              </p>
              <p className="font-semibold text-gold text-body-md mb-1">{stat.label}</p>
              <p className="text-cream/40 text-body-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-center font-playfair font-bold text-cream text-2xl mb-10">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 md:-translate-x-0.5" aria-hidden />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  className={`flex items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-gold font-bold text-lg">{item.year}</span>
                    <p className="text-cream/70 text-body-sm mt-1">{item.event}</p>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-charcoal shadow-gold" />
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
