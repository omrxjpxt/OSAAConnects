import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OSAA Connects",
  description: "OSAA Connects Privacy Policy — how we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="container-site py-12">
        <article className="max-w-2xl mx-auto prose prose-lg">
          <header className="mb-10 not-prose">
            <p className="section-label mb-3">Legal</p>
            <h1 className="font-playfair font-bold text-charcoal text-4xl mb-2">Privacy Policy</h1>
            <p className="text-muted text-body-sm">Last updated: January 2025</p>
          </header>

          {[
            {
              title: "1. Information We Collect",
              content: "We collect information you provide directly (name, email, Instagram handle, follower data, campaign briefs) and usage data (pages visited, form interactions) via analytics cookies. We do not collect payment card data directly — this is handled by Stripe and Razorpay."
            },
            {
              title: "2. How We Use Your Information",
              content: "We use your data to match creators with brand campaigns, send you relevant opportunities, respond to your inquiries, improve our services, and comply with legal obligations."
            },
            {
              title: "3. Data Sharing",
              content: "We share your data only with: brands you are matched with (with your consent), service providers (Sanity CMS, Google Sheets, Resend email, Cloudinary), and as required by law. We never sell your data."
            },
            {
              title: "4. Cookies",
              content: "We use essential cookies (site function), analytics cookies (GA4 — only after consent), and advertising cookies (Facebook Pixel, TikTok Pixel — only after consent). You can manage preferences via our consent banner."
            },
            {
              title: "5. Data Retention",
              content: "Creator profiles are retained as long as your account is active. Brand inquiry data is retained for 2 years. You may request deletion at any time by emailing osaaconnects@gmail.com."
            },
            {
              title: "6. Your Rights (GDPR / India DPDP)",
              content: "You have the right to access, correct, delete, or port your personal data. You may also withdraw consent at any time. Contact us at osaaconnects@gmail.com."
            },
            {
              title: "7. Children (COPPA)",
              content: "Our services are not directed to children under 13. We do not knowingly collect data from children."
            },
            {
              title: "8. Contact",
              content: "Questions about this policy? Email us at osaaconnects@gmail.com."
            },
          ].map(({ title, content }) => (
            <div key={title} className="mb-8 not-prose">
              <h2 className="font-playfair font-bold text-charcoal text-xl mb-3">{title}</h2>
              <p className="text-charcoal/70 text-body-md leading-relaxed">{content}</p>
            </div>
          ))}
        </article>
      </div>
    </main>
  );
}
