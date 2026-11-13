import type { MetadataRoute } from "next";

const siteUrl = "https://baba-ahmed-portfolio.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl + "/sitemap.xml"
  };
}
