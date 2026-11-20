import type { MetadataRoute } from "next";

const siteUrl = "https://www.babaahmed.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/ar",
    "/projects/aegissoc",
    "/projects/cloudshield",
    "/projects/netsec-agent",
    "/projects/netops-sentinel",
    "/projects/secure-enterprise-network",
    "/projects/nexuscloud"
  ];

  return routes.map((route, index) => ({
    url: siteUrl + route,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.75
  }));
}
