"use client";

import { useState } from "react";
import CreatorForm from "@/components/forms/CreatorForm";
import BrandForm from "@/components/forms/BrandForm";
import { Mail, MessageCircle, Instagram, Phone } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";

const TABS = [
  { id: "creator", label: "Join as Creator" },
  { id: "brand", label: "Work as Brand" },
] as const;

const FAQ = [
  { q: "How do you vet creators?", a: "We manually review every creator's content, engagement rate, audience demographics, and brand-safety history before they join our network." },
  { q: "How long does it take to get a creator shortlist?", a: "We aim to send a tailored shortlist within 48 hours of receiving your brief." },
  { q: "What niches do you cover?", a: "Fashion, Tech, Fitness, Beauty, Food, Travel, AI, Finance, Gaming, Music, Lifestyle, and Education — with more added regularly." },
  { q: "Is OSAA Connects only for Indian brands?", a: "No — we work with global brands wanting to reach Indian audiences, and Indian brands wanting UGC for any market." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function ContactPage() {
  const [tab, setTab] = useState<"creator" | "brand">("brand");
  const waLink = whatsappLink(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+910000000000",
    "Hi OSAA Connects! I'd like to know more."
  );

  return (
    <main className="min-h-screen bg-cream pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-site py-12 md:py-16">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Get in Touch</p>
          <h1 className="font-playfair font-bold text-charcoal mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Let&apos;s Build Something Together
          </h1>
          <p className="text-body-lg text-charcoal/60">
            Whether you&apos;re a brand looking for creators or a creator looking for brand deals,
            we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info sidebar */}
          <aside className="space-y-5">
            <div className="bg-charcoal rounded-2xl p-6 text-cream">
              <h2 className="font-playfair font-bold text-xl mb-5">Contact Info</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "osaaconnects@gmail.com", href: "mailto:osaaconnects@gmail.com" },
                  { icon: Instagram, label: "Instagram", value: "@osaaconnects", href: "https://instagram.com/osaaconnects" },
                  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: waLink },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-cream/50">{label}</p>
                      <p className="text-body-sm text-cream group-hover:text-gold transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-card border border-beige">
              <h2 className="font-playfair font-bold text-charcoal text-lg mb-4">FAQ</h2>
              <div className="space-y-4">
                {FAQ.map(({ q, a }) => (
                  <div key={q}>
                    <p className="font-semibold text-charcoal text-body-sm mb-1">{q}</p>
                    <p className="text-muted text-body-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-card p-6 md:p-8 border border-beige">
              {/* Tabs */}
              <div
                className="flex gap-1 p-1 bg-beige rounded-full mb-8"
                role="tablist"
                aria-label="Contact form type"
              >
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    id={`tab-${id}`}
                    role="tab"
                    aria-selected={tab === id}
                    aria-controls={`panel-${id}`}
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex-1 py-2.5 rounded-full text-body-sm font-medium transition-all duration-200",
                      tab === id
                        ? "bg-gold text-white shadow-gold"
                        : "text-muted hover:text-charcoal"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                {tab === "creator" ? (
                  <div id="creator-form">
                    <p className="text-body-sm text-charcoal/60 mb-6">
                      Apply to join — share your handle, niche, sample rate and top performing reel.
                    </p>
                    <CreatorForm />
                  </div>
                ) : (
                  <div id="brand-form">
                    <p className="text-body-sm text-charcoal/60 mb-6">
                      Tell us your campaign goal & budget — we&apos;ll share a creator shortlist within 48 hours.
                    </p>
                    <BrandForm />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
