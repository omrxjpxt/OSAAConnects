# OSAA Connects — Website

A premium, production-ready influencer marketing platform website for **OSAA Connects**. Built with Next.js 14, TypeScript, TailwindCSS, Framer Motion, and Sanity CMS.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.local.example .env.local
# Fill in your API keys (see "Environment Variables" below)

# 3. Run development server
npm run dev
# → http://localhost:3000

# 4. Run Storybook
npm run storybook
# → http://localhost:6006
```

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS with custom design tokens |
| Animations | Framer Motion |
| CMS | Sanity.io (GROQ) |
| Forms | React Hook Form + Zod |
| Search | Fuse.js (fuzzy) |
| CSV Export | PapaParse |
| Email | Resend |
| Payments | Stripe + Razorpay |
| Images | Next/Image (AVIF/WebP) + Cloudinary |
| Analytics | GA4 + Facebook Pixel + TikTok Pixel |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `cream` | `#F6F2EC` | Background |
| `beige` | `#F1E7DA` | Cards, sections |
| `gold` | `#D4AF37` | CTAs, accents |
| `gold-hover` | `#C69C6D` | Hover states |
| `charcoal` | `#141317` | Headings, text |
| `muted` | `#A8A090` | Subtext |

### Typography
- **Headlines**: Playfair Display (serif, weight 600–800)
- **Body**: Inter (sans-serif, 16px base, 1.65 line-height)
- **Spacing**: 8px base grid

### Key CSS Classes
```css
.btn-primary        /* Gold CTA button */
.btn-secondary      /* Outlined gold button */
.btn-ghost          /* Minimal text button */
.card               /* White card with hover shadow */
.section-label      /* Small uppercase gold label */
.container-site     /* Max-width container */
.section-py         /* Vertical section padding */
.input-field        /* Styled form input */
.tag                /* Niche badge */
.skeleton           /* Loading shimmer */
.text-gradient-gold /* Gold gradient text */
```

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home: Hero, How It Works, Creators Carousel, Case Studies, Stats, CTA |
| `/creators` | Creator directory with filters, fuzzy search, CSV export |
| `/brands` | Brand case studies + proposal form |
| `/about` | Mission, values, stats, timeline |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post with JSON-LD Article schema |
| `/contact` | Tabbed form (Creator / Brand) with FAQ |
| `/admin` | Admin dashboard (password protected) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## 🧩 Component Library

```
src/components/
├── layout/
│   ├── Header.tsx         # Sticky nav, mobile hamburger
│   └── Footer.tsx         # Links, social, newsletter, JSON-LD
├── hero/
│   └── Hero.tsx           # Animated count-up stats, CTAs
├── creators/
│   ├── CreatorCard.tsx    # Card with hover microanim
│   ├── CreatorModal.tsx   # Full profile modal (accessible)
│   ├── CreatorDirectory.tsx # Filters, search, pagination, CSV
│   └── CreatorsCarousel.tsx # Homepage horizontal scroll
├── sections/
│   ├── HowItWorks.tsx     # 4-step process flow
│   ├── Stats.tsx          # Dark section with timeline
│   ├── BrandsSection.tsx  # Case study tiles
│   └── ContactCTA.tsx     # Full-width CTA
├── forms/
│   ├── CreatorForm.tsx    # Creator application form
│   └── BrandForm.tsx      # Brand inquiry form
└── ui/
    ├── ConsentBanner.tsx  # GDPR/COPPA cookie consent
    ├── CountUp.tsx        # Animated number
    └── LoadingSkeleton.tsx # Shimmer skeletons
```

---

## 🔌 Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Sanity project ID |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | For leads | Google Sheet ID |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | For leads | Service account email |
| `GOOGLE_PRIVATE_KEY` | For leads | Service account private key |
| `SLACK_WEBHOOK_URL` | Recommended | Slack incoming webhook |
| `RESEND_API_KEY` | Recommended | Resend.com API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe PK |
| `STRIPE_SECRET_KEY` | For payments | Stripe SK |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | For payments | Razorpay key |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Analytics | GA4 ID |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Contact | WhatsApp number |
| `ADMIN_SECRET` | ✅ | Admin dashboard password |

---

## 📊 CMS — Sanity Setup

```bash
# 1. Create a Sanity project
npx sanity@latest init

# 2. Add schemas from sanity/schemas/
# 3. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
# 4. Deploy Sanity Studio
npx sanity@latest deploy
```

### Content Types
- **Creator** — name, handle, niches, followers, avgViews, bio, avatar, gallery, rates, location, languages, availability
- **Brand** — brandName, website, contactEmail, vertical
- **Campaign** — title, brief, brand ref, creators[], deliverables, timeline, status
- **Post** — title, slug, excerpt, featuredImage, contentBlocks (portable text)

---

## 📈 Analytics Events

| Event | Trigger | Parameters |
|---|---|---|
| `lead_form_submitted` | Form submit | `source: "creator"\|"brand"` |
| `creator_shortlisted` | Admin selects creator | `creator_id, niche` |
| `page_view` | Every navigation | Auto |

---

## 🚢 Deploy to Vercel

```bash
# Option 1: Using Vercel CLI
npx vercel --prod

# Option 2: Push to GitHub
# → Connect repo in Vercel dashboard
# → Add all env vars under Project Settings → Environment Variables
# → Every push to main auto-deploys
```

---

## 📚 How to Add Creators (Training Guide)

1. Go to your Sanity Studio URL (e.g. `https://your-project.sanity.studio`)
2. Click **Creator** in the left sidebar → **Create new**
3. Fill in: Name, Handle, Instagram link, Followers, Avg Reel Views, Niches, Bio, Avatar, Rates, Location
4. Set **Available** = ✅ if open for campaigns
5. Click **Publish**
6. The creator will appear on `/creators` (may require revalidation if using ISR)

## 📋 How to Export a Pitch CSV

1. Go to `/admin` (password from `ADMIN_SECRET`)
2. Check the boxes next to creators you want to shortlist
3. Click **Export N Selected** → downloads a `.csv`
4. Open in Excel/Sheets and format for client pitch

---

## 🔐 Security

- Security headers set in `next.config.ts` (HSTS, X-Frame-Options, CSP, etc.)
- Form API routes have IP-based rate limiting (5 req/min)
- Admin dashboard protected by session-based password
- All PII kept in Sanity (limited API token access)
- Cookie consent required before GA4/pixels load

---

## 📝 Blog Drafts

10 blog post stubs are ready. Add them in Sanity Studio:

1. How to Brief a Creator for Maximum Impact
2. Nano vs. Macro Influencers: Which Is Right for Your Brand?
3. India's Creator Economy in 2025: Trends to Watch
4. How We Vet Our Creators: The OSAA Connects Process
5. Reels vs. Stories vs. Posts: Choosing the Right Format
6. Influencer Marketing for SaaS Brands in India
7. The ROI of Micro-Influencers in Fashion
8. How to Measure Campaign Success Beyond Vanity Metrics
9. Building a Creator Brief That Actually Works
10. Why Hindi-language Creators Are the Next Big Thing

---

_Built by Antigravity for OSAA Connects · 2025_
