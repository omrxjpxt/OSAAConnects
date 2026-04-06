import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import BrandsSection from "@/components/sections/BrandsSection";
import CreatorsCarousel from "@/components/creators/CreatorsCarousel";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "OSAA Connects | Connect Brands With High-Performing Creators.",
  description:
    "We match brands with 45+ vetted creators across fashion, tech, fitness, AI and more — fast. Managed from Delhi, global reach.",
  alternates: { canonical: "/" },
};

// JSON-LD
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OSAA Connects",
  url: "https://osaaconnects.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://osaaconnects.com/creators?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <HowItWorks />
      <CreatorsCarousel />
      <BrandsSection />
      <Stats />
      <ContactCTA />
    </>
  );
}
