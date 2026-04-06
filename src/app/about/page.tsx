import type { Metadata } from "next";
import { Users, Globe, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | OSAA Connects",
  description:
    "Learn about OSAA Connects — the influencer marketing platform bridging brands and creators. 45+ creators, 137 brands researched. Managed from Delhi, global reach.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: Heart, title: "Creator-First", description: "We believe creators deserve fair pay, clear briefs, and brands who respect their creative voice." },
  { icon: Zap, title: "Speed & Results", description: "48-hour turnaround from brief to shortlist. No endless back-and-forth." },
  { icon: Globe, title: "Global Reach", description: "Brands anywhere, creators everywhere. We operate remotely but deliver locally." },
  { icon: Users, title: "Community", description: "OSAA Connects is a tight-knit community — every creator we work with is personally vetted." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <div className="container-site py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="section-label mb-4">About Us</p>
          <h1
            className="font-playfair font-bold text-charcoal mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            We Bridge the Gap Between{" "}
            <span className="text-gradient-gold">Brands & Creators</span>
          </h1>
          <p className="text-body-lg text-charcoal/60 leading-relaxed">
            OSAA Connects started with a simple belief: great brands and great creators deserve to
            find each other — without the agency bloat, hidden margins, or endless email chains.
          </p>
        </div>

        {/* Mission block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-charcoal rounded-3xl p-8 md:p-10">
            <p className="section-label mb-4 text-gold">Our Mission</p>
            <p className="font-playfair font-bold text-cream text-2xl md:text-3xl mb-4">
              Democratising influencer marketing for India and beyond.
            </p>
            <p className="text-cream/60 text-body-md leading-relaxed">
              With 45+ vetted creators and research into 137+ brands, we&apos;ve built the systems,
              relationships, and expertise to run campaigns that actually perform — not just look good
              on paper.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gold/10 to-beige rounded-3xl p-8 md:p-10 border border-gold/20">
            <p className="section-label mb-4">By the Numbers</p>
            <div className="space-y-5">
              {[
                { value: "45+", label: "Vetted Creators" },
                { value: "137+", label: "Brands Researched" },
                { value: "12+", label: "Content Niches" },
                { value: "48h", label: "Shortlist Turnaround" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center justify-between border-b border-gold/15 pb-3">
                  <span className="text-charcoal/70 text-body-sm">{label}</span>
                  <span className="font-playfair font-bold text-charcoal text-2xl">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Our Values</p>
          <h2 className="font-playfair font-bold text-charcoal text-3xl md:text-4xl">What We Stand For</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-card border border-beige">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Icon size={22} className="text-gold" />
              </div>
              <h3 className="font-playfair font-bold text-charcoal text-xl mb-2">{title}</h3>
              <p className="text-charcoal/60 text-body-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Trust quote */}
        <div className="bg-beige rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <p className="font-playfair italic text-charcoal text-xl md:text-2xl mb-4">
            &ldquo;Managed from Delhi — but built for global reach.&rdquo;
          </p>
          <p className="text-muted text-body-sm">— OSAA Connects Team</p>
        </div>
      </div>
    </main>
  );
}
