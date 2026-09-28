import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Set SITE_ALLOW_INDEXING=false on preview or staging deployments.
  const allowIndexing = process.env.SITE_ALLOW_INDEXING !== "false";
  return {
    rules: allowIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
