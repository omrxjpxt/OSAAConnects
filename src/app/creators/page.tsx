"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const MOCK_CREATORS = [
  {
    id: 1,
    name: "Riya Sharma",
    handle: "@riyafit",
    niche: "Fitness",
    followers: "42K",
    avgViews: "30K",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 2,
    name: "Arjun Tech",
    handle: "@arjuntech",
    niche: "Tech",
    followers: "120K",
    avgViews: "80K",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 3,
    name: "Zara Fashion",
    handle: "@zarafashion",
    niche: "Fashion",
    followers: "300K",
    avgViews: "150K",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 4,
    name: "Dev AI",
    handle: "@ai_dev",
    niche: "AI",
    followers: "55K",
    avgViews: "40K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 5,
    name: "Foodie Rohan",
    handle: "@rohaneats",
    niche: "Food",
    followers: "88K",
    avgViews: "60K",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 6,
    name: "Travel With Sia",
    handle: "@siatravels",
    niche: "Travel",
    followers: "210K",
    avgViews: "100K",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 7,
    name: "Neha Beauty",
    handle: "@nehalooks",
    niche: "Beauty",
    followers: "95K",
    avgViews: "70K",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 8,
    name: "Finance Guru",
    handle: "@financeguru",
    niche: "Finance",
    followers: "15K",
    avgViews: "10K",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
  },
];

const NICHES = ["All", "Fashion", "Tech", "Fitness", "Beauty", "Food", "Travel", "AI", "Finance"];
const FOLLOWER_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "10k–50k", min: 10, max: 50 },
  { label: "50k–100k", min: 50, max: 100 },
  { label: "100k+", min: 100, max: Infinity },
];

function parseFollowersK(val: string) {
  return parseFloat(val.replace(/K/i, ""));
}

export default function CreatorsPage() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [followerRange, setFollowerRange] = useState("All");

  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.handle.toLowerCase().includes(search.toLowerCase());
      
      const matchesNiche = niche === "All" || c.niche === niche;
      
      const range = FOLLOWER_RANGES.find(r => r.label === followerRange);
      const folK = parseFollowersK(c.followers);
      const matchesFollowers = range ? (folK >= range.min && folK <= range.max) : true;
      
      return matchesSearch && matchesNiche && matchesFollowers;
    });
  }, [search, niche, followerRange]);

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      {/* PAGE HEADER */}
      <section className="container-site py-12 md:py-16 text-center">
        <h1 className="font-playfair font-bold text-charcoal mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          Our Creator Network
        </h1>
        <p className="text-body-lg text-charcoal/60 max-w-2xl mx-auto">
          Discover creators across fashion, tech, fitness, AI and more.
        </p>
      </section>

      {/* STATS BAR */}
      <section className="container-site mb-12">
        <div className="bg-charcoal text-cream rounded-2xl p-8 flex flex-col md:flex-row justify-around items-center gap-6">
          <div className="text-center">
            <p className="font-playfair font-bold text-3xl md:text-4xl text-gold mb-1">45+</p>
            <p className="text-body-sm text-cream/80 uppercase tracking-wider">Creators</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-cream/20"></div>
          <div className="text-center">
            <p className="font-playfair font-bold text-3xl md:text-4xl text-gold mb-1">10+</p>
            <p className="text-body-sm text-cream/80 uppercase tracking-wider">Niches</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-cream/20"></div>
          <div className="text-center">
            <p className="font-playfair font-bold text-3xl md:text-4xl text-gold mb-1">5M+</p>
            <p className="text-body-sm text-cream/80 uppercase tracking-wider">Combined Reach</p>
          </div>
        </div>
      </section>

      <section className="container-site min-h-[500px]">
        {/* CREATOR FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-beige">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search by name or handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-beige focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors bg-cream/30 text-charcoal"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="py-3 px-4 rounded-xl border border-beige focus:outline-none focus:border-gold bg-cream/30 text-charcoal flex-1 md:w-48 appearance-none"
            >
              {NICHES.map(n => <option key={n} value={n}>{n === "All" ? "All Niches" : n}</option>)}
            </select>
            
            <select
              value={followerRange}
              onChange={(e) => setFollowerRange(e.target.value)}
              className="py-3 px-4 rounded-xl border border-beige focus:outline-none focus:border-gold bg-cream/30 text-charcoal flex-1 md:w-48 appearance-none"
            >
              {FOLLOWER_RANGES.map(r => <option key={r.label} value={r.label}>{r.label === "All" ? "All Follower Tiers" : r.label}</option>)}
            </select>
          </div>
        </div>

        {/* CREATOR GRID */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreators.map(creator => (
              <div 
                key={creator.id} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col group border border-beige/50"
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-5 max-w-[120px] mx-auto ring-4 ring-cream group-hover:ring-gold/20 transition-all">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="font-playfair font-bold text-xl text-charcoal">{creator.name}</h3>
                  <p className="text-gold font-medium mb-3 text-sm">{creator.handle}</p>
                  <span className="inline-block px-3 py-1 bg-cream rounded-full text-xs font-medium text-charcoal/70 border border-beige">
                    {creator.niche}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center mb-6 pt-4 border-t border-cream">
                  <div>
                    <p className="text-xs text-muted mb-1 text-charcoal/50">Followers</p>
                    <p className="font-semibold text-charcoal">{creator.followers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1 text-charcoal/50">Reel Views</p>
                    <p className="font-semibold text-charcoal">{creator.avgViews}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Link href="/contact#brand-form" className="block w-full py-2.5 bg-beige text-charcoal font-medium text-sm rounded-lg text-center hover:bg-gold hover:text-white transition-colors duration-300">
                    Invite to Campaign
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-beige">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-playfair font-bold text-xl text-charcoal mb-2">No creators found</p>
            <p className="text-charcoal/60">Try adjusting your filters.</p>
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="container-site mt-24">
        <div className="bg-gradient-to-br from-charcoal to-[#1a191f] rounded-3xl p-10 md:p-16 text-center text-cream relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-playfair font-bold text-3xl md:text-5xl mb-6">Are you a creator?</h2>
            <p className="text-cream/70 mb-8 text-lg">
              Partner with premium brands, manage campaigns effortlessly, and grow your revenue.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gold text-charcoal font-medium rounded-full hover:bg-white transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
            >
              Join our creator network
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
