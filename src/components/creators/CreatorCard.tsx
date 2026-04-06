"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram, Eye, Users, Tag, MapPin, ExternalLink,
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import type { Creator } from "@/types";
import CreatorModal from "./CreatorModal";

interface CreatorCardProps {
  creator: Creator;
  className?: string;
}

export default function CreatorCard({ creator, className }: CreatorCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const followerTier =
    creator.followers >= 1_000_000
      ? "Mega"
      : creator.followers >= 100_000
      ? "Macro"
      : creator.followers >= 10_000
      ? "Micro"
      : "Nano";

  const tierColor =
    followerTier === "Mega"
      ? "bg-purple-100 text-purple-700"
      : followerTier === "Macro"
      ? "bg-blue-100 text-blue-700"
      : followerTier === "Micro"
      ? "bg-gold/15 text-gold-dark"
      : "bg-green-100 text-green-700";

  return (
    <>
      <motion.article
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "bg-white rounded-card shadow-card overflow-hidden cursor-pointer group",
          "border border-beige hover:border-gold/30 hover:shadow-card-hover",
          "transition-colors duration-300",
          className
        )}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${creator.name}'s profile`}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
      >
        {/* Avatar banner */}
        <div className="relative h-48 bg-gradient-hero overflow-hidden">
          {!imgError && creator.avatarUrl ? (
            <Image
              src={creator.avatarUrl}
              alt={`${creator.name} profile photo`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-3xl font-playfair font-bold text-gold">
                  {creator.name[0]}
                </span>
              </div>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              className="p-2.5 bg-white rounded-full text-charcoal hover:bg-gold hover:text-white transition-colors"
              aria-label="View Instagram"
              onClick={(e) => {
                e.stopPropagation();
                window.open(creator.igLink, "_blank", "noopener noreferrer");
              }}
            >
              <Instagram size={16} />
            </button>
            <button
              className="p-2.5 bg-white rounded-full text-charcoal hover:bg-gold hover:text-white transition-colors"
              aria-label="View full profile"
            >
              <ExternalLink size={16} />
            </button>
          </div>
          {/* Availability dot */}
          {creator.availability && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 rounded-full px-2.5 py-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-charcoal">Available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name + tier */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-playfair font-semibold text-charcoal text-lg leading-tight">
                {creator.name}
              </h3>
              <p className="text-muted text-body-sm">@{creator.handle}</p>
            </div>
            <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", tierColor)}>
              {followerTier}
            </span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 text-body-sm">
              <Users size={14} className="text-gold" />
              <span className="font-semibold text-charcoal">{formatNumber(creator.followers)}</span>
              <span className="text-muted">followers</span>
            </div>
            <div className="flex items-center gap-1.5 text-body-sm">
              <Eye size={14} className="text-gold" />
              <span className="font-semibold text-charcoal">{formatNumber(creator.avgViews)}</span>
              <span className="text-muted">avg views</span>
            </div>
          </div>

          {/* Location */}
          {creator.location && (
            <div className="flex items-center gap-1 text-body-sm text-muted mb-3">
              <MapPin size={12} className="text-gold" />
              {creator.location}
            </div>
          )}

          {/* Niche tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.niches?.slice(0, 3).map((niche) => (
              <span key={niche} className="tag text-xs">
                <Tag size={10} className="text-gold mr-1" />
                {niche}
              </span>
            ))}
            {(creator.niches?.length ?? 0) > 3 && (
              <span className="tag text-xs text-muted">
                +{creator.niches.length - 3}
              </span>
            )}
          </div>

          {/* CTA */}
          <button className="w-full btn-primary text-sm py-2.5">
            View Profile
          </button>
        </div>
      </motion.article>

      <CreatorModal
        creator={creator}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
