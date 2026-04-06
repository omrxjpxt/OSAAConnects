/** Creator content type */
export interface Creator {
  _id: string;
  name: string;
  handle: string;
  igLink: string;
  followers: number;
  avgViews: number;
  niches: string[];
  bio: string;
  avatarUrl: string;
  gallery?: string[];
  location: string;
  languages: string[];
  tags: string[];
  availability: boolean;
  rates: {
    reelRate?: number;
    storyRate?: number;
    postRate?: number;
    currency?: string;
  };
}

/** Brand content type */
export interface Brand {
  _id: string;
  brandName: string;
  website: string;
  contactEmail: string;
  vertical: string;
  contactPhone?: string;
  notes?: string;
}

/** Campaign content type */
export interface Campaign {
  _id: string;
  title: string;
  brief: string;
  brand: Brand;
  creators: Creator[];
  deliverables: string;
  timeline: string;
  status: "pitched" | "negotiating" | "live" | "completed";
}

/** Blog post content type */
export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featuredImage: string;
  contentBlocks?: unknown[];
}

/** Creator form submission */
export interface CreatorFormData {
  name: string;
  igHandle: string;
  igLink: string;
  followers: number;
  avgReelViews: number;
  niche: string;
  sampleRate: string;
  country: string;
  phone: string;
  email: string;
  mediaUrl?: string;
  consent: boolean;
  honeypot?: string;
  recaptchaToken?: string;
}

/** Brand form submission */
export interface BrandFormData {
  brandName: string;
  website: string;
  brief: string;
  targetAudience: string;
  budget: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  honeypot?: string;
  recaptchaToken?: string;
}

/** Creator filter state */
export interface CreatorFilters {
  niche?: string;
  followerTier?: "nano" | "micro" | "macro" | "mega";
  avgViews?: string;
  priceBracket?: string;
  language?: string;
  location?: string;
  search?: string;
}

/** Site stats */
export interface SiteStat {
  value: number;
  suffix: string;
  label: string;
}
