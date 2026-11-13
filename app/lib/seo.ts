import type { Metadata } from "next";

const siteUrl = "https://baba-ahmed-portfolio.vercel.app";
const socialImage = "/opengraph-image";

export function projectMetadata({ slug, title, description }: { slug: string; title: string; description: string }): Metadata {
  const url = siteUrl + "/projects/" + slug;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
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
