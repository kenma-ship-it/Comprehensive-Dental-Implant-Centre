import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/clinic";
import { services } from "@/data/services";
import { team } from "@/data/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/dentists", "/services", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const treatments = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const dentists = team.map((d) => ({
    url: `${SITE_URL}/dentists/${d.id}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...dentists, ...treatments];
}
