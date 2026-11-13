import type { Metadata } from "next";

const siteUrl = "https://baba-ahmed-portfolio.vercel.app";

export function projectMetadata({ slug, title, description }: { slug: string; title: string; description: string }): Metadata {
  const url = siteUrl + "/projects/" + slug;
  const socialImage = "/projects/" + slug + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: process.env.VERCEL_ENV === "production", follow: true },
    openGraph: {
      type: "article",
      url,
      siteName: "Baba Ahmed El Bekay",
      title: title + " | Baba Ahmed El Bekay",
      description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Baba Ahmed El Bekay — cybersecurity and cloud portfolio" }]
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | Baba Ahmed El Bekay",
      description,
      images: [socialImage]
    }
  };
}
