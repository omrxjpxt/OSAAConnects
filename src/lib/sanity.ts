import { type ClientConfig, createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// ─── GROQ Queries ─────────────────────────────────────────────────────────

export const CREATORS_QUERY = `*[_type == "creator"] | order(_createdAt desc) {
  _id,
  name,
  handle,
  igLink,
  followers,
  avgViews,
  niches,
  bio,
  "avatarUrl": avatar.asset->url,
  location,
  languages,
  tags,
  availability,
  rates
}`;

export const CREATOR_BY_ID_QUERY = `*[_type == "creator" && _id == $id][0] {
  _id,
  name,
  handle,
  igLink,
  followers,
  avgViews,
  niches,
  bio,
  "avatarUrl": avatar.asset->url,
  "gallery": mediaGallery[].asset->url,
  location,
  languages,
  tags,
  availability,
  rates
}`;

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "featuredImage": featuredImage.asset->url
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "featuredImage": featuredImage.asset->url,
  contentBlocks
}`;

export const ALL_POST_SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`;
