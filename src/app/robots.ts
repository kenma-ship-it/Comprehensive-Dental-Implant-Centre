import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/clinic";
import { ALLOW_INDEXING } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    // AI answer engines are allowed deliberately: the clinic wants to be quotable
    // in AI answers about dentists in Richmond Circle. Remove an agent to opt out.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
