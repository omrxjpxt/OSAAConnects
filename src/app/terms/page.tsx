import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | OSAA Connects",
  description: "OSAA Connects Terms of Service — rules and conditions for using our influencer marketing platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="container-site py-12">
        <article className="max-w-2xl mx-auto">
          <header className="mb-10">
            <p className="section-label mb-3">Legal</p>
            <h1 className="font-playfair font-bold text-charcoal text-4xl mb-2">Terms of Service</h1>
            <p className="text-muted text-body-sm">Last updated: January 2025</p>
          </header>

          {[
            { title: "1. Acceptance of Terms", content: "By using OSAA Connects (website, services, forms), you agree to these Terms of Service. If you do not agree, do not use our services." },
            { title: "2. Services", content: "OSAA Connects provides influencer matching services between brands and creators. We are a facilitator — contracts are ultimately between brands and creators." },
            { title: "3. Creator Obligations", content: "Creators must provide accurate follower and engagement data. Misleading information will result in removal from the network. Creators are responsible for disclosing paid partnerships per ASA/FTC/ASCI guidelines." },
            { title: "4. Brand Obligations", content: "Brands must provide accurate campaign briefs and pay creators as agreed. OSAA Connects is not liable for non-payment by brands." },
            { title: "5. Intellectual Property", content: "Campaign content created by creators remains the creator's IP unless a work-for-hire agreement is signed separately. OSAA Connects does not claim ownership of user-submitted content." },
            { title: "6. Payments", content: "Payments via Stripe and Razorpay are processed by those providers under their respective terms. OSAA Connects may charge a platform fee disclosed at time of service." },
            { title: "7. Limitation of Liability", content: "OSAA Connects is not liable for any direct, indirect, or consequential damages arising from use of our services. Our total liability shall not exceed fees paid to us in the preceding 3 months." },
            { title: "8. Governing Law", content: "These terms are governed by the laws of India. Disputes shall be resolved in the courts of New Delhi, Delhi." },
            { title: "9. Contact", content: "Questions? Email osaaconnects@gmail.com." },
          ].map(({ title, content }) => (
            <div key={title} className="mb-8">
              <h2 className="font-playfair font-bold text-charcoal text-xl mb-3">{title}</h2>
              <p className="text-charcoal/70 text-body-md leading-relaxed">{content}</p>
            </div>
          ))}
        </article>
      </div>
    </main>
  );
}
