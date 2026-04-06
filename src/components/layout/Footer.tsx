"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";

const FOOTER_LINKS = {
  Services: [
    { label: "For Creators", href: "/creators" },
    { label: "For Brands", href: "/brands" },
    { label: "Case Studies", href: "/brands#case-studies" },
    { label: "Pricing", href: "/contact#brand-form" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/about#careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy#cookies" },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://www.instagram.com/osaaconnects", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com/osaaconnects", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com/company/osaaconnects", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:osaaconnects@gmail.com", label: "Email" },
];

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OSAA Connects",
  url: "https://osaaconnects.com",
  logo: "https://osaaconnects.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "osaaconnects@gmail.com",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.instagram.com/osaaconnects",
    "https://twitter.com/osaaconnects",
    "https://linkedin.com/company/osaaconnects",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream" aria-label="Site footer">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />

      {/* Main Footer */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group" aria-label="OSAA Connects Home">
              <div className="relative w-[52px] h-[52px] flex items-center justify-center bg-white/5 rounded-full overflow-hidden flex-shrink-0 border border-cream/20">
                <Image
                  src="/logo-icon-v2.png"
                  alt="OSAA Connects Logo"
                  fill
                  className="object-cover scale-[1.35]"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <span className="font-playfair font-bold text-cream text-[22px] group-hover:text-gold transition-colors duration-200 tracking-wide">
                OSAA <span className="text-gold">Connects</span>
              </span>
            </Link>
            <p className="text-cream/60 text-body-sm max-w-xs leading-relaxed mb-6">
              Matching brands with creators across fashion, tech, fitness, AI and more.
              Managed from Delhi — global reach.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:border-gold hover:text-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-label text-gold mb-4 uppercase">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-body-sm text-cream/60 hover:text-cream transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter bar */}
        <div className="mt-16 pt-10 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-heading-md font-playfair text-cream mb-1">
                Stay in the loop
              </p>
              <p className="text-body-sm text-cream/50">
                Creator opportunities, brand deals, and industry insights.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-full bg-white/10 border border-cream/20 text-cream placeholder:text-cream/40 text-body-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-gold text-charcoal hover:bg-gold-hover transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-body-sm text-cream/40">
          <p>© {new Date().getFullYear()} OSAA Connects. All rights reserved.</p>
          <p>Made with ♥ in Delhi</p>
        </div>
      </div>
    </footer>
  );
}
