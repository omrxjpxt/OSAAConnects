import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// Simulated data — in production fetched from Sanity
const POSTS: Record<string, { title: string; publishedAt: string; excerpt: string; content: string }> = {
  "how-to-brief-a-creator": {
    title: "How to Brief a Creator for Maximum Impact",
    publishedAt: "2025-02-15",
    excerpt: "A great brief is the difference between a forgettable post and a viral campaign.",
    content: `A creator brief is your most important tool in influencer marketing. It sets the direction, aligns expectations, and protects both the brand and the creator.

## What Should a Great Brief Include?

1. **Brand overview** — who you are, your tone, your visual style.
2. **Campaign goal** — awareness, leads, app downloads, sales?
3. **Target audience** — demographics, interests, geography.
4. **Key messages** — 2–3 points the creator must communicate.
5. **Content requirements** — format (reel/story/post), duration, hashtags, links.
6. **Do's and Don'ts** — what to avoid, any brand guidelines.
7. **Timeline** — posting date, revision windows.
8. **Deliverables & payment terms** — clear milestones.

## Common Mistakes

- Being too prescriptive (kills authenticity)
- Being too vague (creates scope creep)
- Forgetting to mention the approval process

## The OSAA Connects Approach

We use a standardised brief template that we share with both brand and creator before any work begins. This eliminates 90% of the back-and-forth that delays campaigns.`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = POSTS[params.slug];
  if (!post) return { title: "Post not found | OSAA Connects" };
  return {
    title: `${post.title} | OSAA Connects Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "OSAA Connects",
      url: "https://osaaconnects.com",
    },
  };

  return (
    <main className="min-h-screen bg-cream pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container-site py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-body-sm text-muted hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="max-w-2xl mx-auto">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-muted text-body-sm mb-4">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </div>
            <h1 className="font-playfair font-bold text-charcoal mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              {post.title}
            </h1>
            <p className="text-body-lg text-charcoal/60">{post.excerpt}</p>
          </header>

          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-playfair font-bold text-charcoal text-2xl mt-10 mb-4">
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              if (para.startsWith("1. ") || para.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 text-charcoal/70 my-4">
                    {para.split("\n").map((item, j) => (
                      <li key={j} className="leading-relaxed">
                        {item.replace(/^[\d]+\. /, "").replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-charcoal/70 leading-relaxed mb-4">
                  {para}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-beige text-center">
            <p className="font-playfair font-bold text-charcoal text-xl mb-3">
              Ready to run your own creator campaign?
            </p>
            <Link href="/contact#brand-form" className="btn-primary px-8 py-3">
              Talk to Our Team
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
