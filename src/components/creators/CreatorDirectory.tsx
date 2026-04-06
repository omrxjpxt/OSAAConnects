"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import Fuse from "fuse.js";
import Papa from "papaparse";
import CreatorCard from "./CreatorCard";
import { CreatorCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { cn } from "@/lib/utils";
import type { Creator, CreatorFilters } from "@/types";

const NICHES = ["Fashion", "Tech", "Fitness", "Beauty", "Food", "Travel", "AI", "Finance", "Gaming", "Music", "Lifestyle", "Education"];
const FOLLOWER_TIERS = [
  { label: "Nano (< 10K)", value: "nano" },
  { label: "Micro (10K–100K)", value: "micro" },
  { label: "Macro (100K–1M)", value: "macro" },
  { label: "Mega (1M+)", value: "mega" },
];
const PRICE_BRACKETS = ["< ₹5K", "₹5K–₹15K", "₹15K–₹50K", "₹50K+"];
const LOCATIONS = ["Delhi", "Pune", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Remote"];
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Kannada", "Bengali"];

const PAGE_SIZE = 9;

interface CreatorDirectoryProps {
  initialCreators: Creator[];
}

function matchFollowerTier(followers: number, tier: string): boolean {
  if (tier === "nano") return followers < 10_000;
  if (tier === "micro") return followers >= 10_000 && followers < 100_000;
  if (tier === "macro") return followers >= 100_000 && followers < 1_000_000;
  if (tier === "mega") return followers >= 1_000_000;
  return true;
}

export default function CreatorDirectory({ initialCreators }: CreatorDirectoryProps) {
  const [filters, setFilters] = useState<CreatorFilters>({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(initialCreators, {
        keys: ["name", "handle", "niches", "location"],
        threshold: 0.35,
      }),
    [initialCreators]
  );

  const filtered = useMemo(() => {
    let results = initialCreators;

    if (search.trim()) {
      results = fuse.search(search).map((r) => r.item);
    }

    return results.filter((c) => {
      if (filters.niche && !c.niches?.includes(filters.niche)) return false;
      if (filters.followerTier && !matchFollowerTier(c.followers, filters.followerTier)) return false;
      if (filters.location && c.location !== filters.location) return false;
      if (filters.language && !c.languages?.includes(filters.language)) return false;
      return true;
    });
  }, [initialCreators, search, filters, fuse]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  const exportCSV = () => {
    const toExport = selected.size > 0
      ? filtered.filter((c) => selected.has(c._id))
      : filtered;
    const csv = Papa.unparse(
      toExport.map((c) => ({
        Name: c.name,
        Handle: `@${c.handle}`,
        "IG Link": c.igLink,
        Followers: c.followers,
        "Avg Views": c.avgViews,
        Niches: c.niches?.join(", "),
        Location: c.location,
        Languages: c.languages?.join(", "),
        "Reel Rate": c.rates?.reelRate ? `₹${c.rates.reelRate}` : "N/A",
        Available: c.availability ? "Yes" : "No",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `osaa-creators-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Search & toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or handle…"
            aria-label="Search creators"
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full border text-body-sm font-medium transition-all",
              activeFilterCount > 0
                ? "border-gold bg-gold/10 text-gold"
                : "border-beige bg-white text-charcoal hover:border-gold"
            )}
            aria-expanded={showFilters}
          >
            <Filter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-gold text-white rounded-full text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-beige bg-white text-charcoal text-body-sm font-medium hover:border-gold transition-colors"
            title={selected.size > 0 ? `Export ${selected.size} selected` : "Export all"}
          >
            <Download size={16} />
            <span className="hidden sm:inline">
              {selected.size > 0 ? `Export (${selected.size})` : "Export CSV"}
            </span>
          </button>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white rounded-2xl border border-beige p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-charcoal">Filter Creators</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-body-sm text-muted hover:text-gold flex items-center gap-1">
                    <X size={14} /> Clear all
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FilterSelect
                  label="Niche"
                  value={filters.niche || ""}
                  options={NICHES}
                  onChange={(v) => setFilters((f) => ({ ...f, niche: v || undefined }))}
                />
                <FilterSelect
                  label="Follower Tier"
                  value={filters.followerTier || ""}
                  options={FOLLOWER_TIERS.map((t) => t.label)}
                  values={FOLLOWER_TIERS.map((t) => t.value)}
                  onChange={(v) => setFilters((f) => ({ ...f, followerTier: (v as CreatorFilters["followerTier"]) || undefined }))}
                />
                <FilterSelect
                  label="Location"
                  value={filters.location || ""}
                  options={LOCATIONS}
                  onChange={(v) => setFilters((f) => ({ ...f, location: v || undefined }))}
                />
                <FilterSelect
                  label="Language"
                  value={filters.language || ""}
                  options={LANGUAGES}
                  onChange={(v) => setFilters((f) => ({ ...f, language: v || undefined }))}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <p className="text-body-sm text-muted mb-5">
        Showing <strong className="text-charcoal">{paginated.length}</strong> of{" "}
        <strong className="text-charcoal">{filtered.length}</strong> creators
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => <CreatorCardSkeleton key={i} />)}
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-playfair font-bold text-charcoal text-xl mb-2">No creators found</p>
          <p className="text-muted text-body-sm mb-4">Try adjusting your filters or search term.</p>
          <button onClick={clearFilters} className="btn-secondary text-sm">Clear Filters</button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {paginated.map((creator) => (
              <motion.div
                key={creator._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <CreatorCard creator={creator} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-full border border-beige bg-white text-charcoal disabled:opacity-40 hover:border-gold transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "w-9 h-9 rounded-full text-body-sm font-medium transition-all",
                page === i + 1
                  ? "bg-gold text-white shadow-gold"
                  : "border border-beige bg-white text-charcoal hover:border-gold"
              )}
              aria-label={`Page ${i + 1}`}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-full border border-beige bg-white text-charcoal disabled:opacity-40 hover:border-gold transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── FilterSelect ─────────────────────────────────────────────────────────────
interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  values?: string[];
  onChange: (v: string) => void;
}

function FilterSelect({ label, value, options, values, onChange }: FilterSelectProps) {
  return (
    <div>
      <label className="text-label text-muted block mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field text-sm py-2"
        aria-label={`Filter by ${label}`}
      >
        <option value="">All {label}s</option>
        {options.map((opt, i) => (
          <option key={opt} value={values ? values[i] : opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
