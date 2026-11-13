import type { MetadataRoute } from "next";

const siteUrl = "https://baba-ahmed-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects/aegissoc", "/projects/netsec-agent", "/projects/netops-sentinel", "/projects/secure-enterprise-network"];
  return routes.map((route, index) => ({
    url: siteUrl + route,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.75
  }));
}
