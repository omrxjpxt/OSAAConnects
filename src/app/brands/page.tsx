import type { Metadata } from "next";
import BrandsSection from "@/components/sections/BrandsSection";
import BrandForm from "@/components/forms/BrandForm";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "For Brands | OSAA Connects",
  description:
    "Run influencer campaigns that convert. We'll match your brand with vetted creators and deliver results within 48 hours. See case studies.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <div className="container-site py-12 md:py-16">
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">For Brands</p>
          <h1 className="font-playfair font-bold text-charcoal mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Campaigns That Actually Convert
          </h1>
          <p className="text-body-lg text-charcoal/60">
            We research, shortlist and manage creator partnerships so your brand gets authentic
            content — without the hassle. Tell us your goals and we&apos;ll send a tailored creator
            pitch within 48 hours.
          </p>
        </div>
      </div>

      {/* Case studies */}
      <BrandsSection />

      {/* Pitch form */}
      <section id="brand-pitch" className="section-py bg-cream">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="section-label mb-3">Request a Proposal</p>
              <h2 className="font-playfair font-bold text-charcoal text-3xl md:text-4xl mb-3">
                Tell Us About Your Campaign
              </h2>
              <p className="text-body-md text-charcoal/60">
                Share your brief and we&apos;ll send a creator shortlist within 48 hours.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-card p-8 border border-beige">
              <BrandForm />
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
