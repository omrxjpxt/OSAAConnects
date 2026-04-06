import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://osaaconnects.com";
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
