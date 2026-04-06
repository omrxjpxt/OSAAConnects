"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Instagram, Users, Eye, Tag, MapPin, Globe,
  DollarSign, Heart, Star,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import type { Creator } from "@/types";

interface CreatorModalProps {
  creator: Creator;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatorModal({ creator, isOpen, onClose }: CreatorModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap & keyboard nav
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rateDisplay = creator.rates?.reelRate
    ? `₹${creator.rates.reelRate.toLocaleString()} / reel`
    : "Contact for rates";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${creator.name} profile`}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] z-[70] bg-cream rounded-3xl shadow-modal overflow-y-auto"
          >
            {/* Hero image */}
            <div className="relative h-48 md:h-56 bg-gradient-hero rounded-t-3xl overflow-hidden flex-shrink-0">
              {creator.avatarUrl && (
                <Image
                  src={creator.avatarUrl}
                  alt={creator.name}
                  fill
                  className="object-cover"
                  sizes="672px"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close profile modal"
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-white leading-tight">
                    {creator.name}
                  </h2>
                  <p className="text-white/75 text-sm">@{creator.handle}</p>
                </div>
                <a
                  href={creator.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                  aria-label="View on Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: "Followers", value: formatNumber(creator.followers) },
                  { icon: Eye, label: "Avg Views", value: formatNumber(creator.avgViews) },
                  {
                    icon: Heart,
                    label: "Eng. Rate",
                    value: `${((creator.avgViews / creator.followers) * 100).toFixed(1)}%`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-3 text-center shadow-card">
                    <Icon size={18} className="text-gold mx-auto mb-1" />
                    <p className="font-bold text-charcoal text-lg leading-tight">{value}</p>
                    <p className="text-muted text-xs">{label}</p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              {creator.bio && (
                <div>
                  <h3 className="font-semibold text-charcoal mb-1.5">About</h3>
                  <p className="text-charcoal/70 text-body-sm leading-relaxed">{creator.bio}</p>
                </div>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {creator.location && (
                  <div className="flex items-center gap-2 text-body-sm text-charcoal/70">
                    <MapPin size={14} className="text-gold flex-shrink-0" />
                    {creator.location}
                  </div>
                )}
                {creator.languages?.length > 0 && (
                  <div className="flex items-center gap-2 text-body-sm text-charcoal/70">
                    <Globe size={14} className="text-gold flex-shrink-0" />
                    {creator.languages.join(", ")}
                  </div>
                )}
                <div className="flex items-center gap-2 text-body-sm text-charcoal/70">
                  <DollarSign size={14} className="text-gold flex-shrink-0" />
                  {rateDisplay}
                </div>
                <div className="flex items-center gap-2 text-body-sm">
                  <Star size={14} className="text-gold flex-shrink-0" />
                  <span className={creator.availability ? "text-green-600 font-medium" : "text-muted"}>
                    {creator.availability ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Niches */}
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Content Niches</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.niches?.map((niche) => (
                    <span key={niche} className="tag text-sm">
                      <Tag size={12} className="text-gold mr-1" />
                      {niche}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`/contact?creator=${creator.handle}`}
                  className="btn-primary flex-1 text-center text-sm py-3"
                >
                  Invite to Campaign
                </a>
                <a
                  href={creator.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 text-center text-sm py-3 flex items-center justify-center gap-2"
                >
                  <Instagram size={16} />
                  View on Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
