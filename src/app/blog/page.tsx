import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | OSAA Connects",
  description:
    "Influencer marketing insights, creator tips, and brand campaign strategies from the OSAA Connects team.",
  alternates: { canonical: "/blog" },
};

// Sample posts — in production fetched from Sanity
const SAMPLE_POSTS = [
  { _id: "p1", title: "How to Brief a Creator for Maximum Impact", slug: "how-to-brief-a-creator", excerpt: "A great brief is the difference between a forgettable post and a viral campaign. Here's our proven briefing template.", publishedAt: "2025-02-15", featuredImage: "" },
  { _id: "p2", title: "Nano vs. Macro Influencers: Which Is Right for Your Brand?", slug: "nano-vs-macro-influencers", excerpt: "Bigger isn't always better. We break down engagement rates, authenticity, and ROI across follower tiers.", publishedAt: "2025-01-28", featuredImage: "" },
  { _id: "p3", title: "India's Creator Economy in 2025: Trends to Watch", slug: "india-creator-economy-2025", excerpt: "Short-form video, regional languages, and AI tools — here's what's shaping India's influencer landscape this year.", publishedAt: "2025-01-10", featuredImage: "" },
  { _id: "p4", title: "How We Vet Our Creators: The OSAA Connects Process", slug: "how-we-vet-creators", excerpt: "Not every creator with followers makes a great brand partner. Here's our 7-point vetting framework.", publishedAt: "2024-12-20", featuredImage: "" },
  { _id: "p5", title: "Reels vs. Stories vs. Posts: Choosing the Right Format", slug: "reels-vs-stories-vs-posts", excerpt: "Each Instagram format has a different role in the marketing funnel. We explain when to use each.", publishedAt: "2024-12-05", featuredImage: "" },
  { _id: "p6", title: "Influencer Marketing for SaaS Brands in India", slug: "influencer-marketing-saas-india", excerpt: "B2B and SaaS brands have unique challenges with creator campaigns. Here's how we approach them.", publishedAt: "2024-11-18", featuredImage: "" },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="container-site py-12 md:py-16">
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">Insights</p>
          <h1 className="font-playfair font-bold text-charcoal mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Creator Marketing Insights
          </h1>
          <p className="text-body-lg text-charcoal/60">
            Strategies, tips, and trends from the OSAA Connects team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_POSTS.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-beige"
            >
              <div className="h-40 bg-gradient-hero flex items-center justify-center p-6">
                <p className="font-playfair font-bold text-charcoal/30 text-center text-sm leading-snug group-hover:text-charcoal/50 transition-colors">
                  {post.title}
                </p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-muted text-xs mb-3">
                  <Calendar size={12} />
                  {formatDate(post.publishedAt)}
                </div>
                <h2 className="font-playfair font-semibold text-charcoal text-lg leading-tight mb-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-charcoal/60 text-body-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-gold text-body-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
