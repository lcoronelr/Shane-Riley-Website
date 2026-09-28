import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";
import { getAllStories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/stories", "/multimedia", "/about", "/resume", "/contact", "/credits"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Example stories are excluded so fictional copy is never submitted as journalism.
  const stories = getAllStories()
    .filter((story) => !story.placeholder)
    .map((story) => ({
      url: `${siteUrl}/stories/${story.slug}`,
      lastModified: story.updated ?? story.published,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }));

  return [...pages, ...stories];
}
