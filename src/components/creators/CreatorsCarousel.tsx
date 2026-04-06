"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const SAMPLE_CREATORS = [
  { id: "1", name: "Priya Sharma", handle: "priyasharma", niche: "Fashion", followers: 145000, avgViews: 48000, avatarUrl: "/creators/creator1.jpg", location: "Delhi" },
  { id: "2", name: "Arjun Mehra", handle: "arjunfits", niche: "Fitness", followers: 67000, avgViews: 22000, avatarUrl: "/creators/creator2.jpg", location: "Delhi" },
  { id: "3", name: "Zara Ahmed", handle: "zaraaesthetic", niche: "Beauty", followers: 320000, avgViews: 95000, avatarUrl: "/creators/creator3.jpg", location: "Bangalore" },
  { id: "4", name: "Rohan Kapoor", handle: "rohantech", niche: "Tech", followers: 89000, avgViews: 35000, avatarUrl: "/creators/creator4.jpg", location: "Hyderabad" },
  { id: "5", name: "Meera Nair", handle: "meerafoodie", niche: "Food", followers: 210000, avgViews: 72000, avatarUrl: "/creators/creator5.jpg", location: "Chennai" },
  { id: "6", name: "Dev Sinha", handle: "devsocial", niche: "AI", followers: 52000, avgViews: 18000, avatarUrl: "/creators/creator6.jpg", location: "Pune" },
];

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export default function CreatorsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="section-py bg-cream overflow-hidden" aria-labelledby="creators-carousel-heading">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
        >
          <div>
            <p className="section-label mb-2">Creator Network</p>
            <h2 id="creators-carousel-heading" className="font-playfair font-bold text-charcoal" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
              Meet Some of Our Creators
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll("left")} className="p-2.5 rounded-full border border-beige bg-white hover:border-gold transition-colors" aria-label="Scroll left">
              <ChevronLeft size={20} className="text-charcoal" />
            </button>
            <button onClick={() => scroll("right")} className="p-2.5 rounded-full border border-beige bg-white hover:border-gold transition-colors" aria-label="Scroll right">
              <ChevronRight size={20} className="text-charcoal" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {SAMPLE_CREATORS.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 snap-start"
              style={{ width: "260px" }}
            >
              <div className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                {/* Avatar */}
                <div className="h-44 bg-gradient-hero flex items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-2xl font-playfair font-bold text-gold">{creator.name[0]}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-medium text-charcoal flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {creator.niche}
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-playfair font-semibold text-charcoal">{creator.name}</p>
                  <p className="text-muted text-xs mb-2">@{creator.handle} · {creator.location}</p>
                  <div className="flex gap-3 text-xs mb-3">
                    <span className="font-bold text-charcoal">{formatNum(creator.followers)}</span>
                    <span className="text-muted">followers</span>
                    <span className="font-bold text-charcoal">{formatNum(creator.avgViews)}</span>
                    <span className="text-muted">avg views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link href="/creators" className="btn-primary px-8 py-3.5 gap-2">
            Browse All Creators <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
